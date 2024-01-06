"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter , useParams } from 'next/navigation'
import  Step_progress  from '@/components/containers/step_progress';
import  CoInfo_Card from '@/components/containers/coInfo_card';
import  Detail from '@/components/containers/detail';
import  fetchPostDetail from '@/components/api/fetchPostDetail';
import  fetchOrderStatus from '@/components/api/fetchOrderStatus';
import  LHeader from '@/components/containers/local_header';
import { IconContext } from 'react-icons'
import {  FaPenNib, FaPaperPlane, FaCircleCheck, FaCalendarDays, FaHandshakeSimple } from "react-icons/fa6";

const contract_progress = () => {

    const post_id  = useParams().id;
    const [postDetail, setPostDetail] = useState(null);
    const [postStatus, setPostStatus] = useState(null);
    const imageData = "https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqGzsxBwiJiVraNgd7o60HjQ1jV5HbZCVyB9cgjt9m79rJqEQsqVxBS2t6XmdK-O5Pm92Fdju7-xucXTa6NZMx56E-uO3n1vC_xyBK61asnWgImsAIT-x6idrWsefTEtGOVcXYiP5im2IOZfxzQwy8r6OOymJceRAQuk3aEH2VMwRc-ZBy58JmogZa_l4n2YqdWbJKtJ6xAaLB8dG6A3Z3sRpoTj5b248QHvoPxkP7eKfMj9gsCxw0PdsFsXedqBOfUw_wrO-yv018dO95n-bgMImn3Z1ars1cyk3zbe5tFRr9I7W8Vp3CxTfFWGRYL2S4NgI2RU5pKbc6ZRcop3qXz1DoyXlC4wgpzXhCXNHsyY3rb2GUrqu6bG8F0ntOX7LEN_ltdbDaIv2SZSxquFUZFP0nigC9RSU4oMsiofrpkW9cYkx09d6gElaXjLxYv8u5Lw==/20220922_182118_p_o_42526504.jpg?errorImage=false"
    const company_name = "企業名";
    const worker_id = "w001";

    useEffect(() => {
        const fetchDetail = async () => {
            if (post_id) {
                const data = await fetchPostDetail(post_id);
                setPostDetail(data);
                console.log("案件"+data);
                console.log(data);

                const statusdata = await fetchOrderStatus(post_id);
                setPostStatus(statusdata);
                console.log("ステータス");
                console.log(statusdata);
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

    const handleSubmit = async(event) => {    
        event.preventDefault();
        
        {/*if(post_status === 999){
            await InsertOrder(post_id);
        }*/}
        
    }


    let status ;
    let explain;
    let icon;
    if(postDetail[0].post_contractworker ===  null ){
        status = 1;
        explain = "応募済み" ;
        icon = <FaPaperPlane />;
    }else if(postDetail[0].post_contractworker ===  worker_id && postDetail[0].post_status === 201){
        status = 2;
        explain = "契約締結";
        icon = <FaHandshakeSimple />
    }else if(postDetail[0].post_contractworker ===  worker_id && postDetail[0].post_status === 202){
        status = 3;
        explain = "契約中";
        icon = <FaCalendarDays />;
    }else if(postDetail[0].post_contractworker ===  worker_id && postDetail[0].post_status === 203){
        status = 4;
        explain = "評価待ち";
        icon = <FaPenNib />;
    }else if(postDetail[0].post_contractworker ===  worker_id && postDetail[0].post_status === 204){
        status = 5;
        explain = "企業への評価";
        icon = <FaCircleCheck />;
    }else if(postDetail[0].post_contractworker ===  worker_id && postDetail[0].post_status === 300){
        status = 0;
        explain = "完了";
    }else {
        status = 0;
        explain = "キャンセル";
    };

    console.log(status);
    console.log(explain);

    return (
        <>
            <LHeader />
            <div className='space-y-10 grid justify-items-center'>

                <h1>案件進捗</h1>

                {status >= 1 && status <= 5 && (
                    <Step_progress role="worker" status={status} />
                )}
                

                <div className='card bg-primary-content w-full p-4 mt-4 flex items-center'>
                    
                    <div className="flex flex-col items-center justify-center p-4">
                        <IconContext.Provider value={{size: '60px'}}>
                            {icon}
                        </IconContext.Provider>
                        <h2 className='pt-2'><strong>{explain}</strong></h2>
                    </div>

                    {/* 案件進捗ボタン */}
                    {status === 1 && (
                        <form className="p-2" onSubmit={handleSubmit}>
                            <button type="submit" className="btn bg-white btn-outline btn-error">
                                応募取り消し
                            </button>
                        </form>
                    )}

                    {status === 2 && (
                        <form className="p-2" onSubmit={handleSubmit}>
                            <button type="submit" className="btn bg-white btn-outline">
                                業務開始
                            </button>
                        </form>
                    )}

                    {status === 3 && (
                        <form className="p-2" onSubmit={handleSubmit}>
                            <button type="submit" className="btn bg-white btn-outline">
                                業務完了
                            </button>
                        </form>
                    )}

                    {status === 5 && (
                        <form className="p-2" onSubmit={handleSubmit}>
                            <button type="submit" className="btn bg-white btn-outline">
                                完了
                            </button>
                        </form>
                    )}

                </div>

                <CoInfo_Card company_name = {company_name}  imageData = {imageData} ></CoInfo_Card>

                {/*詳細カード*/}
                <div className="card w-[80vw] bg-base-100 shadow-xl outline outline-base-200">
                    <Detail data={postDetail}/>
                </div>
                
            </div>

        </>

    );
};

export default contract_progress;