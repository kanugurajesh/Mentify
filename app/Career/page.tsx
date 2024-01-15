"use client";

import Image from "next/image"
import styles from '@/styles/career.module.css'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Career() {

    const [selectedCareer, setSelectedCareer] = useState('Please select a career')
    const [careerDescription, setCareerDescription] = useState('')

    const router = useRouter();

    const handleClick = (e: any) => {

        const customValue = e.target.getAttribute('alt') as string;

        toast.success(`You selected ${customValue}`)

        const readFile = async (name: string) => {
            const markdown = await import(`@/data/${name}.d.ts`);
            const data = markdown.data;
            setCareerDescription(data[customValue])
            return markdown.data;
        }

        readFile("career")

        console.log(careerDescription)

        setSelectedCareer(customValue)

        // remove all selected classes
        const images = document.querySelectorAll('img');

        images.forEach((image) => {
            image.classList.remove(`${styles.imageSelected}`);
        });

        console.log(customValue)
        // add selected class to clicked image
        e.target.classList.add(`${styles.imageSelected}`);
    }

    const handleGetGuidance = () => {
        if(!selectedCareer || selectedCareer === 'Please select a career') {
            toast.error('Please select a career')
            return;
        }
        router.push(`/Career/GetGuidance/${selectedCareer}`)
    }

    const handleEvaluate = () => {
        if(!selectedCareer || selectedCareer === 'Please select a career') {
            toast.error('Please select a career')
            return;
        }
        router.push(`/Courses/${selectedCareer}`)
    }

    return (
        <main className={`p-10 flex mt-10 ${styles.career} w-full`}>
            <Toaster />
            <div className={`${styles.imageContainer}`}>
                <Image src="/icons/uiux.png" alt="UserExperience" width={80} height={80} onClick={handleClick} defaultValue="ux" />
                <Image src="/icons/ui-design.png" alt="FrontendDevelopment" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/backend.png" alt="BackendDevelopment" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/database.png" alt="DatabaseEngineering" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/git.png" alt="GitVersionControl" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/fullstack.png" alt="FullstackDevelopment" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/server.png" alt="CloudPlatform" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/devops.png" alt="DeveloperOperations" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/cyber-security.png" alt="Cybersecurity" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/analysis.png" alt="DataAnalysis" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/data-science.png" alt="DataScience" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/ai.png" alt="ArtificialIntelligence" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/testing.png" alt="SoftwareTesting" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/hacker.png" alt="Hacking" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/open-source.png" alt="Opensource" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/blockchain.png" alt="BlockchainDevelopment" width={80} height={80} onClick={handleClick} />
            </div>
            <div className={`${styles.imageContent}`}>
                <h1 className={`${styles.h1}`}>{selectedCareer}</h1>
                <p className={`${styles.p}`}>{careerDescription}</p>
                <div className="mt-5 flex flex-col gap-3">
                    <Button onClick={handleGetGuidance} className={cn("w-[200px]")}>Get guidance</Button>
                    <Button onClick={handleEvaluate} className={cn("w-[200px]")}>Evaluate</Button>
                </div>
            </div>
        </main>
    )
}