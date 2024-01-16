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
                <Image src="/icons/anger.png" alt="Anger" width={80} height={80} onClick={handleClick}/>
                <Image src="/icons/anxiety.png" alt="Anxiety" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/bipolar.png" alt="Bipolar" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/depression.png" alt="Depression" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/weight-loss.png" alt="WeightLoss" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/loneliness.png" alt="Loneliness" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/fear.png" alt="Fear" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/insomnia.png" alt="Insomnia" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/listen.png" alt="HearingVoices" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/panic-attack.png" alt="PanicAttack" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/paranoia.png" alt="Paranoia" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/phobia.png" alt="Phobia" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/psychosis.png" alt="Psychosis" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/schizophrenia.png" alt="Schizophrenia" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/self-confidence.png" alt="SelfConfidence" width={80} height={80} onClick={handleClick} />
                <Image src="/icons/self-harm.png" alt="SelfHarm" width={80} height={80} onClick={handleClick} />
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