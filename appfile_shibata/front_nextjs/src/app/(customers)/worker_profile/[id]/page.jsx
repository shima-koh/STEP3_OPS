"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link';
import Avatar from '@/components/atoms/avatar';
import Timeline from '@/components/containers/timeline';
import  LHeader from '@/components/containers/local_header';
import  fetchWorker  from '@/components/api/fetchWorkerProfile';
import  fetchfbs  from '@/components/api/fetchFBs';
import  fetchWorkerSkill  from '@/components/api/fetchWorkerSkill';

import {
    Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const worker_profile = () => {

    const router = useRouter(); // ここでuseRouterを呼び出す
    const worker_id  = useParams().id;
    const [workerInfo, setWorkerInfo] = useState(null);
    const [worker_name, setWorkerName] = useState(null); 
    const [worker_image, setWorkerImage] = useState(null); 
    const [worker_profile, setWorkerProfile] = useState(null); 
    const [worker_fbs, setWorkerfbs] = useState(null); 
    const [worker_skill, setWorkerskill] = useState(null); 
    const [averageData, setAverageData] = useState(null);

    useEffect(() => {
        const fetchWorkerData = async () => {
            try {
                // データの取得
                const data = await fetchWorker(worker_id);
                setWorkerInfo(data); // 取得したデータをstateに設定
                const datafbs = await fetchfbs(worker_id);
                setWorkerfbs(datafbs); // 取得したデータをstateに設定
                const dataskill = await fetchWorkerSkill(worker_id);
                setWorkerskill(dataskill); // 取得したデータをstateに設定
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

   // データが取得されたら平均を計算
    useEffect(() => {
        if (worker_fbs && worker_fbs.length > 0) {
        // 各カラムの合計を初期化
        let totalBiz = 0;
        let totalDesign = 0;
        let totalTech = 0;

        // 各データのカラムを足し合わせる
        worker_fbs.forEach((row) => {
            totalBiz += row.BizScore;
            totalDesign += row.DesignScore;
            totalTech += row.TechScore;
        });

        // データ数で割って平均を求める
        const numData = worker_fbs.length;
        const averageBiz = totalBiz / numData;
        const averageDesign = totalDesign / numData;
        const averageTech = totalTech / numData;

        // 平均値をステートにセット
        setAverageData([
            { subject: 'テックスキル', A: averageTech, fullMark: 100 },
            { subject: 'ビジネススキル', A: averageBiz, fullMark: 100 },
            { subject: 'デザインスキル', A: averageDesign, fullMark: 100 },
        ]);
        }
    }, [worker_fbs]);


    return (
        <>
            <LHeader />

            <div className='flex w-full'>

                {/**ワーカーのプロフィール */}
                <div className="card w-96 bg-base-100 outline outline-base-200 shadow-xl p-4">
                    {/**ワーカーのプロフィール画像表示 */}
                    <figure className="px-10 pt-10">
                        <Avatar size="L" imageData={worker_image}/>
                    </figure>

                    {/**ワーカーのプロフィールテキスト */}
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{worker_name}</h2>
                        <p>{worker_profile}</p>
                    </div>
                </div>

                <div className='w-full pl-8'>

                    {/*ダミーコンテンツ */}
                    <div className='card bg-base-100 shadow-xl outline outline-base-200 flex p-4 w-full'>

                        <div className='flex justify-start mt-8 ml-4'>
                            <h4><strong>■スキルセット</strong></h4>
                        </div>

                        <div className='flex'>

                            <RadarChart  // レーダーチャート全体の設定を記述
                                width={600}  // レーダーチャートが記載される幅(この幅よりチャートが大きい場合、はみ出た箇所は表示されない)
                                height={300}   // レーダーチャートが記載される高さ
                                cx={250}  // 描画枠の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる。width全体が500だから250だと中心になる)
                                cy={180}  // 描画枠の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる。hight全体が500だから250だと中心になる)
                                outerRadius={100}  // レーダーチャート全体の大きさ  
                                data={averageData}  // 表示対象のデータ
                            >
                                {/* レーダーチャートの蜘蛛の巣のような線 */}
                                <PolarGrid />

                                {/* 軸を決める項目(サンプルでいう数学や歴史) */}
                                <PolarAngleAxis dataKey="subject" />
                                
                                {/* レーダーを表示 */}
                                <Radar 
                                    name="Aさん"  // そのチャートが誰のデータか指定(チャート下にここで指定した値が表示される)
                                    dataKey="A"   // 表示する値と対応するdata内のキー
                                    stroke="orange"  // レーダーの外枠の色
                                    fill="orange"  // レーダー内の色
                                    fillOpacity={0.6}  // レーダー内の色の濃さ(1にすると濃さMAX)
                                />
                            </RadarChart>

                            <div className='join join-vertical flex p-4 items-center'>
                                
                                    {worker_skill && worker_skill.map((skill, index) => (
                                        <div className='p-1 join grid'>
                                        <p><strong className='w-64'>{skill.skill_name}</strong></p>
                                        <progress value={skill.skill_level*20} max="100" className="progress progress-secondary w-56"></progress>
                                        </div>
                                    ))}
                            </div>
                        
                        </div>

                    </div>

                    {/*実績タイムライン */}
                    <div className="card bg-base-100 shadow-xl outline outline-base-200 mt-4 pt-10 p-8">
                        <h4><strong>■実績タイムライン</strong></h4>
                        <Timeline data={worker_fbs}></Timeline>
                    </div>

                </div>

            </div>
        </>

    );
};

export default worker_profile;