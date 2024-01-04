"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter , useParams } from 'next/navigation'
import  Step_progress  from '@/components/containers/step_progress';
import  CoInfo_Card from '@/components/containers/coInfo_card';
import  Detail from '@/components/containers/detail';
import  fetchPostDetail from '@/components/api/fetchPostDetail';
import  LHeader from '@/components/containers/local_header';

const contract_progress = () => {

    const post_id  = useParams().id;
    const [postDetail, setPostDetail] = useState(null);
    const imageData = "https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqGzsxBwiJiVraNgd7o60HjQ1jV5HbZCVyB9cgjt9m79rJqEQsqVxBS2t6XmdK-O5Pm92Fdju7-xucXTa6NZMx56E-uO3n1vC_xyBK61asnWgImsAIT-x6idrWsefTEtGOVcXYiP5im2IOZfxzQwy8r6OOymJceRAQuk3aEH2VMwRc-ZBy58JmogZa_l4n2YqdWbJKtJ6xAaLB8dG6A3Z3sRpoTj5b248QHvoPxkP7eKfMj9gsCxw0PdsFsXedqBOfUw_wrO-yv018dO95n-bgMImn3Z1ars1cyk3zbe5tFRr9I7W8Vp3CxTfFWGRYL2S4NgI2RU5pKbc6ZRcop3qXz1DoyXlC4wgpzXhCXNHsyY3rb2GUrqu6bG8F0ntOX7LEN_ltdbDaIv2SZSxquFUZFP0nigC9RSU4oMsiofrpkW9cYkx09d6gElaXjLxYv8u5Lw==/20220922_182118_p_o_42526504.jpg?errorImage=false"
    const company_name = "企業名"

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
            <div className='space-y-10 grid justify-items-center'>

                <h1>案件進捗</h1>

                <Step_progress role="worker" status="step3"/>

                <div className='card bg-primary-content w-full p-4 mt-4 flex items-center'>
                    <h2>応募中・確認待ち</h2>
                    <p>応募中・確認待ち</p>
                    
                    {/*案件進捗ボタン*/}
                    <form className="p-4">
                        <button type="submit" className="btn bg-white btn-outline btn-error">
                            応募取り消し
                        </button>
                    </form>
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