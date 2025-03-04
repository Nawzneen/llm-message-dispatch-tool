import React from "react";
import logo from "./logo.svg";
import "./App.css";
interface promptType {
  userPrompt: string;
  systemPrompt: string;
}

function App() {
  const [prompt, setPrompt] = React.useState<promptType>({
    userPrompt: "",
    systemPrompt: "",
  });
  const [selectedModels, setSelectedModels] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // sending data to api, chosen model and prompts
    console.log(prompt);
    setPrompt({ userPrompt: "", systemPrompt: "" });
    setIsLoading(false);
  };
  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const modelName = e.target.value;
    if (e.target.checked) {
      //add the model
      setSelectedModels((prev) => [...prev, modelName]);
    } else {
      // Remove the model
      setSelectedModels((prev) => prev.filter((model) => model !== modelName));
    }
  };
  return (
    <div className="App">
      <div className="bg-gray-700 min-h-[100vh] flex flex-col align-center">
        <div className="mt-16  flex  justify-center align-center">
          <form
            className=" flex flex-col justify-center align-center w-[80vw] "
            onSubmit={handleSubmit}
          >
            <p className=" text-gray-100 font-bold text-3xl ">
              Ask a question:
            </p>
            <div className="mt-8  flex justify-center align-center gap-x-4">
              <div>
                <input
                  type="checkbox"
                  value="davinci"
                  id="davinci"
                  onChange={handleModelChange}
                />{" "}
                <label htmlFor="davinci" className=" text-gray-100 text-base">
                  Davinci
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="gpt-4"
                  id="gpt4"
                  onChange={handleModelChange}
                />{" "}
                <label htmlFor="gpt4" className=" text-gray-100 text-base">
                  GPT-4
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="deepseek"
                  id="deepseek"
                  onChange={handleModelChange}
                />{" "}
                <label htmlFor="deepseek" className=" text-gray-100 text-base">
                  Deepseek
                </label>
              </div>
            </div>
            <div className="mt-4 flex flex-row gap-x-2 justify-center align-center w-[80vw]">
              <div className="w-full">
                <p className="py-2 bg-blue-200  rounded-t-md font-bold">
                  User Prompt
                </p>
                <textarea
                  className="bg-white  w-full h-[200px] rounded-b-md p-5 outline-none border-none  overflow-hidden  "
                  value={prompt.userPrompt}
                  onChange={handleUserPromptChange}
                />
              </div>
              <div className="w-full">
                <p className="py-2 bg-blue-200 rounded-t-md font-bold ">
                  System Prompt
                </p>
                <textarea
                  className="bg-white  w-full h-[200px] rounded-b-md p-5 outline-none border-none  overflow-hidden "
                  value={prompt.systemPrompt}
                  onChange={handleSystemPromptChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className=" mt-2 bg-gray-400 py-2 rounded-md font-bold shadow-md "
            >
              Send
            </button>
          </form>
        </div>
        <div
          className=" justify-center align-center mt-16 grid grid-cols-3 gap-3
         px-10"
        >
          <div className="bg-gray-100 rounded-md ">
            <p className="py-2 font-bold">Model Name</p>
            <hr />
            <p className="p-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Aspernatur consequuntur illo rem neque beatae explicabo, dolorem
              dolor maxime quia quibusdam adipisci. Vel neque voluptas dolorum
              molestias sed. Repellat, doloribus suscipit.
            </p>
          </div>
          <div className="bg-gray-100  rounded-md">
            <p className="py-2 font-bold">Model Name</p>
            <hr />
            <p className="p-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Aspernatur consequuntur illo rem neque beatae explicabo, dolorem
              dolor maxime quia quibusdam adipisci. Vel neque voluptas dolorum
              molestias sed. Repellat, doloribus suscipit.llo rem neque beatae
              explicabo, dolorem dolor maxime quia quibusdam adipisci. Vel ne
              llo rem neque beatae explicabo, dolorem dolor maxime quia
              quibusdam adipisci. Vel nello rem neque beatae explicabo, dolorem
              dolor maxime quia quibusdam adipisci. Vel ne
            </p>
          </div>
          <div className="bg-gray-100  rounded-md">
            <p className="py-2 font-bold">Model Name</p>
            <hr />
            <p className="p-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Aspernatur consequuntur illo rem neque beatae explicabo, dolorem
              dolor maxime quia quibusdam adipisci. Vel neque voluptas dolorum
              molestias sed. Repellat, doloribus suscipit. atur consequuntur
              illo rem neque beatae explicabo, dolorem dolor maxime quia
              quibusdam a.atur consequuntur illo rem neque beatae explicabo,
              dolorem dolor maxime quia quibusdam a
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
