"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { IconContext } from 'react-icons'
import { FaFileLines, FaGem } from "react-icons/fa6";
import  LHeader from '@/components/containers/local_header';
import  fetchMyContracts from '@/components/api/fetchMyContracts';
import  fetchMytickets from '@/components/api/fetchMytickets';

const mycontract_list = () => {

    const worker_id = "w001";
    const router = useRouter(); // ここでuseRouterを呼び出す
    const [contractInfo, setContractInfo] = useState(null);
    const [contractDone, setDONE] = useState(null);
    const [contractProgress, setProgress] = useState(null);
    const [mytickets, setMytickets] = useState(null);
    const [holdtickets, setHoldtickets] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // データの取得
                const data = await fetchMyContracts(worker_id);
                setContractInfo(data); // 取得したデータをstateに設定

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
            <LHeader />
            <div className='space-y-10'>
                <div className="stats shadow grid justify-items-center outline-base-300 outline-double">
                    <div className="stat text-center">

                        <div className="stat-figure text-primary">
                            <IconContext.Provider value={{size: '24px', color: 'primary'}}>
                                <FaFileLines />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title"><strong>契約総数</strong></div>
                        <div className="stat-value text-primary">{contractDone}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                    <div className="stat text-center">
                    <div className="stat-figure text-primary">
                            <IconContext.Provider value={{size: '24px', color: 'primary'}}>
                                <FaFileLines />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title"><strong>進行中の案件数</strong></div>
                        <div className="stat-value text-primary">{contractProgress}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                    <div className="stat text-center">
                    <div className="stat-figure text-primary">
                            <IconContext.Provider value={{size: '24px', color: 'primary'}}>
                                <FaGem />
                            </IconContext.Provider>
                        </div>
                        <div className="stat-title"><strong>保有チケット数</strong></div>
                        <div className="stat-value text-primary">{holdtickets}</div>
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
                                <th><div className="grid justify-items-center gap-3">Post</div></th>
                                <th><div className="grid justify-items-center gap-3">status</div></th>
                                <th><div className="grid justify-items-center gap-3">detail</div></th>
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
                                                {
                                                    Info.post_content.length > 40 ?
                                                    <div className="text-sm opacity-50">{Info.post_content.slice(0, 40)}...</div> :
                                                    <div className="text-sm opacity-50">{Info.post_content}</div>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    {(() => {
                                        let status;
                                        let style;
                                        if (Info.workers_posts) {
                                            const workerpost_progress = Info.workers_posts.workerpost_progress;
                                            if (workerpost_progress === 102) {
                                                status = "応募中";
                                                style = "btn btn-secondary btn-m w-32";
                                            } else if (workerpost_progress >= 201 && workerpost_progress < 300) {
                                                status = "契約中";
                                                style = "btn btn-primary btn-m w-32"
                                            } else if(workerpost_progress === 301){
                                                status = "完了";
                                                style = "btn btn-nautral btn-m w-32";
                                            }
                                        } else {
                                            status = "キャンセル";
                                        }
                                        return <div className={style}>{status}</div>;
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