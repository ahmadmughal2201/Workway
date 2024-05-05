"use client"
import React, { useState } from 'react';

const AlertTile = () => {
    return (
        <div className='flex pl-5 pr-5 p-2 w-[225px] items-center justify-between  '>
            <img
                className=" w-[12.99px] h-[12.53px]"
                alt=""
                src="./assets/icons/alert.svg"
            />
            <p className='text-xs text-gray-500'>Lorem ipsum dolor sit amet </p>

        </div>
    )
}

const AlertBar = () => {
    const [showCount, setShowCount] = useState(3);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleShowMore = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded) {
            setShowCount(3); // Reset to initial count
        } else {
            setShowCount(10); // Display more on first click
        }
    };
    return (
        <div className=' rounded-md w-[225px] mt-3 p-3  bg-white '>

            <h3 className='text-blue-600 pb-2'>Latest</h3>

            <div className={`flex flex-col max-h-[170px] pl-5 pr-5 pt-1 text-center items-center justify-center overflow-x-hidden  mt-0 ${isExpanded ? 'no-scrollbar overflow-y-auto' : ''}`}>
                {[...Array(showCount)].map((_, index) => (
                    <AlertTile key={index} />
                ))}
            </div>

            <div
                onClick={handleShowMore}
                className='flex p-2  items-center justify-between cursor-pointer '>

                <p className=" text-gray-500 text-sm ">
                    {isExpanded ? 'Show Less' : 'Show More'}
                </p>

                <img
                    className=" w-[12.99px] h-[12.53px]"
                    alt=""
                    src={!isExpanded ? "./assets/icons/downArrow.svg" : "./assets/icons/arrowUp.svg"}
                   
                />

            </div>
        </div>
    )
}

export default AlertBar