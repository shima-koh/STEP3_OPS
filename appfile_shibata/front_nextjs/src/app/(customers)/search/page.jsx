"use client";
import React, { useState, useRef, useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Link from 'next/link';

import  Card  from '@/components/containers/card';


const search = () => {

    const handleSubmit = (event) => {
    
        event.preventDefault();
        if (!userInput.trim()) return;
    
        setUserInput('');
    }
    
    const [userInput, setUserInput] = useState('');

    
    const postDataArray = [
        {
        postId: 1,
        imageUrl: 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG61eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcH8XpJFUiwn81vFiIu__54ya1eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcHg2TUWon14TQrPwboFlQOaA==/iStock-1330168808-2-1024x683.jpg?errorImage=false',
        date_posted: '2023-01-01T12:34:56Z',  // 例としてISO 8601形式の日付を使用
        title: 'Sample Title',
        summary: 'This is a sample summary.',
        },
        {
            postId: 2,
            imageUrl: 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG61eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcH8XpJFUiwn81vFiIu__54ya1eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcHg2TUWon14TQrPwboFlQOaA==/iStock-1330168808-2-1024x683.jpg?errorImage=false',
            date_posted: '2023-01-01T12:34:56Z',  // 例としてISO 8601形式の日付を使用
            title: 'Sample Title2',
            summary: 'This is a sample summary.',
            },
            {
                postId: 3,
                imageUrl: 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG2ZbYGCyLpR5USnqNmgnrubG2eS9ra12f_cClqxFaU7sEVqSRX-bm7hsp208PQC780lNsE_Q6Zpk-Mc-TnctCKrRsT4BHw4vJBdyY7ak9s7DRpXI8zagw7M7s6pqkyURoHHaMywbr_BMmlTun-_KYV6wLsE3uha-6yaPxWI4vhYeWgKndumajZFiDs_DmVOSzUNwjXlNmeEcl5o10d8l38sEQrvx7DGkPOvn4HfbnSAi/761.jpg?errorImage=false',
                date_posted: '2023-01-01T12:34:56Z',  // 例としてISO 8601形式の日付を使用
                title: 'Sample Titl3',
                summary: 'This is a sample summary.',
            },
        {
                postId: 4,
                imageUrl: 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG61eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcH8XpJFUiwn81vFiIu__54ya1eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcHg2TUWon14TQrPwboFlQOaA==/iStock-1330168808-2-1024x683.jpg?errorImage=false',
                date_posted: '2023-01-01T12:34:56Z',  // 例としてISO 8601形式の日付を使用
                title: 'Sample Title4',
                summary: 'This is a sample summary.',
        },
    ];


    return (

        <>
            <h1>案件一覧</h1>

            <div className="join">

                {/* 入力欄 */}
                <form onSubmit={handleSubmit} className="p-4 bg-white w-[50vw]">
                    
                    <div className="flex items-center">

                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Search..."
                        className="flex-grow p-2 border border-gray-300 rounded"
                    />

                    <button type="submit" className="ml-2 btn btn-outline">
                        Search
                    </button>
                    

                    </div>
                    
                </form>

                {/* GPT遷移ボタン */}
                <Link href="/search/chatgpt" className='flex items-center justify-center p-4'>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </div>
                    </button>
                </Link>

            </div>

            {/* 検索トップのカードを並べておく*/}
            <div className='flex flex-wrap justify-center'>
                {postDataArray.map((postData, index) => (
                    <Card key={index} data={postData} />
                ))}
            </div>


        </>

    );
};

export default search;