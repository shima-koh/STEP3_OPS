"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter , useParams } from 'next/navigation'
import  Step_progress  from '@/components/containers/step_progress';
import  CoInfo_Card from '@/components/containers/coInfo_card';
import  Detail from '@/components/containers/detail';
import  fetchPostDetail from '@/components/api/fetchPostDetail';
import  fetchFB from '@/components/api/fetchFB';
import  LHeader from '@/components/containers/local_header';
import { IconContext } from 'react-icons'
import {  FaPenNib, FaPaperPlane, FaCircleCheck, FaCalendarDays, FaHandshakeSimple } from "react-icons/fa6";
import  fetchComapnyInfo from '@/components/api/fetchCoInfo';

const contract_progress = () => {

    const post_id  = useParams().id;
    const [postDetail, setPostDetail] = useState(null);
    const [worker_fb, setWorkerfb] = useState(null); 
    const [companyInfo, setCompanyInfo] = useState(null);

    const worker_id = "w001";

    useEffect(() => {
        const fetchDetail = async () => {
            if (post_id) {
                const data = await fetchPostDetail(post_id);
                setPostDetail(data);

                const fbdata = await fetchFB(post_id);
                console.log(fbdata);
                setWorkerfb(fbdata);

            }
        };

        fetchDetail();
    }, [post_id]);


    useEffect(() => {
        const fetchCompany = async () => {
            if (postDetail && postDetail.length > 0) {
                const companydata = await fetchComapnyInfo(postDetail[0].post_company);
                setCompanyInfo(companydata);
            }
        };

        fetchCompany();
    }, [postDetail]);

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
        icon = <FaPaperPlane className='text-primary'/>;
    }else if(postDetail[0].post_contractworker ===  worker_id && postDetail[0].post_status === 201){
        status = 2;
        explain = "契約締結";
        icon = <FaHandshakeSimple className='text-primary'/>
    }else if(postDetail[0].post_contractworker ===  worker_id && postDetail[0].post_status === 202){
        status = 3;
        explain = "契約中";
        icon = <FaCalendarDays className='text-primary'/>;
    }else if(postDetail[0].post_contractworker ===  worker_id && postDetail[0].post_status === 203){
        status = 4;
        explain = "評価待ち";
        icon = <FaPenNib className='text-primary'/>;
    }else if(postDetail[0].post_contractworker ===  worker_id && postDetail[0].post_status === 204){
        status = 5;
        explain = "企業への評価";
        icon = <FaCircleCheck className='text-success'/>;
    }else if(postDetail[0].post_contractworker ===  worker_id && postDetail[0].post_status === 301){
        status = 0;
        explain = "完了";
        icon = <FaCircleCheck className='text-success'/>;
    }else {
        status = 999;
        explain = "キャンセル";
    };

    let companyData;
    if(companyInfo && companyInfo.length > 0){
        companyData = companyInfo[0]
    }

    if(worker_fb && worker_fb.length > 0){
    console.log("fb"+worker_fb.totalscore);}

    return (
        <>
            <LHeader />
            <div className='space-y-10 grid justify-items-center'>

                <h1>案件進捗</h1>

                {status >= 1 && status <= 5 && (
                    <Step_progress role="worker" status={status} />
                )}
                

                <div className='card bg-base-200 w-full p-4 mt-4 flex items-center'>
                    
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

                    {status === 0 && worker_fb && worker_fb.length > 0 &&(
                        
                        <div className="p-2 grid justify-items-center">
                            <h4 className='text-2xl'><strong>企業からのFB内容</strong></h4>
                            <div className='p-4'>
                                <p>■トータルスコア：<strong className="text-lg">{worker_fb[0].totalscore}</strong></p>
                                <p>■テクノロジー領域のスキルへの評価：<strong className="text-lg">{worker_fb[0].TechScore}</strong></p>
                                <p>■デザイン領域のスキルへの評価：<strong className="text-lg">{worker_fb[0].DesignScore}</strong></p>
                                <p>■ビジネス領域のスキルへの評価：<strong className="text-lg">{worker_fb[0].BizScore}</strong></p>
                                <p>■コメント：{worker_fb[0].feedback_content}</p>
                            </div>
                        </div>
                    )}

                </div>

                <CoInfo_Card data = {companyData} ></CoInfo_Card>

                {/*詳細カード*/}
                <div className="card w-[80vw] bg-base-100 shadow-xl outline outline-base-200">
                    <Detail data={postDetail}/>
                </div>
                
            </div>

        </>

    );
};

export default contract_progress;