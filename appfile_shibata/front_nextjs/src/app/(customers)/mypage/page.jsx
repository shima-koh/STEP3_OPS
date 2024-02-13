"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import  WorkerInfo_Card from '@/components/containers/workerInfo_card';
import { IconContext } from 'react-icons'
import { FaGear, FaHeart, FaFileLines, FaEnvelope, FaLightbulb, FaGem } from "react-icons/fa6";
import  fetchWorker  from '@/components/api/fetchWorkerProfile';
import  fetchMyContracts from '@/components/api/fetchMyContracts';
import  fetchMytickets from '@/components/api/fetchMytickets';


const worker_profile = () => {

    const worker_id = "w001";
    const router = useRouter(); // ここでuseRouterを呼び出す
    const [workerInfo, setWorkerInfo] = useState(null);
    const [worker_name, setWorkerName] = useState(null); 
    const [worker_image, setWorkerImage] = useState(null); 
    const [worker_profile, setWorkerProfile] = useState(null); 
    const [contractInfo, setContractInfo] = useState(null);
    const [contractDone, setDONE] = useState(null);
    const [contractProgress, setProgress] = useState(null);
    const [mytickets, setMytickets] = useState(null);
    const [holdtickets, setHoldtickets] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // データの取得
                const data = await fetchWorker(worker_id);
                setWorkerInfo(data); // 取得したデータをstateに設定

                const contractdata = await fetchMyContracts(worker_id);
                setContractInfo(contractdata); // 取得したデータをstateに設定

                const ticketdata = await fetchMytickets(worker_id);
                setMytickets(ticketdata); // 取得したデータをstateに設定

            } catch (error) {
                console.error("Error fetching worker data:", error);
                // エラー処理が必要な場合、適切なエラーハンドリングを行う
            }
        };
        fetchData(); // 関数の呼び出し
    }, [worker_id]);

    useEffect(() => {
        if (workerInfo && workerInfo.length > 0) {
            setWorkerName(workerInfo[0].worker_name);
            setWorkerImage(workerInfo[0].worker_image);
            setWorkerProfile(workerInfo[0].worker_profile);
        }
    }, [workerInfo]);

    useEffect(() => {
        let done_num = 0;
        let progress_num = 0;
        if (contractInfo && contractInfo.length > 0) {
            // 各データのカラムを足し合わせる
            contractInfo.forEach((row) => {
                if(row.post_status >= 201 && row.post_status < 300){progress_num += 1;}
                if(row.post_status >= 201 && row.post_status <= 301){done_num += 1;}
            });
        }
        setDONE(done_num);
        setProgress(progress_num);
    }, [contractInfo]);

    useEffect(() => {
        let tickets = 0;
        if (mytickets && mytickets.length > 0) {
            // 各データのカラムを足し合わせる
            mytickets.forEach((row) => {
                if(row.post_id === null){tickets += 1;}
            });
        }
        setHoldtickets(tickets);
    }, [mytickets]);
    
    return (
        <>
            <div className='w-[60hv] p-8 space-y-10 '>

                <div className="stats shadow outline-base-300 outline-double">
                    <div className="stat text-center">

                        <div className="stat-figure text-neutral">
                            <IconContext.Provider value={{size: '24px', color: 'orange'}}>
                                <FaFileLines />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title"><strong>契約総数</strong></div>
                        <div className="stat-value text-primary">{contractDone}</div>
                        <div className="stat-desc">16% more than last month</div>
                    </div>
                    
                    <div className="stat text-center">
                    <div className="stat-figure text-neutral">
                            <IconContext.Provider value={{size: '24px', color: 'orange'}}>
                                <FaFileLines />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title"><strong>進行中の案件数</strong></div>
                        <div className="stat-value text-primary">{contractProgress}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                    <div className="stat text-center">
                    <div className="stat-figure text-neutral">
                            <IconContext.Provider value={{size: '24px', color: 'orange'}}>
                                <FaGem />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title"><strong>保有チケット数</strong></div>
                        <div className="stat-value text-primary">{holdtickets}</div>
                        <div className="stat-desc">please buy new tickets</div>
                    </div>
                </div>

                <div>
                    <WorkerInfo_Card worker_id={worker_id} worker_name={worker_name} imageData={worker_image}/>
                </div>

                <div className="grid grid-cols-2 gap-8">

                    <div className="flex justify-center items-center">
                        <Link href="/mycontract_list/" class='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral hover:text-primary transition duration-200 hover:duration-300'>
                            <div className="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaFileLines />
                                </IconContext.Provider>
                                <h2 className='pt-2'>契約一覧</h2>
                            </div>
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <Link href="/worker_profile" class='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral hover:text-primary transition duration-200 hover:duration-300'>
                            <div className="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaHeart />
                                </IconContext.Provider>
                                <h2 className='pt-2'>お気に入り一覧</h2>
                            </div>
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <Link href="/worker_profile" class='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral hover:text-primary transition duration-200 hover:duration-300'>
                            <div className="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaLightbulb />
                                </IconContext.Provider>
                                <h2 className='pt-2'>フィードバック</h2>
                            </div>
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <Link href="/helpTicket" class='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral hover:text-primary transition duration-200 hover:duration-300'>
                            <div className="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaGem />
                                </IconContext.Provider>
                                <h2 className='pt-2'>お助けチケット</h2>
                            </div>
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <Link href="/worker_profile" class='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral hover:text-primary transition duration-200 hover:duration-300'>
                            <div className="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaEnvelope />
                                </IconContext.Provider>
                                <h2 className='pt-2'>お知らせ</h2>
                            </div>
                        </Link>
                    </div>

                    <div class="flex justify-center items-center">
                        <Link href="/worker_profile" class='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral  hover:text-primary transition duration-200 hover:duration-300'>
                            <div class="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaGear />
                                </IconContext.Provider>
                                <h2 className='pt-2'>設定</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    );
};

export default worker_profile;