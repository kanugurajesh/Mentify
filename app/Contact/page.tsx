"use client";

import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // create a function to validate the email
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // create a function to validate the name
  const validateName = (name: string) => {
    const re = /^[a-zA-Z ]{2,30}$/;
    return re.test(name);
  };

  const validateForm = () => {
    if (!validateName(name)) {
      toast.error("Please enter the valid name");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter the valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        });

        const data = await response.json();

        if (data.status === 200) {
          toast.success(
            "Message sent successfully we will get back to you soon 😀"
          );
        }
      } catch (error) {
        toast.error("Something went wrong please try again later");
      }
    }
  };

  return (
    <div className="text-extrabold flex flex-col lg:flex-row lg:justify-around items-center overflow-x-hidden mt-10 lg:mt-5 mb-10">
      <Toaster />
      <div className="flex flex-col lg:justify-around lg:gap-40 lg:h-3/4 items-center mb-20 lg:mb-0 gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-black text-center">Contact us</h1>
          <p className="text-lg w-80 text-center">
            Fill up the form and I will get back to you within 24 hours
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <span className="flex gap-5 align-center">
            <Image
              src="/phone-contact.png"
              className="hover:scale-110 transition ease-in-out"
              alt="phone"
              width={25}
              height={25}
            />
            <p>+91 6281768263</p>
          </span>
          <span className="flex gap-5 align-center">
            <Image
              src="/gmail.png"
              className="hover:scale-110 transition ease-in-out"
              alt="email"
              width={25}
              height={25}
            />
            <p>kanugurajesh3@gmail.com</p>
          </span>
          <span className="flex gap-5 align-center">
            <Image
              src="/instagram.png"
              className="hover:scale-110 transition ease-in-out"
              alt="email"
              width={25}
              height={25}
            />
            <Link href="https://www.instagram.com/kanugurajesh/">
              <p>kanugurajesh</p>
            </Link>
          </span>
        </div>
        <div className="flex gap-10">
          <Link href="https://www.linkedin.com/in/rajesh-kanugu-aba8a3254/">
            <Image
              src="/linkedin-contact.png"
              className="hover:scale-110 transition ease-in-out"
              alt="linkedin"
              width={35}
              height={35}
            />
          </Link>
          <Link href="https://twitter.com/exploringengin1">
            <Image
              src="/twitter.png"
              className="hover:scale-110 transition ease-in-out"
              alt="X"
              width={35}
              height={35}
            />
          </Link>
          <Link href="https://www.instagram.com/kanugurajesh/">
            <Image
              src="/instagram-contact.png"
              className="hover:scale-110 transition ease-in-out"
              alt="github"
              width={35}
              height={35}
            />
          </Link>
          <Link href="https://github.com/kanugurajesh/">
            <Image
              src="/github-contact.png"
              className="hover:scale-110 transition ease-in-out"
              alt="github"
              width={35}
              height={35}
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-7 h-3/4">
        <div className="flex justify-center">
          <Image
            src="/customer-service.png"
            className="hover:scale-110 transition ease-in-out mb-2 mt-10"
            alt="contact"
            width={70}
            height={80}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="text-input" className="font-bold">
            Name:
          </label>
          <input
            type="text"
            id="text-input"
            className="border outline-0 border-1 h-10 rounded-md p-2 font-normal w-80 focus:border-blue-500 focus:border-2"
            placeholder="Enter the name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email-input" className="font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email-input"
            className="border outline-0 border-1 h-10 rounded-md p-2 font-normal w-80 focus:border-blue-500 focus:border-2"
            placeholder="Enter the email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="textarea-input" className="font-bold">
            Message:
          </label>
          {/* @ts-ignore */}
          <textarea
            name=""
            placeholder="Enter the message"
            id="textarea-input"
            cols={30}
            rows={10}
            className="border outline-0 border-1 h-40 rounded-md p-2 font-normal w-80 focus:border-blue-500 focus:border-2"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          {/* @ts-ignore */}
          <button
            className="w-full font-bold bg-black hover:bg-white hover:text-black text-white px-5 py-3 rounded-md border border-2 transition ease-in-out mb-10 lg:mb-0"
            onClick={() => handleSubmit()}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
