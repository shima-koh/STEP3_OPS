"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import  WorkerInfo_Card from '@/components/containers/workerInfo_card';
import { IconContext } from 'react-icons'
import { FaGear, FaHeart, FaFileLines, FaEnvelope, FaLightbulb, FaGem } from "react-icons/fa6";


const mycontract_list = () => {

    const worker_name = "Claire";
    const worker_id = 3;
    const introduction = "hello hello profile hello hello profile hello hello profile hello hello profile hello hello profile";

    const router = useRouter(); // ここでuseRouterを呼び出す

    const imageData = "https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG5-6MFLx6IfxonfMofFua39122ucsGpRMMXHaqnPy2bQr8VRbaGZTNm4k2gmmuKdngzMsaM1n75u42jVhB6pPg1iKkjDn5wB5NpbpoxJzlWq2uwcw3nHNQweb5BymPKA5DJuZPPLPDfPJQ0w0VSR92nzE-G845rxiiRDSH0WQWwmzkPH3AmGnC4IMn8JbmSV6YPUqKPkXMCcnkTthRrZHZeDZNRaifXhNCs_BugWVA5o/Avatar.jpg?errorImage=false";

    return (
        <>
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
                        {/* row 1 */}
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">アプリ開発案件のタイトルが入る</div>
                                        </div>
                                    </div>
                                </td>
                                <td>Zemlak, Daniel and Leannon</td>
                                <td>
                                    <div className="btn btn-accent btn-m ">応募中</div>
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                                </th>
                                <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/tailwind-css-component-profile-3@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">Brice Swyre</div>
                                    <div className="text-sm opacity-50">China</div>
                                    </div>
                                </div>
                                </td>
                                <td>
                                Carroll Group
                                <br/>
                                <span className="badge badge-ghost badge-sm">Tax Accountant</span>
                                </td>
                                <td>Red</td>
                                <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                                </th>
                                <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/tailwind-css-component-profile-4@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">Marjy Ferencz</div>
                                    <div className="text-sm opacity-50">Russia</div>
                                    </div>
                                </div>
                                </td>
                                <td>
                                Rowe-Schoen
                                <br/>
                                <span className="badge badge-ghost badge-sm">Office Assistant I</span>
                                </td>
                                <td>Crimson</td>
                                <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                            {/* row 4 */}
                            <tr>
                                <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                                </th>
                                <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">Yancy Tear</div>
                                    <div className="text-sm opacity-50">Brazil</div>
                                    </div>
                                </div>
                                </td>
                                <td>
                                Wyman-Ledner
                                <br/>
                                <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
                                </td>
                                <td>Indigo</td>
                                <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                            </tbody>
                            {/* foot */}
                            <tfoot>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>       
        </>

    );
};

export default mycontract_list;