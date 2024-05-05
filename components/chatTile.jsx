import React from 'react'

const ChatTile = ({ username, message, imagePath, isRead, onClick }) => {
    return (
        <div className={`w-full flex bg-white gap-3 border-b pt-3 ${isRead ? 'font-bold' : ''}`} onClick={onClick}>
            <img
                className="rounded-[50%] w-[53px] h-[53px] object-cover"
                alt=""
                src={imagePath}
            />

            <div className=''>
                <p className="">{username}</p>
                <p className="text text-xs text-gray-500">{message}</p>
            </div>
        </div>
    );
};
export default ChatTile