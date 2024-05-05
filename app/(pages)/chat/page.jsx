"use client"
import React, { useState, useEffect } from 'react';
import ChatTile from '@/components/chatTile';


const ChatSide = ({ chats }) => {
    const [selectedChat, setSelectedChat] = useState(0);
    const selectedChatData = chats[selectedChat];

    return (

        <div className='flex h-screen bg-[#F3F2EF] pl-40 pr-40 pb- pt-16 '>
            <div className='w-[325px] bg-white p-4'>
                <div className='flex justify-start'>Discussions</div>
                {chats.map((chat, index) => (
                    <ChatTile
                        key={index}
                        username={chat.username}
                        message={chat.message}
                        imagePath={chat.imagePath}
                        isRead={selectedChat === index}
                        onClick={() => setSelectedChat(index)}
                    />
                ))}
            </div>

            <div className='flex-1  bg-gray-200 p-4 '>
                <div className="flex flex-col justify-between h-full">

                    <div>
                        <div className='text-xl font-bold'>{selectedChatData.username}</div>
                        <div className='text-gray-500'>{selectedChatData.message}</div>
                    </div>

                    <div className="mt-4">
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md w-full p-2"
                            placeholder="Type your message here"
                        />
                    </div>
                </div>

            </div>
        </div>

    );
};

// Sample data for chat
const chats = [
    {
        username: 'John Doe',
        message: 'Hey, how are you?',
        imagePath: './assets/images/dp.png',
    },
    {
        username: 'Jane Doe',
        message: 'I am good, thanks for asking!',
        imagePath: './assets/images/dp2.png',
    },
    // Add more sample chat data here
];

const ChatPage = () => {
    return <ChatSide className='bg-[#F3F2EF] h-full'
        chats={chats} />;
}

export default ChatPage
