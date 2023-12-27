"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import  Card  from '@/components/containers/card';


const contract_progress = () => {

   // const [userInput, setUserInput] = useState('');

    return (
        <>
            <h1>案件進捗</h1>

            {/*案件進捗ボタン*/}
            <form className="p-4 bg-white w-[50vw]">
                    
                    <div className="items-right">

                    <button type="submit" className="ml-2 btn btn-outline">
                        契約
                    </button>
                    
                    </div>
                    
            </form>

            <ul className="steps steps-vertical lg:steps-horizontal">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Choose plan</li>
            <li className="step">Purchase</li>
            <li className="step">Receive Product</li>
            </ul> 
        </>

    );
};

export default contract_progress;