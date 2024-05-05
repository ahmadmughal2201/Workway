"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState(""); // new state
    const [occupation, setOccupation] = useState(""); // new state
    const [error, setError] = useState("");
    const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate distance from the center
        const distance = Math.sqrt((clientX - centerX) ** 2 + (clientY - centerY) ** 2);

        // Set gradient position based on distance
        setGradientPosition({ x: distance, y: distance });
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const gradientStyle = {
        background: `radial-gradient(circle at ${gradientPosition.x}px ${gradientPosition.y}px,  #1E90FF,#1D4ED8)`,
    };

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are necessary.");
            return;
        }

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("User already exists.");
                return;
            }

            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    bio, // include bio in the request
                    occupation, // include occupation in the request

                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    };

    return (
        <div
            className="flex items-center bg-[#F1F3F6] justify-between h-screen  "
        >
            <div
                className="shadow-2xl flex flex-col justify-center items-center h-full py-16 gap-3  w-[500px] bg-white"
            >
                <div className="flex flex-col pb-10">

                    <div className="flex gap-2">
                        <img className="" src="/assets/images/logo.svg" />

                        <h1 className="text-xl font-semibold my-4 text-blue-700 text-center">
                            Workway
                        </h1>

                    </div>
                    <p className="text-sm font-semibold text-blue-950"> Join our comunity! </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                        className=" px-4 py-2 rounded-md bg-[#F1F3F6] focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        className=" px-4 py-2 rounded-md bg-[#F1F3F6] focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className=" px-4 py-2 rounded-md bg-[#F1F3F6] focus:outline-none focus:ring focus:border-blue-500"
                    />

                    <input
                        onChange={(e) => setBio(e.target.value)}
                        type="text"
                        placeholder="Bio" // add placeholder for bio
                        className=" px-4 py-2 rounded-md bg-[#F1F3F6] focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        onChange={(e) => setOccupation(e.target.value)}
                        type="text"
                        placeholder="Occupation" // add placeholder for occupation
                        className=" px-4 py-2 rounded-md bg-[#F1F3F6] focus:outline-none focus:ring focus:border-blue-500"
                    />

                    <button className="bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md text-white font-bold cursor-pointer px-6 py-2">
                        Register
                    </button>

                    {error && (
                        <div className="text-red-500  w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link className="text-sm mt-3 text-right" href={"/"}>
                        Already have an account? <span className="underline text-blue-700">Login</span>
                    </Link>
                </form>
            </div>
            <div className="hidden md:flex items-center w-full justify-center">
                <img className="w-[450px] h-[450px]" src="/assets/images/login.svg">
                </img>
            </div>
        </div>
    );
}
