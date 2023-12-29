"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import  Step_progress  from '@/components/containers/step_progress';
import  Avatar from '@/components/atoms/avatar';



const contract_progress = () => {

   // const [userInput, setUserInput] = useState('');

    const imageData = "url"
    const company_name = "企業名"

    return (
        <>
            <h1>案件進捗</h1>

            <Step_progress />

            <div className='card bg-blue-200 p-4 mt-4 w-[80%] flex items-center justify-center'>
                <h2>応募中・確認待ち</h2>
            </div>

            {/**企業のInfoカード */}
            <div className="card bg-base-100 shadow-xl p-4 card-side">
                {/**企業のプロフィール画像表示 */}
                <figure className="px-10 pt-10">
                    <Avatar size="M" imageData={imageData}/>
                </figure>

                {/**企業サマリ情報*/}
                <div className="card-body text-center w-96">
                    <h2 className="card-title">{company_name}</h2>
                </div>
            </div>

            {/*案件進捗ボタン*/}
            <form className="p-4 bg-white">
                <button type="submit" className="btn btn-outline btn-error">
                    応募取り消し
                </button>
            </form>

            
        </>

    );
};

export default contract_progress;