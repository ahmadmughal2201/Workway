"use client"
import React, { useState, useEffect } from 'react';
import PublishModal from './publishModal';

const PublishJob = ({userId}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className='flex w-full md:w-[543px] bg-white rounded-md h-20 pl-3 pr-3 gap-2 items-center z-10'>

      <img
        className=" rounded-[50%] w-[63px] h-[63px] object-cover"
        alt=""
        src="/assets/images/dp2.jpeg"
      />


      <div
        onClick={handleOpenModal}
        className="border  rounded-2xl cursor-pointer p-4 hover:bg-gray-300 bg-[transparent] font-montserrat text-sm h-10 w-full items-center flex ">
        <p className='p-1'>Publish a Job</p>
      </div>


      {showModal && (
        <div

          className="fixed top-0 z-20 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50"
        >
          <PublishModal userID={userId} username={'Username'} isOpen={showModal} onClose={handleCloseModal} />
        </div>
      )}


    </div>
  )
}

export default PublishJob



