"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import  WorkerInfo_Card from '@/components/containers/workerInfo_card';
import { IconContext } from 'react-icons'
import { FaGear, FaHeart, FaFileLines, FaEnvelope, FaLightbulb, FaGem, FaClockRotateLeft, FaCoins, FaRegCalendarCheck } from "react-icons/fa6";
import  fetchWorker  from '@/components/api/fetchWorkerProfile';
import  LHeader from '@/components/containers/local_header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import  fetchMyContracts from '@/components/api/fetchMyContracts';
import  fetchMytickets from '@/components/api/fetchMytickets';

const worker_profile = () => {

    const worker_id = "w001";
    const router = useRouter(); // ここでuseRouterを呼び出す
    const [workerInfo, setWorkerInfo] = useState(null);
    const [worker_name, setWorkerName] = useState(null); 
    const [worker_image, setWorkerImage] = useState(null); 
    const [worker_profile, setWorkerProfile] = useState(null); 
    const [selectedItem, setSelectedItem] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [contractInfo, setContractInfo] = useState(null);
    const [contractDone, setDONE] = useState(null);
    const [contractProgress, setProgress] = useState(null);
    const [mytickets, setMytickets] = useState(null);
    const [holdtickets, setHoldtickets] = useState(null);

    const handleItemClick = (index) => {
        setSelectedItem(index === selectedItem ? null : index);
    };

    useEffect(() => {
        const fetchWorkerData = async () => {
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
        fetchWorkerData(); // 関数の呼び出し
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
                        <div className="stat-value text-primary">{contractDone}</div>
                        <div className="stat-desc">21% more than last month</div>
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
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>


                <div className="grid grid-cols-3 gap-8">


                    <div className="flex justify-center items-center" onClick={() => handleItemClick(1)}>
                        <div className= {`card outline  hover:outline-primary w-60 h-30  hover:shadow-yellow-800/30  hover:text-primary transition duration-200 hover:duration-300 ${selectedItem === 1 ? 'outline-primary shadow-yellow-800/30 text-primary' : 'outline-base-300 shadow-xl text-neutral'}`}>
                            <div className="flex flex-col items-center justify-center p-4" >
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaGem />
                                </IconContext.Provider>
                                <h2 className='pt-2'>チケット利用</h2>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center" onClick={() => handleItemClick(2)}>
                        <div className='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral hover:text-primary transition duration-200 hover:duration-300'>
                            <div className="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                <FaRegCalendarCheck />
                                </IconContext.Provider>
                                <h2 className='pt-2'>予約履歴</h2>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center items-center" onClick={() => handleItemClick(3)}>
                        <div class='card outline outline-base-300 hover:outline-primary w-60 h-30 shadow-xl hover:shadow-yellow-800/30 text-neutral  hover:text-primary transition duration-200 hover:duration-300'>
                            <div class="flex flex-col items-center justify-center p-4">
                                <IconContext.Provider value={{size: '36px'}}>
                                    <FaCoins />
                                </IconContext.Provider>
                                <h2 className='pt-2'>チケット購入</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {selectedItem === 1 && (
                    <div className="card bg-base-100 shadow-xl outline outline-base-200 p-8 space-y-4">

                        <p>■どの案件に対してチケットを使いますか？</p>
                        
                        <select className="select select-secondary w-full max-w-xs">
                            <option disabled selected>Pick your POST</option>
                            <option>Java</option>
                            <option>Go</option>
                            <option>C</option>
                        </select>

                        <p>■どの枠で使用しますか？</p>
                        <DatePicker
                            className='select select-secondary'
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput
                        />
                        

                        <p>■お助け時間で質問したい内容を記載下さい。</p>
                        <textarea className="textarea textarea-secondary" placeholder="質問したい内容を記載"></textarea>

                        <button className="btn btn-outline btn-primary">チケットを消費</button>

                    </div>
                    
                )}

                {selectedItem === 2 && (
                    <div className="card bg-base-100 shadow-xl outline outline-base-200 p-8">
                        2
                    </div>
                    
                )}

                {selectedItem === 3 && (
                    <div className="card bg-base-100 shadow-xl outline outline-base-200 p-8">
                        3
                    </div>
                    
                )}
            </div>
        </>

    );
};

export default worker_profile;