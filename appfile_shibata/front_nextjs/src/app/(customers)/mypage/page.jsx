"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Avatar from '@/components/atoms/avatar';
import { IconContext } from 'react-icons'
import { FaGear, FaHeart, FaFileLines, FaEnvelope, FaLightbulb, FaGem } from "react-icons/fa6";


const worker_profile = () => {

    const worker_name = "Claire";
    const introduction = "hello hello profile hello hello profile hello hello profile hello hello profile hello hello profile";


    const router = useRouter(); // ここでuseRouterを呼び出す

    const handleSubmit = (event) => {

        event.preventDefault(); //Submitによるリロードを防ぐ
        // フォームが送信されたときの処理
        // ...
    
        // ページ遷移
    router.push('/contract_progress');
    }

    const [userInput, setUserInput] = useState('');

    const imageData = "https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG5-6MFLx6IfxonfMofFua39122ucsGpRMMXHaqnPy2bQr8VRbaGZTNm4k2gmmuKdngzMsaM1n75u42jVhB6pPg1iKkjDn5wB5NpbpoxJzlWq2uwcw3nHNQweb5BymPKA5DJuZPPLPDfPJQ0w0VSR92nzE-G845rxiiRDSH0WQWwmzkPH3AmGnC4IMn8JbmSV6YPUqKPkXMCcnkTthRrZHZeDZNRaifXhNCs_BugWVA5o/Avatar.jpg?errorImage=false";

    return (
        <>
            <h1>Profile</h1>

            <div className='w-[60hv] p-8'>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">Total Likes</div>
                        <div className="stat-value text-primary">25.6K</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Page Views</div>
                        <div className="stat-value text-secondary">2.6M</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        </div>
                        <div className="stat-value">86%</div>
                        <div className="stat-title">Tasks done</div>
                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                    </div>
                </div>


                <div class="grid grid-cols-2 gap-8">

                    <div class="flex justify-center items-center">
                            <Link href="/worker_profile" class='card outline w-60 h-30 bg-base-100 shadow-xl hover:bg-gray-200 transition duration-300'>
                                <div class="flex flex-col items-center justify-center p-4">
                                    <IconContext.Provider value={{size: '36px'}}>
                                        <FaFileLines />
                                    </IconContext.Provider>
                                    <h2 className='pt-2'>契約一覧</h2>
                                </div>
                            </Link>
                        </div>

                        <div class="flex justify-center items-center">
                            <Link href="/worker_profile" class='card outline w-60 h-30 bg-base-100 shadow-xl hover:bg-gray-200 transition duration-300'>
                                <div class="flex flex-col items-center justify-center p-4">
                                    <IconContext.Provider value={{size: '36px'}}>
                                        <FaHeart />
                                    </IconContext.Provider>
                                    <h2 className='pt-2'>お気に入り一覧</h2>
                                </div>
                            </Link>
                        </div>

                        <div class="flex justify-center items-center">
                            <Link href="/worker_profile" class='card outline w-60 h-30 bg-base-100 shadow-xl hover:bg-gray-200 transition duration-300'>
                                <div class="flex flex-col items-center justify-center p-4">
                                    <IconContext.Provider value={{size: '36px'}}>
                                        <FaLightbulb />
                                    </IconContext.Provider>
                                    <h2 className='pt-2'>フィードバック</h2>
                                </div>
                            </Link>
                        </div>

                        <div class="flex justify-center items-center">
                            <Link href="/worker_profile" class='card outline w-60 h-30 bg-base-100 shadow-xl hover:bg-gray-200 transition duration-300'>
                                <div class="flex flex-col items-center justify-center p-4">
                                    <IconContext.Provider value={{size: '36px'}}>
                                        <FaGem />
                                    </IconContext.Provider>
                                    <h2 className='pt-2'>お助けチケット</h2>
                                </div>
                            </Link>
                        </div>

                        <div class="flex justify-center items-center">
                            <Link href="/worker_profile" class='card outline w-60 h-30 bg-base-100 shadow-xl hover:bg-gray-200 transition duration-300'>
                                <div class="flex flex-col items-center justify-center p-4">
                                    <IconContext.Provider value={{size: '36px'}}>
                                        <FaEnvelope />
                                    </IconContext.Provider>
                                    <h2 className='pt-2'>お知らせ</h2>
                                </div>
                            </Link>
                        </div>

                        <div class="flex justify-center items-center">
                            <Link href="/worker_profile" class='card outline w-60 h-30 bg-base-100 shadow-xl hover:bg-gray-200 transition duration-300'>
                                <div class="flex flex-col items-center justify-center p-4">
                                    <IconContext.Provider value={{size: '36px'}}>
                                        <FaGear />
                                    </IconContext.Provider>
                                    <h2 className='pt-2'>設定</h2>
                                </div>
                            </Link>
                        </div>
                    </div>
            </div>
        </>

    );
};

export default worker_profile;