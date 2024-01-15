"use client";

import Head from "next/head";
import { useState } from "react";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {

    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [userPrompt, setUserPrompt] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<string>();
    const [imageURL, setImageURL] = useState<string>("");

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
            }

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
                return toast.error(response.error);
            }
            // @ts-ignore
            // console.log({ response.response.imageURl });
            setImageURL(response.imageURl);

            const emailSend = await fetch("/api/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    sendTo: email,
                    imageUrl: response.imageURl,
                 }),
            });

            const emailResponse = await emailSend.json();

            // if (emailResponse.error) {
            //     return toast.error(emailResponse.error);
            // }

            toast.success("Email sent successfully!");

        } catch (err) {
            console.error({ err });
        }
    };

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:p-8">
            <Toaster />
            <Head>
                <title>Imagine Yourself</title>
            </Head>
            <header className="mb-8 flex w-full flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Imagine Yourself</h1>
                <p className="opacity-60">
                    Upload a picture of yourself and generate your avatar
                </p>
            </header>

            {imageURL && (
                <Image src={imageURL} width={500} height={500} alt="avatar" />
            )}

            {!imageURL && (
                <>
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
                            className="mt-5 rounded bg-blue-500 px-6 py-4 text-lg text-white hover:bg-blue-700"
                        >
                            Generate Avatar
                        </button>
                    </form>
                </>
            )}
        </main>
    );
}