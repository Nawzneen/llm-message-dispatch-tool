import React, { useState } from "react";
import "./App.css";

interface PromptType {
  userPrompt: string;
  systemPrompt: string;
}

function App() {
  const [prompt, setPrompt] = useState<PromptType>({
    userPrompt: "",
    systemPrompt: "",
  });

  const [selectedModel, setSelectedModel] = useState<string>("marco-o1");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

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
    setSelectedModel(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          prompt: `${prompt.systemPrompt}\n\nUser: ${prompt.userPrompt}`,
          stream: false,
        }),
      });

      const data = await res.json();
      setResponse(data.response || "No response received.");
    } catch (error) {
      setResponse("Error: Could not connect to the LLM.");
      console.error("API Request Failed:", error);
    }

    setIsLoading(false);
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
              <div>
                <input
                  type="radio"
                  value="marco-o1"
                  id="marco-o1"
                  checked={selectedModel === "marco-o1"}
                  onChange={handleModelChange}
                />
                <label htmlFor="marco-o1" className="text-gray-100 text-base">
                  Marco-O1
                </label>
              </div>
            </div>

            {/* Prompt Inputs */}
            <div className="mt-4 flex flex-row gap-x-2 justify-center align-center w-[80vw]">
              <div className="w-full">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 bg-gray-400 py-2 rounded-md font-bold shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Send"}
            </button>
          </form>
        </div>

        {/* API Response */}
        {response && (
          <div className="bg-gray-100 rounded-md mt-10 p-5 w-[80vw]">
            <p className="font-bold">Response:</p>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
