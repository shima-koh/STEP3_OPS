"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Avatar from '@/components/atoms/avatar';
import Timeline from '@/components/containers/timeline';
import {
    Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';


const worker_profile = () => {

    const worker_name = "Claire";
    const introduction = "hello hello profile hello hello profile hello hello profile hello hello profile hello hello profile";

    // 表示するデータを配列として定義
const data = [
    {subject: 'テックスキル', A: 76, fullMark: 100},
    {subject: 'ビジネススキル', A: 100, fullMark: 100},
    {subject: 'デザインスキル', A: 65, fullMark: 100},
];

    const router = useRouter(); // ここでuseRouterを呼び出す

    const handleSubmit = (event) => {

        event.preventDefault(); //Submitによるリロードを防ぐ
        // フォームが送信されたときの処理
        // ...
    
        // ページ遷移
    router.push('/contract_progress');
    }

    const [userInput, setUserInput] = useState('');

    const imageData = "https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG5-6MFLx6IfxonfMofFua39122ucsGpRMMXHaqnPy2bQr8VRbaGZTNm4k2gmmuKdngzMsaM1n75u42jVhB6pPg1iKkjDn5wB5NpbpoxJzlWq2uwcw3nHNQweb5BymPKA5DJuZPPLPDfPJQ0w0VSR92nzE-G845rxiiRDSH0WQWwmzkPH3AmGnC4IMn8JbmSV6YPUqKPkXMCcnkTthRrZHZeDZNRaifXhNCs_BugWVA5o/Avatar.jpg?errorImage=false";

    return (
        <>
            <h1>Profile</h1>

            <div className='flex w-full'>

                {/**ワーカーのプロフィール */}
                <div className="card w-96 bg-base-100 shadow-xl p-4">
                    {/**ワーカーのプロフィール画像表示 */}
                    <figure className="px-10 pt-10">
                        <Avatar size="L" imageData={imageData}/>
                    </figure>

                    {/**ワーカーのプロフィールテキスト */}
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{worker_name}</h2>
                        <p>{introduction}</p>
                    </div>
                </div>

                <div className='w-full pl-8'>

                    {/*ダミーコンテンツ */}
                    <div className='card bg-base-100 shadow-xl flex p-4 w-full'>

                        <div className='flex justify-start'>
                            <h4>Skill set</h4>
                        </div>

                        <div className='flex'>

                            <RadarChart  // レーダーチャート全体の設定を記述
                                width={500}  // レーダーチャートが記載される幅(この幅よりチャートが大きい場合、はみ出た箇所は表示されない)
                                height={400}   // レーダーチャートが記載される高さ
                                cx={250}  // 描画枠の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる。width全体が500だから250だと中心になる)
                                cy={200}  // 描画枠の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる。hight全体が500だから250だと中心になる)
                                outerRadius={100}  // レーダーチャート全体の大きさ  
                                data={data}  // 表示対象のデータ
                            >
                                {/* レーダーチャートの蜘蛛の巣のような線 */}
                                <PolarGrid />

                                {/* 軸を決める項目(サンプルでいう数学や歴史) */}
                                <PolarAngleAxis dataKey="subject" />
                                
                                {/* 目安となる数値が表示される線を指定  
                                <PolarRadiusAxis 
                                    angle={90}  // 中心点から水平を0°とした時の角度 垂直にしたいなら90を指定
                                    domain={[0, 100]}  // リストの１番目の要素が最小値、2番目の要素が最大値
                                />  */}
                                
                                {/* レーダーを表示 */}
                                <Radar 
                                    name="Aさん"  // そのチャートが誰のデータか指定(チャート下にここで指定した値が表示される)
                                    dataKey="A"   // 表示する値と対応するdata内のキー
                                    stroke="#8884d8"  // レーダーの外枠の色
                                    fill="#8884d8"  // レーダー内の色
                                    fillOpacity={0.6}  // レーダー内の色の濃さ(1にすると濃さMAX)
                                />

                                {/* グラフの下のAさんBさんの表記 
                                <Legend />
                                */}

                            </RadarChart>

                            <div className='join join-vertical flex p-4 items-center'>
                                <div className='p-1 join items-center'>
                                    <p><strong>HTML</strong></p>
                                    <progress className="progress w-56" value={0} max="100"></progress>
                                </div>
                                <div className='p-1 join items-center'>
                                    <p><strong>HTML</strong></p>
                                    <progress className="progress w-56" value={30} max="100"></progress>
                                </div>
                                <div className='p-1 join items-center'>
                                    <p><strong>HTML</strong></p>
                                    <progress className="progress w-56" value={80} max="100"></progress>
                                </div>
                            </div>
                        
                        </div>

                    </div>

                    {/*実績タイムライン */}
                    <div className="card bg-base-100 shadow-xl p-4 mt-4">
                        <h4>History</h4>
                        <Timeline></Timeline>
                    </div>

                </div>

            </div>
        </>

    );
};

export default worker_profile;