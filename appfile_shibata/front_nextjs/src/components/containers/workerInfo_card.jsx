"use client";
import React from 'react'
import Link from 'next/link';
import  Avatar from '@/components/atoms/avatar';


const workerInfo_card = (props) =>  {

    const {worker_id, worker_name, imageData} = props;

    return (
        <>
            {/**workerのInfoカード */}
            <Link  href="/worker_profile/[id]" as={`/worker_profile/${worker_id}`}>
                <div className="card bg-base-100 shadow-xl p-4 card-side outline outline-base-200 ">
                    {/**workerのプロフィール画像表示 */}
                    <figure className="px-10 ">
                        <Avatar size="M" imageData={imageData}/>
                    </figure>

                    {/**workerサマリ情報*/}
                    <div className="card-body grid justify-items-center place-content-center w-96">
                        <h2 className="card-title">{worker_name}</h2>
                        <p>Biz:87 / Tech:73 / Design:38 </p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default workerInfo_card;