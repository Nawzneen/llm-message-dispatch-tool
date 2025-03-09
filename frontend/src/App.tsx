import React, { useEffect, useState } from "react";
import "./App.css";

interface PromptType {
  userPrompt: string;
  systemPrompt: string;
}

interface ResponseType {
  model: string;
  text: string;
}

function App() {
  const [prompt, setPrompt] = useState<PromptType>({
    userPrompt: "",
    systemPrompt: "",
  });

  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [availableModels, setAvailableModels] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responses, setResponses] = useState<ResponseType[]>([]);
  const [error, setError] = useState<string>("");

  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

  // Fetch available models from backend
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/llms/refresh`);
        const data = await res.json();
        console.log("data", data);
        if (Array.isArray(data.models)) {
          const modelNames = data.models.map(
            (model: { model_name: string }) => model.model_name
          );
          console.log("Available models:", modelNames);
          setAvailableModels(modelNames);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (err) {
        console.error("Error fetching models:", err);
      }
    };
    fetchModels();
  }, []);

  const handleUserPromptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt({ ...prompt, userPrompt: e.target.value });
  };

  const handleSystemPromptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt({ ...prompt, systemPrompt: e.target.value });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const modelName = e.target.value;
    setSelectedModels((prev) =>
      e.target.checked
        ? [...prev, modelName]
        : prev.filter((model) => model !== modelName)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    setIsLoading(true);
    try {
      const user_id = 1; // Hardcoded for now
      if (!prompt.userPrompt) {
        setError("Please write the user prompt");
        setIsLoading(false);
        return;
      } else if (!prompt.systemPrompt) {
        setError("Please write the system prompt.");
        setIsLoading(false);
        return;
      } else if (selectedModels.length === 0) {
        setError("You should select at least one model.");
        setIsLoading(false);
        return;
      }
      const responseData = await sendMessage(user_id, prompt, selectedModels);
      // Update responses
      setResponses(responseData);
      // Remove error if any exist
      setError("");
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError(err);
    }
    setIsLoading(false);
  };

  const sendMessage = async (
    user_id: number,
    prompt: PromptType,
    models: string[]
  ): Promise<ResponseType[]> => {
    try {
      const response = await fetch(`${backendUrl}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          message_content: {
            user_message: prompt.userPrompt,
            system_message: prompt.systemPrompt,
          },
          llm: models,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);

      if (Array.isArray(data.responses)) {
        return data.responses.map(
          (resp: { llm: string; response_content: { text: string } }) => ({
            model: resp.llm,
            text: resp.response_content.text,
          })
        );
      } else {
        console.error("Unexpected response format:", data);
        return [];
      }
    } catch (err) {
      console.error("Error:", err);
      return [];
    }
  };

  return (
    <div className="App">
      <div className="bg-gray-700 min-h-[100vh] flex flex-col align-center">
        <div className="mt-16 flex justify-center align-center">
          <form
            className="flex flex-col justify-center align-center w-[80vw]"
            onSubmit={handleSubmit}
          >
            <p className="text-gray-100 font-bold text-3xl">Ask a question:</p>

            {/* Model Selection */}
            <div className="mt-8 flex justify-center align-center gap-x-4">
              {/* {availableModels && <p>{availableModels}</p>} */}
              {availableModels && availableModels.length > 0 ? (
                availableModels.map((model) => (
                  <div key={model}>
                    <input
                      type="checkbox"
                      value={model}
                      id={model}
                      onChange={handleModelChange}
                    />{" "}
                    <label htmlFor={model} className="text-gray-100 text-base">
                      {model}
                    </label>
                  </div>
                ))
              ) : availableModels && availableModels.length === 0 ? (
                <p className="text-gray-100">
                  There is no model available. Please install atleast one model.
                </p>
              ) : (
                <p className="text-gray-100">Loading models...</p>
              )}
            </div>
            {/* {User Prompt  and System Prompt } */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2  gap-3 w-[80vw]">
              <div className="w-full grid">
                <p className="py-2 bg-blue-200 rounded-t-md font-bold">
                  User Prompt
                </p>
                <textarea
                  className="bg-white w-full h-[200px] rounded-b-md p-5 outline-none border-none overflow-hidden"
                  value={prompt.userPrompt}
                  onChange={handleUserPromptChange}
                />
              </div>
              <div className="w-full">
                <p className="py-2 bg-blue-200 rounded-t-md font-bold">
                  System Prompt
                </p>
                <textarea
                  className="bg-white w-full h-[200px] rounded-b-md p-5 outline-none border-none overflow-hidden"
                  value={prompt.systemPrompt}
                  onChange={handleSystemPromptChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 bg-gray-400 py-2 rounded-md font-bold shadow-md "
            >
              {isLoading ? "Processing..." : "Send"}
            </button>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </form>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {selectedModels.map((model) => (
            <div key={model} className="bg-gray-100 rounded-md p-4 w-[300px]">
              <p className="py-2 font-bold text-lg">{model}</p>
              <hr />
              <p className="p-2 min-h-[100px] overflow-auto">
                {responses.find((resp) => resp.model === model)?.text ||
                  "Waiting for response..."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
