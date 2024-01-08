"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import  WorkerInfo_Card from '@/components/containers/workerInfo_card';
import { IconContext } from 'react-icons'
import { FaGear, FaHeart, FaFileLines, FaEnvelope, FaLightbulb, FaGem } from "react-icons/fa6";
import  fetchWorker  from '@/components/api/fetchWorkerProfile';
import  LHeader from '@/components/containers/local_header';

const worker_profile = () => {

    const worker_id = "w001";
    const router = useRouter(); // ここでuseRouterを呼び出す
    const [workerInfo, setWorkerInfo] = useState(null);
    const [worker_name, setWorkerName] = useState(null); 
    const [worker_image, setWorkerImage] = useState(null); 
    const [worker_profile, setWorkerProfile] = useState(null); 

    useEffect(() => {
        const fetchWorkerData = async () => {
            try {
                // データの取得
                const data = await fetchWorker(worker_id);
                setWorkerInfo(data); // 取得したデータをstateに設定
            } catch (error) {
                console.error("Error fetching worker data:", error);
                // エラー処理が必要な場合、適切なエラーハンドリングを行う
            }
        };
        fetchWorkerData(); // 関数の呼び出し
    }, [worker_id]);

    useEffect(() => {
        if (workerInfo && workerInfo.length > 0) {
            setWorkerName(workerInfo[0].worker_name);
            setWorkerImage(workerInfo[0].worker_image);
            setWorkerProfile(workerInfo[0].worker_profile);
        }
    }, [workerInfo]);
    
    return (
        <>
            <LHeader />

            <div className='w-[60hv] p-8 space-y-10 '>

                <div className="stats shadow grid justify-items-center outline-base-300 outline-double">
                    <div className="stat text-center">

                        <div className="stat-figure text-neutral">
                            <IconContext.Provider value={{size: '24px', color: 'orange'}}>
                                <FaFileLines />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title"><strong>契約総数</strong></div>
                        <div className="stat-value text-primary">25</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                    <div className="stat text-center">
                    <div className="stat-figure text-neutral">
                            <IconContext.Provider value={{size: '24px', color: 'orange'}}>
                                <FaFileLines />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title"><strong>進行中の案件数</strong></div>
                        <div className="stat-value text-primary">6</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                    <div className="stat text-center">
                    <div className="stat-figure text-neutral">
                            <IconContext.Provider value={{size: '24px', color: 'orange'}}>
                                <FaGem />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title"><strong>保有チケット数</strong></div>
                        <div className="stat-value text-primary">2</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>


                <div className="grid grid-cols-3 gap-8">


                    <div className="flex justify-center items-center">
                        <Link href="/worker_profile" class='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral hover:text-primary transition duration-200 hover:duration-300'>
                            <div className="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaGem />
                                </IconContext.Provider>
                                <h2 className='pt-2'>チケット利用</h2>
                            </div>
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <Link href="/worker_profile" class='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral hover:text-primary transition duration-200 hover:duration-300'>
                            <div className="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaEnvelope />
                                </IconContext.Provider>
                                <h2 className='pt-2'>チケット購入</h2>
                            </div>
                        </Link>
                    </div>

                    <div class="flex justify-center items-center">
                        <Link href="/worker_profile" class='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral  hover:text-primary transition duration-200 hover:duration-300'>
                            <div class="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaGear />
                                </IconContext.Provider>
                                <h2 className='pt-2'>利用履歴</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    );
};

export default worker_profile;