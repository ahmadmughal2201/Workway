'use client'
import React, { useState, useEffect } from 'react';
import ResumeModal from './resume';
const Applicant = ({ username, jobId, imageurl, applicantID }) => {
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    const handleHire = async () => {

        // Make an API call to update the jobListing with applicantId
        console.log("jobId: ", jobId, 'hiredID: ', applicantID)
        try {
            const updateJob = await fetch(`/api/job`, {
                method: 'PUT',
                body: JSON.stringify({
                    _id: jobId,
                    hiredID: applicantID,
                }),
            });

            if (!updateJob.ok) {
                throw new Error('Error updating hired ID');
            }

            console.log('hired ID updated successfully');
            alert('Applicant hired!')
        } catch (updateJoberror) {
            console.error('Error updating hired ID:', updateJoberror.message);
        }

    };
    const openResumeModal = () => {
        setIsResumeModalOpen(true);
    };

    const closeResumeModal = () => {
        setIsResumeModalOpen(false);
    };

    return (
        <div className='flex items-center border-[1px] p-2  rounded-md justify-between w-full'>
            <div
                onClick={openResumeModal}
                className=" flex  p-2 items-center gap-3 cursor-pointer ">
                <img
                    className=" rounded-[50%] w-[40px] h-[40px] object-cover"
                    alt=""
                    src={imageurl}
                />
                <div className=''>
                    <p className="font-bold">{username}</p>
                    <p className=" text-xs ">View Resume</p>

                </div>
            </div>

            {/* ____________________Resume Moda_____________________- */}
            <button
            onClick={handleHire}
                className='w-full p-2 h-8 inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-blue-600 text-base font-medium  text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm'
            >
                Hire
            </button>

            {isResumeModalOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                    <div className="fixed inset-0 transition-opacity" onClick={closeResumeModal}>
                        <div className="absolute inset-0 bg-black opacity-75"></div>
                    </div>
                    <div className="z-10 rounded-lg shadow-md max-w-md mx-auto">
                        {/* Render your Resume component here */}
                        <ResumeModal userID={applicantID} onClose={closeResumeModal} />

                    </div>
                </div>
            )}        </div>
    )
}

export default Applicant