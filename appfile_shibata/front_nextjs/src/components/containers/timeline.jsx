import React, { useState } from 'react';

const Timeline = (props) => {

    const fbs = props.data;
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (index) => {
        setSelectedItem(index === selectedItem ? null : index);
    };

    return (
        <div className="flex">
            <ul className="timeline timeline-vertical w-2/5">
                {fbs && fbs.map((fb, index) => (
                    <li key={index}>
                        <div className="timeline-start">{ new Date(fb.feedback_regdate).toLocaleDateString()}</div>
                        <div
                            className={`timeline-end timeline-box hover:bg-primary hover:bg-opacity-50 ${selectedItem === index ? 'selected bg-primary bg-opacity-20' : ''}`}
                            onClick={() => handleItemClick(index)}
                        >
                            <p>{fb.post_title}</p>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>

            {selectedItem !== null && (
                <div className="ml-4">
                    <h4>実績評価</h4>
                    <p>■トータルスコア：<strong className="text-lg">{fbs[selectedItem].totalscore}</strong></p>
                    <p>■テクノロジー領域のスキルへの評価：<strong className="text-lg">{fbs[selectedItem].TechScore}</strong></p>
                    <p>■デザイン領域のスキルへの評価：<strong className="text-lg">{fbs[selectedItem].DesignScore}</strong></p>
                    <p>■ビジネス領域のスキルへの評価：<strong className="text-lg">{fbs[selectedItem].BizScore}</strong></p>
                    <p>■コメント：{fbs[selectedItem].feedback_content}</p>
                </div>
            )}
        </div>
    );
};

export default Timeline;

