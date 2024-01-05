import Link from 'next/link';
import React from 'react';

const Card = (props) => {

    const {post_id, post_image, post_postdate, post_title, post_content} = props.data;

        // 今日の日付を取得
        const today = new Date();

        // date_posted を JavaScript の Date オブジェクトに変換
        const postedDate = new Date(post_postdate);
    
        // 1週間前の日付を計算
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
    
        // date_posted が1週間以内の場合に "NEW" バッジを表示
        const isNew = postedDate >= oneWeekAgo && postedDate <= today;


        const maxLength =  isNew ? 12 : 15; // 適切な文字数に調整
        const displayTitle = post_title.length > maxLength ? post_title.slice(0, maxLength) + '...' : post_title;

    return (
        <Link href="/post_detail/[id]" as={`/post_detail/${post_id}`}>
            <div className="card w-96 bg-base-100 shadow-xl m-4 hover:bg-gray-200 transition duration-300">
                <figure><img src={post_image} alt={post_title} /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                    {displayTitle}
                    {isNew && <div className="badge badge-secondary">NEW</div>}
                    </h2>
                    <p>{post_content}</p>
                    <div className="card-actions justify-end">
                    {/* 
                    <div className="badge badge-outline">Fashion</div> 
                    <div className="badge badge-outline">Products</div>
                    */}
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default Card;

