"use client"
import React, { useState } from 'react';
import  Header  from '@/components/containers/header';


export default function RootLayout({ children }) {

    const [userStatus, setUserStatus] = useState({
    isSignedIn: true,
    userId: 1234,
    // 他のユーザー情報があれば適宜追加
    });

    return (
        <>
            <Header userStatus={userStatus} />
            <div className="md:container md:mx-auto flex flex-col items-center h-[85vh]">
                {children}
            </div>
        </>
    
    )
}
