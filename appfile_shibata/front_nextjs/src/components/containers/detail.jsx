import React from 'react'

const detail = (props) =>  {

    const{
        post_category, 
        post_company, 
        post_content, 
        post_contractdate,  
        post_contractworker, 
        post_duedate, 
        post_id, 
        post_lastedit, 
        post_postdate, 
        post_recruitmentnum, 
        post_requireskill, 
        post_status, 
        post_title} = props.data[0];

        const formattedLastEditDate = new Date(post_lastedit).toLocaleDateString();
        const formattedDueDate = new Date(post_duedate).toLocaleDateString();
    return (
        <>
                {/**Post情報*/}
                <div className= " grid justify-items-center py-4 w-full">
                    <h1 className="card-title">案件：　{post_title}</h1>
                </div>

                <div className= " grid justify-items-end py-4 px-4 w-full">
                    <p className="card-body ">最終更新日：{formattedLastEditDate}</p>
                </div>

                <div className='card-body grid space-y-4 px-16 py-8'>
                    <p><strong>■案件概要</strong><br/>{post_content}</p>
                    <p><strong>■必要スキル</strong><br/>{post_requireskill}</p>
                    <p><strong>■応募締め切り</strong><br/>{formattedDueDate}</p>
                </div>
        </>
    );
};

export default detail;