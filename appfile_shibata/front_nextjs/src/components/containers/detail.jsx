import React from 'react'

const detail = (props) =>  {

    const data = props.data;

    return (
        <>
                {/**Post情報*/}
                <div className= " grid justify-items-center py-8 w-full">
                    <h1 className="card-title">{data.title}</h1>
                </div>

                <div className='card-body grid space-y-4 px-16 py-8'>
                    <p><strong>■案件概要</strong><br/>{data.summary}</p>
                    <p><strong>■必要スキル</strong><br/>{data.requiredSkill}</p>
                </div>
        </>
    );
};

export default detail;