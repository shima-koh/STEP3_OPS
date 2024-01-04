"use client";
import React, { useState, useRef, useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Link from 'next/link';

import  Card  from '@/components/containers/card';
import { FaMicroblog } from "react-icons/fa6";
import { IconContext } from 'react-icons'

const fetchTest = async () => {
    try {
        const staticData = await fetch('http://127.0.0.1:5000/activePosts');
        const responseData = await staticData.json(); // Parse JSON

        console.log(responseData);
        return responseData; // Access 'activePosts' from parsed JSON
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const search = () => {

    const [userInput, setUserInput] = useState('');
    const [Posts, setPosts] = useState(null);

    const handleSubmit = (event) => {
    
        event.preventDefault();
        if (!userInput.trim()) return;
    
        setUserInput('');
    }
    
    useEffect(() => {
        const fetchData = async () => {
        const data = await fetchTest();
        setPosts(data);
        };

        fetchData();
    }, []); // 空の依存配列を渡すことで、マウント時に一度だけ実行されます

    return (
        <>

            <div className="join">

                {/* 入力欄 */}
                <form onSubmit={handleSubmit} className="p-4 w-[50vw]">
                    
                    <div className="flex items-center">

                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Search..."
                        className="flex-grow p-2 border border-gray-300 rounded"
                    />

                    <button type="submit" className="ml-2 btn btn-outline tooltip" data-tip="search">
                        Search
                    </button>
                    

                    </div>
                    
                </form>

                {/* GPT遷移ボタン */}
                <Link href="/search/chatgpt" className='flex items-center justify-center'>
                    <button className="btn btn-ghost btn-circle flex flex-col items-center justify-center tooltip" data-tip="chat with AI">
                        <IconContext.Provider value={{size: '24px', color: 'primary'}}>
                            <FaMicroblog/>
                        </IconContext.Provider>
                    </button>
                </Link>

            </div>

            

            {/* 検索トップのカードを並べておく*/}
            <div className='flex flex-wrap justify-center'>
                {Posts && Posts.map((Post, index) => (
                    <Card key={index} data={Post} />
                ))}
            </div>

        </>

    );
};

export default search;