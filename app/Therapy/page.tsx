"use client"

import { useState, useEffect, useRef } from "react"
import styles from "@/styles/therapy.module.css"
import Image from "next/image"
import Link from "next/link"
import Markdown from "react-markdown";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners"

export default function Home() {

  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const chatContainerRef = useRef(null);

  const getDate = () => {
    const date = new Date()
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  const [chatHistory, setChatHistory] = useState([
    { id: 1, message: 'Hello', sender: 'model', time: getDate() },
  ])

  const onPromptChange = (e: any) => {
    localStorage.setItem('prompt', e.target.value)
    setPrompt(e.target.value)
  }

  const RequestGemini = async (prompt: any) => {

    const response = await fetch('/api/therapy', {
      method: 'POST',
      body: JSON.stringify({ userPrompt: prompt }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { id: prevChatHistory.length + 1, message: data.text, sender: 'model', time: getDate() }
    ]);

    setLoading(false)

    setChatHistory((prevChatHistory) => {
      const updatedChatHistory = [...prevChatHistory];
      localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
      return updatedChatHistory;
    });

  }

  const deleteChatHistory = () => {
    localStorage.removeItem('chatHistory')
    setChatHistory([])
  }

  // Scroll to the bottom whenever chatHistory changes
  useEffect(() => {
    // @ts-ignore
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatHistory]);


  // handle click
  const onHandleClick = async () => {
    setLoading(true)
    if (prompt == "") {
      toast.error("Please enter the prompt")
      return
    }

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { id: prevChatHistory.length + 1, message: prompt, sender: 'user', time: getDate() }
    ]);

    await RequestGemini(prompt)
    setPrompt("")

  }

  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      onHandleClick()
    }
  }

  // show welcome message
  useEffect(() => {
    const visited = localStorage.getItem('visited')
    if (!visited) {
      toast.success("Welcome to Gemini")
      setTimeout(() => {
        toast.success("Get started by entering the prompt")
      }, 2500)
      localStorage.setItem('visited', "true")
    }
  })

  useEffect(() => {
    const chatHistory = localStorage.getItem('chatHistory')
    if (chatHistory) {
      setChatHistory(() => JSON.parse(chatHistory))
      console.log(chatHistory)
    }
  }, [])

  return (
    <main className={styles.container}>
      <Toaster />
      <Link href="/">
        <div className="flex gap-2 items-center font-bold">
          <Image src="/consultation.png" alt="logo" width={30} height={30} />
          <h1 className="text-2xl">Mentify</h1>
        </div>
      </Link>
      <div className={`flex flex-col mt-2 ${styles.chatHistory}`} ref={chatContainerRef}>
        {chatHistory.length > 0 && chatHistory.map((chat) => (
          <div key={chat.id} className="mb-5 relative">
            <div className={`p-5 rounded-md ${chat.sender == "user" ? styles.user : styles.model}`}>
              <div className={styles.icons}>
                <Image src={chat.sender == "user" ? "/patient.png" : "/doctor.png"} alt="logo" width={30} height={30} />
              </div>
              <Markdown className="mt-2">
                {chat.message}
              </Markdown>
            </div>
          </div>
        ))}
      </div>
      <div className={`flex justify-center items-center gap-5 ${styles.inputContainer}`}>
        <div className="relative">
          <input type="text" placeholder="Enter the prompt" value={prompt} className={`${styles.input}`} onChange={onPromptChange} onKeyDown={handleSubmit}/>
          <Image src="/clean.png" alt="logo" width={20} height={20} className="absolute top-3 right-3 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out" onClick={deleteChatHistory}/>
        </div>
        {loading ? (
          <button className={styles.button} disabled>
            <BeatLoader color="#fff" size={10} />
          </button>
        ) : (
          <button className={styles.button} onClick={onHandleClick}>send</button>
        )}
      </div>
    </main>
  )
}
