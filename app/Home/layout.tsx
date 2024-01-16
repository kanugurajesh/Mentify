"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import styles from '@/styles/Root.module.css'
import Link from 'next/link'
import { useState } from 'react'

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className={`${showMenu ? "overflow-hidden h-screen" : ''}`}>
            <nav className='relative'>
                <div className='flex p-10 items-center justify-between font-bold pb-40'>
                    <div className='flex items-center gap-3'>
                        <Link href="/" className='flex items-center '>
                            <Image src="/logo.png" alt="Logo" width={35} height={35} className='mr-[0.8px]'/>
                            <h1 className='text-2xl'>entify</h1>
                        </Link>
                    </div>

                    <div className={`flex flex-col gap-1 transition-all ease-in-out duration-300 ${styles.menu} ${showMenu ? styles.click : ''}`} onClick={toggleMenu}>
                        <div className={`w-8 h-1 bg-black ${styles.menuli}`}></div>
                        <div className={`w-8 h-1 bg-black ${styles.menuli}`}></div>
                        <div className={`w-8 h-1 bg-black ${styles.menuli}`}></div>
                    </div>

                    <div className={`flex gap-8 items-center ${styles.menubar} ${showMenu ? styles.click : ''}`}>
                        <ul className='flex gap-5'>
                            <li>
                                <Link href="/Home" className={`${styles.a}`}>Home</Link>
                            </li>
                            <li>
                                <Link href="/Imagine" className={`${styles.a}`}>Imagine</Link>
                            </li>
                            <li>
                                <Link href="/Chat" className={`${styles.a}`}>Council</Link>
                            </li>
                            <li>
                                <Link href="https://kanugurajesh.github.io" className={`${styles.a}`}>Blog</Link>
                            </li>
                        </ul>
                        <UserButton />
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            <Link href="/Contact">Contact Us</Link>
                        </button>
                    </div>
                </div>
            </nav>
            {/* {window.innerWidth > 750 || !showMenu ? children : ''} */}
            {!showMenu ? children : ''}
        </div>
    )
}
