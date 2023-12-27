"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'

import 'react-perfect-scrollbar/dist/css/styles.css';
import Link from 'next/link';

import  Card  from '@/components/containers/card';



const post_detail = () => {

    const router = useRouter(); // ここでuseRouterを呼び出す

    const handleSubmit = (event) => {

        event.preventDefault(); //Submitによるリロードを防ぐ
        // フォームが送信されたときの処理
        // ...
    
        // ページ遷移
    router.push('/contract_progress');
    }

    const [userInput, setUserInput] = useState('');

    return (
        <>
            <h1>案件詳細</h1>

            {/*応募ボタン*/}
            <form onSubmit={handleSubmit} className="p-4 bg-white w-[50vw] items-end">   

                <button type="submit" className="ml-2 btn btn-outline">
                    応募
                </button>
                    
            </form>

            {/*ダミーコンテンツ */}
            <div className="flex p-4 flex-col gap-4 w-full">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            </div>

        </>

    );
};

export default post_detail;