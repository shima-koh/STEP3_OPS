import React from 'react'
import  Avatar from '@/components/atoms/avatar';
import Stars from '@/components/containers/starts';

const coInfo_card = (props) =>  {

      // props.dataが存在するか確認
    if (!props.data) {
        // データがまだ取得されていない場合、ローディングまたはエラーメッセージを表示
        return <p>Loading...</p>;  // またはエラーメッセージを表示
    }

    // データが存在する場合はデータを取り出す
    const { company_name, company_image, company_industry } = props.data;

    return (
        <>
            {/**企業のInfoカード */}
            <div className="card bg-base-100 shadow-xl card-side outline outline-base-200 ">
                {/**企業のプロフィール画像表示 */}
                <figure>
                    <Avatar size="M" imageData={company_image}/>
                </figure>

                {/**企業サマリ情報*/}
                <div className="card-body grid justify-items-center place-content-center w-96">
                    <h2 className="card-title">{company_name}</h2>
                    <p className="text-sm opacity-50">業界：{company_industry}</p>
                    <p className="text-sm">評価：<Stars></Stars></p>
                </div>
            </div>
        </>
    );
};

export default coInfo_card;