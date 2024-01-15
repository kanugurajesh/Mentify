"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import Markdown from 'react-markdown'
import React from 'react'
import { Button } from "@/components/ui/button";
import styles from '@/styles/styles.module.css'
import "@/styles/LoginFormComponent.css";

export default function Page({ params }: { params: { name: string } }) {

    const name = params.name;
    const [image, setImage] = useState("");

    const getImage = async (name: string) => {
        const response = await fetch("/api/imagen", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
            }),
        });

        const data = await response.json();

        // get imageUrl from data
        console.log(data.imageURl);
        setImage(data.imageURl);
        return data;
    }

    const [response, setResponse] = useState("");
    const [output, setOutput] = useState("The response will appear here...");

    const onSubmit = async () => {

        // clear the output
        setOutput("The response will appear here...");

        // create a post request to the /api/chat endpoint
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userPrompt: `can you tell me what are the capabilities I need to start a career in ${name} and what are the career options available in ${name}`,
            }),
        });

        // get the response from the server
        const data = await response.json();
        // set the response in the state
        setResponse(data.text);
    };

    useEffect(() => {
        // update the response character by character in the output
        if (response.length === 0) return;

        setOutput("");

        for (let i = 0; i < response.length; i++) {
            setTimeout(() => {
                setOutput((prev) => prev + response[i]);
            }, i * 10);
        }

    }, [response]);

    return (
        <div>
            <div className='flex flex-col items-center h-screen gap-6'>
                <h1 className='text-4xl font-extrabold mt-1'>{name}</h1>
                {image && <Image src={image} alt="image" width={300} height={300} />}
                <h1 className='text-1xl font-bold mt-1'>Creating a response for the capabilities required and career options in <span className="text-red-500">{name}</span></h1>
                <Card className={cn("p-5 whitespace-normal min-w-[320px] sm:w-[500px] md:min-w-[600px]")}>
                    <div className={styles.textwrapper}>
                        <Markdown className={cn("w-full h-full ")}>{`${output}`}</Markdown>
                    </div>
                </Card>
                <Button onClick={() => {
                    onSubmit();
                    getImage(name);
                }}>Get Details</Button>
            </div>
        </div>
    )
}