"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter , useParams } from 'next/navigation'
import 'react-perfect-scrollbar/dist/css/styles.css';
import  Detail from '@/components/containers/detail';
import  PHeader from '@/components/containers/post_header';
import  LHeader from '@/components/containers/local_header';
import  fetchPostDetail from '@/components/api/fetchPostDetail';
import Link from 'next/link';

const post_detail = () => {

    const post_id  = useParams().id;
    const [postDetail, setPostDetail] = useState(null);

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
        return( 
            <div className="grid w-[80vw] space-y-4">
                <div className="skeleton p-4 flex justify-end h-4 w-28"></div>
                <div className="skeleton h-8 w-full"></div>
                <div className="skeleton h-20 w-full"></div>
            </div>
        );
    }

    return (
        <>
            <LHeader />

            <div className="grid justify-items-center p-4">
                {/*詳細カード*/}
                <div className="card w-[80vw] bg-base-100 shadow-xl outline outline-base-200">

                {/*案件ヘッダー*/}
                <PHeader data={postDetail}></PHeader>

                <Detail data={postDetail}/>

                </div>
            </div>

        </>

    );
};

export default post_detail;