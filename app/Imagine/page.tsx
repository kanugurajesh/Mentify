"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/utils/uploadthing";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import styles from "@/styles/swapImage.module.css";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [click, setClick] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>();
  const [imageURl, setImageURl] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [receivedEmail, setReceivedEmail] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!selectedFile) {
        return toast.error("Please upload a picture");
      }

      const body = {
        email: email,
        gender: gender,
        userPrompt: userPrompt,
        selectedFile: selectedFile,
      };

      // 👇🏻 post data to server's endpoint
      const data = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const response = await data.json();

      if (response.error) {
        toast.error(response.error);
        return;
      }

      // 👇🏻 set image url
      setImageURl(response.imageURl);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleEmailReceive = () => {
    if (!receivedEmail) {
      toast.success("Email receive is enabled");
    } else {
      toast.error("Email receive is disabled");
    }

    setReceivedEmail(!receivedEmail);
  };

  useEffect(() => {
    if (imageURl) {
      setEmail("");
      setGender("");
      setUserPrompt("");
      setSelectedFile("");
    }

    const sendEmail = async () => {

      try {
        const emailRes = await fetch(`/api/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            imageURl: imageURl,
          }),
        });

        const emailResponse = await emailRes.json();

        if (emailResponse.error) {
          return toast.error("error in email response")
        }

        setEmailSent(true);

        toast.success("Email sent successfully!");

      } catch (err) {
        toast.error("Something went wrong");
      }
    };

    if (imageURl && receivedEmail) {
      sendEmail();
    }
  }, [imageURl]);

  return (
    <div>
      <Toaster />
      {!imageURl ? (
        <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:p-8 relative">
          <div
            className={`${styles.toggleButton}`}
            onClick={handleEmailReceive}
          >
            <div
              className={`${receivedEmail ? styles.receivedEmail : ""}`}
            ></div>
          </div>
          <Head>
            <title>Imagine Yourself</title>
          </Head>
          <header className="mb-8 flex w-full flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Imagine Yourself</h1>
            <p className="opacity-60">
              Upload a picture of yourself and generate your avatar
            </p>
          </header>
          <form
            method="POST"
            className="flex w-full flex-col md:w-[60%]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              required
              className="mb-3 border-[1px] px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="gender">Gender</label>
            <select
              className="mb-4 rounded border-[1px] px-4 py-3"
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response.
                setSelectedFile(res[0].url);
                toast.success("Image uploaded successfully!");
              }}
              onUploadError={(error: Error) => {
                toast.error(`ERROR! ${error.message}`);
              }}
            />
            <label htmlFor="prompt">
              Add custom prompt for your avatar
              <span className="opacity-60">(optional)</span>
            </label>
            <textarea
              rows={4}
              className="w-full border-[1px] p-3"
              name="prompt"
              id="prompt"
              value={userPrompt}
              placeholder="Copy image prompts from https://lexica.art"
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <button
              type="submit"
              onClick={() => setClick(true)}
              className="mt-5 rounded bg-blue-500 px-6 py-4 text-lg text-white hover:bg-blue-700"
            >
              {click ? (
                <BeatLoader size={8} color="white" />
              ) : (
                <span>Generate Image</span>
              )}
            </button>
          </form>
        </main>
      ) : (
        <div className="min-h-screen w-full flex flex-col items-center justify-center">
          {imageURl && (
            <Image
              src={imageURl}
              width={200}
              height={200}
              alt="image"
              className="mb-10"
            />
          )}
          <h2 className="font-bold text-3xl mb-2">Thank you! 🌟</h2>
          <p className="mb-4 text-center">
            {emailSent ? (
              <span>Your avatar has been sent to your email address</span>
            ) : (
              <span>
                {receivedEmail ? (
                  <BeatLoader size={8} color="black" />
                ) : (
                  <p>your image has been generated</p>
                )}
              </span>
            )}
          </p>
          <Link
            href="/"
            className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600"
          >
            Generate another
          </Link>
        </div>
      )}
    </div>
  );
}
