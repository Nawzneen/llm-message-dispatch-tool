import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="bg-gray-700 min-h-[100vh] flex flex-col align-center">
        <div className="mt-16 ">
          <p className="text-gray-100 font-bold text-3xl ">Ask a question:</p>
          <div>
            <textarea className="bg-white mt-8 w-[500px] h-[200px] rounded-md p-5 " />
          </div>
          <button className="w-[500px] bg-gray-400 py-2 rounded-md ">
            Send
          </button>
        </div>
        <div
          className=" justify-center align-center mt-16 grid grid-cols-3 gap-3
         px-10"
        >
          <div className="bg-gray-100 rounded-md ">
            <p className="py-2">Model Name</p>
            <hr />
            <p className="p-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Aspernatur consequuntur illo rem neque beatae explicabo, dolorem
              dolor maxime quia quibusdam adipisci. Vel neque voluptas dolorum
              molestias sed. Repellat, doloribus suscipit.
            </p>
          </div>
          <div className="bg-gray-100  rounded-md">
            <p className="py-2">Model Name</p>
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
            <p className="py-2">Model Name</p>
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
