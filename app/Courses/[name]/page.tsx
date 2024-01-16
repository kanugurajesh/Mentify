// @ts-nocheck
"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import Markdown from 'react-markdown'
import React from 'react'
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useRive, RiveState, useStateMachineInput, StateMachineInput, Layout, Fit, Alignment, RiveProps } from 'rive-react';
import styles from '@/styles/styles.module.css'
import "@/styles/LoginFormComponent.css";
import Confetti from "@/components/Confetti";
import toast, {Toaster} from "react-hot-toast";

export default function Page({ params }: { params: { name: string } }) {

    const name = params.name;

    // const [score, setScore] = useState(0);
    const [score, setScore] = useState(0);
    const [count, setCount] = useState(0);
    const [chosen, setChosen] = useState();
    const [content, setContent] = useState();
    const [question, setQuestion] = useState();
    const [progress, setProgress] = useState(10);

    const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
    const inputRef = useRef(null);

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
                userPrompt: `hello I have obtained a score of ${score}/${30} in ${name} related issue based on my performance I would like to get a cure for ${name} can you suggest me a path?`,
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

    const STATE_MACHINE_NAME = 'Login Machine'

    useEffect(() => {
        if (inputRef?.current && !inputLookMultiplier) {
            setInputLookMultiplier(inputRef.current.offsetWidth / 100);
        }
    }, [inputRef])

    const { rive: riveInstance, RiveComponent }: RiveState = useRive({
        src: '/bear.riv',
        stateMachines: STATE_MACHINE_NAME,
        autoplay: true,
        layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.Center
        }),
    });

    // State Machine Inputs
    const trigSuccessInput: StateMachineInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, 'trigSuccess');
    const trigFailInput: StateMachineInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, 'trigFail');

    // read the file from the file system with the `name`
    const readFile = async (name: string) => {
        const markdown = await import(`@/data/${name}.d.ts`);
        return markdown.data;
    }

    const onNext = () => {

        if (!chosen) {
            toast.error("Please select an option")
            return
        }

        setProgress(progress + 10)

        setCount(count + 1)

        let currentScore = parseInt(chosen.split('+')[1])
        setScore(score + currentScore)

        if (question?.correctOption == chosen.split('+')[0]) {
            trigSuccessInput.fire()
        } else {
            trigFailInput.fire()
        }

        setQuestion(content?.questions[count + 1])

        setChosen("")

        if (progress >= 100) {
            onSubmit()
            return
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const content = await readFile(name);
                setQuestion(content?.questions[0]);
                setContent(content);
            } catch (error) {
                console.error("Error reading file:", error);
            }
        };
        fetchData();
    }, [name]);

    return (
        <div className="around">
            <Toaster />
            {progress < 110 ? (
                <>
                    <div className="rive-container">
                        <div className="rive-wrapper">
                            <RiveComponent className="rive-container" />
                        </div>
                    </div>
                    <div className='flex flex-col mt-5 items-center h-screen gap-6'>
                        <Progress value={progress} className={cn("w-[60%]")} />
                        <div className='w-[60%] flex justify-center'>
                            <h1 className='text-2xl font-bold'>{question?.question}</h1>
                        </div>

                        <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={question?.options[0]} id="r1" onClick={(e) => {
                                    setChosen(e.target.value)
                                }} />
                                <Label htmlFor="r1">{question?.options[0].split('+')[0]}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={question?.options[1]} id="r2" onClick={(e) => {
                                    setChosen(e.target.value)
                                }} />
                                <Label htmlFor="r2">{question?.options[1].split('+')[0]}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={question?.options[2]} id="r3" onClick={(e) => {
                                    setChosen(e.target.value)
                                }} />
                                <Label htmlFor="r3">{question?.options[2].split('+')[0]}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={question?.options[3]} id="r4" onClick={(e) => {
                                    setChosen(e.target.value)
                                }} />
                                <Label htmlFor="r4">{question?.options[3].split('+')[0]}</Label>
                            </div>
                        </RadioGroup>
                        <Button onClick={() => {
                            onNext()
                        }
                        }>{progress <= 110 ? "Next" : "Submit"}</Button>
                    </div>
                </>
            ) : (
                <div className='flex flex-col items-center h-screen gap-6'>
                    <h1 className='text-2xl mt-2 font-bold'>You scored {score} out of {30}</h1>
                    <Button onClick={() => {
                        setProgress(10)
                        setScore(0)
                        setCount(0)
                        setQuestion(content?.questions[0])
                    }
                    }>Restart</Button>
                    {score > 20 && (
                        <>
                            <Confetti />
                            <div className="flex items-center flex-col gap-5">
                                <h1 className='text-2xl font-bold'>Congratulations! You have obtained a <span className="font-black text-red-500">Gold medal</span></h1>
                                <Image src="/icons/goldmedal.svg" width={100} height={100} />
                            </div>
                        </>
                    )}
                    {score > 10 && score <= 20 && (
                        <>
                            <Confetti />
                            <div className="flex items-center flex-col gap-5">
                                <h1 className='text-2xl font-bold'>Congratulations! You have obtained a <span className="font-black text-red-500">Silver Medal</span></h1>
                                <Image src="/icons/silvermedal.svg" width={100} height={100} />
                            </div>
                        </>
                    )}
                    {score <= 10 && (
                        <>
                            <Confetti />
                            <div className="flex items-center flex-col gap-5">
                                <h1 className='text-2xl font-bold'>Congratulations! You have obtained a <span className="font-black text-red-500">Bronze Medal</span></h1>
                                <Image src="/icons/bronzemedal.svg" width={100} height={100} />
                            </div>
                        </>
                    )}
                    <h1 className='text-1xl font-bold mt-1'>Based on the personality test we are creating a response to diagnose <span className="text-red-500">{name}</span></h1>
                    <Card className={cn("p-5 whitespace-normal min-w-[320px] sm:w-[500px] md:min-w-[600px]")}>
                        <div className={styles.textwrapper}>
                            <Markdown className={cn("w-full h-full ")}>{`${output}`}</Markdown>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}