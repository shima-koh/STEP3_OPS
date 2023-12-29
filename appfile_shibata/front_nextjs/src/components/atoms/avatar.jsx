'use client';
import React, { useState, useEffect } from 'react';

const Avatar = (props) => {
    const { size, imageData } = props;
    const [imageSrc, setImageSrc] = useState(null);


    {/** 下記RDBから受け取ったデータを変換するコードなので一旦非表示
    useEffect(() => {
        // Propsとして渡された画像データを表示可能な形式に変換
        if (imageData) {
            const base64Image = `data:image/png;base64,${imageData}`;
            setImageSrc(base64Image);
        }
    }, [imageData]);
    */}

    let sizeClassName = '';

    switch (size) {
        case 'L':
            sizeClassName = 'w-60';
            break;
        case 'M':
            sizeClassName = 'w-32';
            break;
        case 'S':
            sizeClassName = 'w-16';
            break;
        default:
            sizeClassName = 'w-32';
            break;
    }

    return (
        <div className={`avatar ${sizeClassName}`}>
            <div className="rounded">
                {/*imageSrc && <img src={imageData} alt="User Avatar" />*/}
                <img src={imageData} alt="User Avatar" />
            </div>
        </div>
    );
};

export default Avatar;
