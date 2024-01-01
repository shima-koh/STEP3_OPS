import React from 'react'
import  Avatar from '@/components/atoms/avatar';
import Stars from '@/components/containers/starts';

const coInfo_card = (props) =>  {

    const {company_name, imageData} = props;

    return (
        <>
            {/**企業のInfoカード */}
            <div className="card bg-base-100 shadow-xl p-4 card-side outline outline-base-200 ">
                {/**企業のプロフィール画像表示 */}
                <figure className="px-10 ">
                    <Avatar size="M" imageData={imageData}/>
                </figure>

                {/**企業サマリ情報*/}
                <div className="card-body grid justify-items-center place-content-center w-96">
                    <h2 className="card-title">{company_name}</h2>
                    <Stars></Stars>
                </div>
            </div>
        </>
    );
};

export default coInfo_card;