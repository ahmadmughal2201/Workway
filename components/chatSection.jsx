import React from 'react'
import ChatTile from './chatTile';

const messages = [
    {
        username: "JohnDoe",
        message: "Hey, can you verify this?",
        isRead: true,
        imagePath: "./assets/images/dp2.png"
    },
    {
        username: "JaneDoe",
        message: "Sure, I can help with that.",
        isRead: false,
        imagePath: "./assets/images/dp.png"
    },
    {
        username: "AlexSmith",
        message: "I'll check it out and let you know.",
        isRead: true,
        imagePath: "./assets/images/dp2.png"
    },
    {
        username: "EmmaJohnson",
        message: "Thanks for your assistance!",
        isRead: false,
        imagePath: "./assets/images/dp.png"
    }
];


const ChatSection = () => {
    return (
        <div className='w-[325px] bg-white p-4 rounded-md'>
            <div className='flex justify-start text-black font-medium'>
                Discussions
            </div>
            {messages.map((item, index) => (
                <ChatTile
                    key={index}
                    username={item.username}
                    message={item.message}
                    isRead={item.isRead}
                    imagePath={item.imagePath}
                />))}

            <div className='mt-8 flex items-center text-gray-500 text-sm gap-2 cursor-pointer'>
                <p className=" text-gray-500 text-md hover:text-blue-500">
                    See all Discussions
                </p>

                <img
                    className=" w-[16.99px] h-[16.53px]hover:fill-blue-500"
                    alt=""
                    src="./assets/icons/gotoArrow.svg"

                />
            </div>

        </div>
    )
}

export default ChatSection