"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter} from 'next/navigation'
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { IconContext } from 'react-icons';
import Link from 'next/link';

const detail = (props) =>  {

    const router = useRouter();
    const data = props.data;

    const [bookmarked, setBookmarked] = useState(false)

    useEffect(() => {
        setBookmarked(Boolean(localStorage.getItem(data.postId)))}, [data.postId])

    const toggleBookmark = () => {
        if (bookmarked) {
            localStorage.removeItem(data.postId)
        } else {
            localStorage.setItem(data.postId, 'bookmarked')
        }

        setBookmarked(!bookmarked)
    }

    return (
        <>
            <div className='card-body grid'>

                <div className='flex justify-self-end'>

                    <button type="bookmark" className="btn btn-ghost btn-circle" onClick={toggleBookmark}>
                        {bookmarked ? 
                            <IconContext.Provider value={{size: '24px', color: 'primary'}}>
                                <FaBookmark />
                            </IconContext.Provider> : 
                            <IconContext.Provider value={{size: '24px', color: 'primary'}}>
                                <FaRegBookmark />
                            </IconContext.Provider>}
                    </button>

                    
                    <Link href="/contract_progress/[id]" as={`/contract_progress/${data.postId}`}>
                        <button type="button" className=" ml-2 btn btn-outline">
                            {data.status}
                        </button>
                    </Link>
                    
                </div>

            </div>
        </>
    );
};

export default detail;