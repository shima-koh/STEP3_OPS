"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter} from 'next/navigation'
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { IconContext } from 'react-icons';
import Link from 'next/link';

const detail = (props) =>  {

    const router = useRouter();
    const {post_id, post_image, post_postdate, post_title, post_content, post_status} = props.data[0];
    const [bookmarked, setBookmarked] = useState(false)


    useEffect(() => {
        setBookmarked(Boolean(localStorage.getItem(post_id)))}, [post_id])

    const toggleBookmark = () => {
        if (bookmarked) {
            localStorage.removeItem(post_id)
        } else {
            localStorage.setItem(post_id, 'bookmarked')
        }

        setBookmarked(!bookmarked)
    }

    const statusCheck =  post_status === 102 ? "応募" : "締切"


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

                    
                    <Link href="/contract_progress/[id]" as={`/contract_progress/${post_id}`}>
                        <button type="button" className=" ml-2 btn btn-outline">
                            {statusCheck}
                        </button>
                    </Link>
                    
                </div>

            </div>
        </>
    );
};

export default detail;