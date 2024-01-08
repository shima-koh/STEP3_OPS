"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter} from 'next/navigation'
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { IconContext } from 'react-icons';
import  InsertOrder from '@/components/api/InsertOrder';
import Link from 'next/link';

const detail = (props) =>  {

    const router = useRouter();
    const post_status =  props.post_status;
    const post_id = props.post_id;

    console.log(props);

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

    const handleSubmit = async(event) => {    
        event.preventDefault();
        
        if(post_status === 999){
            await InsertOrder(post_id);
        }
        router.push(`/contract_progress/${post_id}`);
    }


    let statusCheck;
    let design;
    if (post_status === 999) {
        statusCheck = "応募する";
        design = "ml-2 btn btn-outline";
    } else if (post_status >= 102 && post_status <= 204) {
        statusCheck = "応募済";
        design = "ml-2 btn btn-outline btn-active btn-primary";
    } else if (post_status === 301) {
        statusCheck = "終了";
        design = "ml-2 btn btn-outline btn-active btn-primary";
    } else if (post_status >= 302 && post_status <= 306) {
        statusCheck = "キャンセル";
        design = "ml-2 btn btn-outline  btn-error";
    } else if (post_status === 307){
        statusCheck = "締切済";
        design = "ml-2 btn btn-outline btn-active btn-primary";
    }else{
        statusCheck = "エラー"
        design = "ml-2 btn btn-outline  btn-error";
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

                    <form onSubmit={handleSubmit}>
                        <button type="submit" className={design}>
                            {statusCheck}
                        </button>
                    </form>
                    
                </div>

            </div>
        </>
    );
};

export default detail;