"use client";

import { useState } from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {

  const [file, setFile] = useState([]);
  const [prompt, setPrompt] = useState<string>("who is the person in the image?");
  const [showGenerate, setShowGenerate] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: any) {

    const length = e.target.files.length;

    for (let i = 0; i < length; i++) {
      let data = URL.createObjectURL(e.target.files[i]);
      // @ts-ignore
      setFile((prev) => [...prev, data]);
    }

    setShowGenerate(true);

  }

  const [output, setOutput] = useState<string>("");

  const fileToGenerativePart = async (file: any) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      // @ts-ignore
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const handleClick = async () => {

    if (file.length === 0) {
      toast.error("Please choose an image");
      return;
    }

    if (prompt === "") {
      toast.error("Please enter a prompt");
      return;
    }

    const fileInputEl = document.querySelector("input[type=file]");
    const imageParts = await Promise.all(
      // @ts-ignore
      [...fileInputEl.files].map(fileToGenerativePart)
    );

    setLoading(true);

    const response = await fetch('/api/imagerekog', {
      method: 'POST',
      body: JSON.stringify({
        prompt: prompt,
        imageParts: imageParts
      })
    });

    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
      return;
    }

    if (data.text === "") {
      toast.error("No response from the server!");
      return;
    }

    setLoading(false);
    setOutput(data.text);
  }

  const handlePromptChange = (e: any) => {
    setPrompt(e.target.value);
  }

  const onClickButton = () => {
    const fileInputEl = document.querySelector("input[type=file]");
    // @ts-ignore
    fileInputEl.click();
  }

  const OnEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  }

  return (
    <main className="flex flex-col gap-5 justify-center items-center h-screen overflow-y-scroll">
      <Toaster />
      <div className="flex items-center gap-3">
        <Image src="/image.png" alt="" width={50} height={50} />
        <h1 className="text-2xl font-bold">AI Image Recognition</h1>
      </div>
      <button onClick={onClickButton} className="w-40 h-10 bg-black text-white rounded-md font-medium mt-5 mb-5">Choose files</button>
      <input type="file" name="" id="" multiple onChange={handleChange} className="hidden" />
      {file.map((item, index) => {
        return (
          <div key={index} className="flex gap-2 mt-1">
            <Image src={item} width={200} height={200} alt="" />
          </div>
        )
      })}
      {showGenerate && (
        <div className="flex flex-col justify-center items-center gap-5 relative mt-4">
          <input type="text" className="border-black border-2 w-60 p-2 pr-10 rounded-sm " placeholder="What's in the image?" onChange={handlePromptChange} onKeyDown={OnEnter}/>
          {loading ? (
            <button>
              <BeatLoader color="black" loading={true} size={5} className="absolute top-[9px] right-2 hover:scale-110 transition-all ease-in-out" />
            </button>
          ) : (
            <Image src="/send.svg" alt="" className="absolute top-[9px] right-2 hover:scale-110 transition-all ease-in-out" width={25} height={25} onClick={handleClick} />
          )}
        </div>
      )}
      {output && (
        <Markdown className="w-[300px] h-40 overflow-y-scroll">
          {output}
        </Markdown>
      )}
    </main>
  )
}