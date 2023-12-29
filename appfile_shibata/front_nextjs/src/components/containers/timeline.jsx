import React, { useState } from 'react';

const Timeline = () => {
    const timelineData = [
        { year: '1984', event: 'First Macintosh computer', details: 'Details about the Macintosh computer.' },
        { year: '1998', event: 'iMac', details: 'Details about the iMac.' },
        { year: '2001', event: 'iPod', details: 'Details about the iPod.' },
        { year: '2007', event: 'iPhone', details: 'Details about the iPhone.' },
        { year: '2015', event: 'Apple Watch', details: 'Details about the Apple Watch.' },
    ];

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (index) => {
        setSelectedItem(index === selectedItem ? null : index);
    };

    return (
        <div className="flex">
            <ul className="timeline timeline-vertical">
                {timelineData.map((item, index) => (
                    <li key={index}>
                        <div className="timeline-start">{item.year}</div>
                        <div
                            className={`timeline-end timeline-box ${selectedItem === index ? 'selected' : ''}`}
                            onClick={() => handleItemClick(index)}
                        >
                            <p>{item.event}</p>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>

            {selectedItem !== null && (
                <div className="ml-4">
                    <h4>Details</h4>
                    <p>{timelineData[selectedItem].details}</p>
                </div>
            )}
        </div>
    );
};

export default Timeline;

