'use client';
import React, { useState, useEffect } from 'react';
import  Button  from '@/components/atoms/button';

const fetchTest = async () => {
    try {
        const staticData = await fetch('http://127.0.0.1:5000/store');
        return staticData.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const Page = () => {
    const [stores, setStores] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        const data = await fetchTest();
        setStores(data);
        };

        fetchData();
    }, []); // 空の依存配列を渡すことで、マウント時に一度だけ実行されます


    return (
        <pre>{JSON.stringify(stores, null, 2)}
        <Button>xxx</Button></pre>
        
    );
};

export default Page;