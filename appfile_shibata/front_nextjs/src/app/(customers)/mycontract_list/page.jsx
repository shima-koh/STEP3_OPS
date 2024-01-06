"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import  WorkerInfo_Card from '@/components/containers/workerInfo_card';
import { IconContext } from 'react-icons'
import { FaGear, FaHeart, FaFileLines, FaEnvelope, FaLightbulb, FaGem } from "react-icons/fa6";
import  LHeader from '@/components/containers/local_header';
import  fetchMyContracts from '@/components/api/fetchMyContracts';

const mycontract_list = () => {

    const worker_id = "w001";
    const router = useRouter(); // ここでuseRouterを呼び出す
    const [contractInfo, setContractInfo] = useState(null);

    useEffect(() => {
        const fetchContractData = async () => {
            try {
                // データの取得
                const data = await fetchMyContracts(worker_id);
                setContractInfo(data); // 取得したデータをstateに設定
            } catch (error) {
                console.error("Error fetching worker data:", error);
                // エラー処理が必要な場合、適切なエラーハンドリングを行う
            }
        };
        fetchContractData(); // 関数の呼び出し
    }, [worker_id]);


    return (
        <>
            <LHeader />
            <div className='space-y-10'>
                <div className="stats shadow">
                    <div className="stat text-center">

                        <div className="stat-figure text-primary">
                            <IconContext.Provider value={{size: '24px', color: 'primary'}}>
                                <FaFileLines />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title">契約総数</div>
                        <div className="stat-value text-primary">25</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                    <div className="stat text-center">
                    <div className="stat-figure text-primary">
                            <IconContext.Provider value={{size: '24px', color: 'primary'}}>
                                <FaFileLines />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title">進行中の案件数</div>
                        <div className="stat-value text-primary">6</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                    <div className="stat text-center">
                    <div className="stat-figure text-primary">
                            <IconContext.Provider value={{size: '24px', color: 'primary'}}>
                                <FaGem />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title">保有チケット数</div>
                        <div className="stat-value text-primary">2</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
            

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>title</th>
                                <th>Content</th>
                                <th>status</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {contractInfo && contractInfo.map((Info, index) => (
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{Info.post_title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{Info.post_title}</td>
                                    <td>
                                    {(() => {
                                        let status;
                                        if (Info.workers_posts) {
                                            const workerpost_progress = Info.workers_posts.workerpost_progress;
                                            if (workerpost_progress === 102) {
                                                status = "応募中";
                                            } else if (workerpost_progress >= 201 && workerpost_progress < 300) {
                                                status = "契約中";
                                            } else if(workerpost_progress === 300){
                                                status = "完了";
                                            }
                                        } else {
                                            status = "キャンセル";
                                        }
                                        return <div className="btn btn-accent btn-m">{status}</div>;
                                    })()}
                                    </td>
                                    <th>
                                        <Link  href="/contract_progress/[id]" as={`/contract_progress/${Info.post_id}`}>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </Link>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>       
        </>

    );
};

export default mycontract_list;