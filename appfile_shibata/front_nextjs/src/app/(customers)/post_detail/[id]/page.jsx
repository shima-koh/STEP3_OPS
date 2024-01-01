"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter , useParams } from 'next/navigation'
import 'react-perfect-scrollbar/dist/css/styles.css';
import Link from 'next/link';


const fetchPostDetail = async (post_id) => {
    try {
        const res = await fetch(`http://127.0.0.1:5000/post_detail?post_id=${post_id}`);
        const responseData = await res.json(); // Parse JSON
        return responseData; // Return the entire response data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const post_detail = () => {

    const router = useRouter()

    const handleSubmit = (event) => {
        event.preventDefault(); //Submitによるリロードを防ぐ
        // フォームが送信されたときの処理
        // ...
    
        // ページ遷移
        router.push('/contract_progress');
    }

    const post_id  = useParams().id;
    const [postDetail, setPostDetail] = useState(null);

    console.log("LoG: " + post_id)

    useEffect(() => {
        const fetchDetail = async () => {
            if (post_id) {
                const data = await fetchPostDetail(post_id);
                setPostDetail(data);
            }
        };

        fetchDetail();
    }, [post_id]);

    if (!postDetail) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <h1>案件詳細</h1>

            {/*応募ボタン*/}

            <div  className="p-4 flex w-[60vw] justify-end">
                <button type="button" className="ml-2 btn btn-outline" onClick={() => router.push('/contract_progress')}>
                    応募
                </button>
            </div>



            {/*ダミーコンテンツ */}
            <div className="flex p-4 flex-col gap-4 w-full">
            <p>{postDetail.postedBy}</p>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            </div>

        </>

    );
};

export default post_detail;