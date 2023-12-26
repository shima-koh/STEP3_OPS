"use client";
import React, { useState, useRef, useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Link from 'next/link';

import  Card  from '@/components/containers/card';


const search = () => {

    const handleSubmit = (event) => {
    
        event.preventDefault();
        if (!userInput.trim()) return;
    
        setUserInput('');
    }
    
    const [userInput, setUserInput] = useState('');

    return (

        <>
            <h1>案件詳細</h1>

            <div className="flex p-4 flex-col gap-4 w-full">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            </div>

        </>

    );
};

export default search;