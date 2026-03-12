"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
    const user = useUser();
    return (
        <>
            <div>
                <section id="home" className="relative bg-blue-400 min-h-screen pt-[10vh] flex items-center justify-center"
                >
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72  rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
                        <div className="absolute top-3/4 right-1/4 w-72 h-72  rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" ></div>
                    </div>

                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <div className="animate-fadeInUp">
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                                Welcome to the
                                <span className="block bg-gradient-to-r from-red-400 to-purple-800 bg-clip-text text-transparent">
                                    TOWATCH
                                </span>
                            </h1>
                            <p className="text-xl font-bold sm:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                                You can now watch movies and TV shows with your friends, no matter where you are.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {!user ? <Link href={"/sign-in"} >
                                    <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center">
                                        <i data-lucide="rocket" className="w-5 h-5 mr-2"></i>
                                        Get Started
                                    </button>

                                </Link> :<div className="flex gap-5 justify-center ">
                                     <Link href={'/dashboard'}> <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-lg  ">

                                    Dashboard
                                </button>
                                
                                 </Link>  
                                  <button className="bg-blue-900 glass-effect text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 ">

                                    Learn More
                                </button>
                                </div>
                                 }

                               
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
