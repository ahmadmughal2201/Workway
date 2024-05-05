"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TagComponent from './tag';


const PublishJobCard = ({ userID, jobID, isHire, username, text, title, date, imageurl, tags, classes }) => {
    const [showMore, setShowMore] = useState(false);
    const maxLength = 150;

    const router = useRouter();

    const goToProfile = () => {
        // Use the router to navigate to the profile page
        router.push(`/profile/${userID}`);
    };

    const goToApplicants = () => {
        if (isHire) {
            // If isHire is true, navigate to the job applicants page
            router.push(`/application/${jobID}`);
        } else {
            // Otherwise, perform the action for applying
            // For now, it just logs a message to the console
            console.log('Apply button clicked');
        }
    };

    const handleApply = async () => {
        try {
            const response = await fetch('/api/application', {
                method: 'POST',
                body: JSON.stringify({
                    jobID: jobID,
                    applicantID: userID, // Assuming userID is the applicant's ID
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Application submitted successfully');
            } else {
                console.error('Error submitting application:', data.message);
            }
        } catch (error) {
            console.error('Error submitting application:', error.message);
        }

        alert('applied')

    };

    const handleSeeMore = () => {
        setShowMore(!showMore);
    };
    return (
        <div className={`w-full rounded-md mb-4 bg-white p-4 ${classes}`}>

            <div className='flex items-center justify-between cursor-pointer' onClick={goToProfile}>

                <div className=" flex items-center gap-3 ">
                    <img
                        className=" rounded-[50%] w-[63px] h-[63px] object-cover"
                        alt=""
                        src={imageurl}
                    />
                    <div className=''>
                        <p className="font-bold">{username}</p>
                        <p className="text text-xs text-gray-500">Valid till: {date} </p>
                    </div>
                </div>

                <img
                    className=" w-[19.99px] h-[19.53px]"
                    alt=""
                    src="/assets/icons/dots.svg"
                />

            </div>

            <h2 className='font-bold pt-4'>{title}</h2>

            <div className=''>
                <p className='text-gray-500 text-sm pt-2'>
                    {text && (
                        <>
                            {showMore ? (
                                <>
                                    {text}
                                    <button onClick={handleSeeMore} className="text-blue-500"> See less</button>
                                </>
                            ) : (
                                <>
                                    {text.length > maxLength ? text.slice(0, maxLength) + '...' : text}
                                    {text.length > maxLength && <button onClick={handleSeeMore} className="text-blue-500"> See more</button>}
                                </>
                            )}
                        </>
                    )}
                </p>
            </div>

            {/* tags_____________ */}
            <div className='flex pt-5 gap-2  justify-center'>

                {tags.map((tag, index) => (
                    <TagComponent key={index} tag={tag} classes={'flex flex-col bg-gray-300 text-sm font-normal rounded-3xl md:px-5 px-2 h-6 md:h-10 justify-center items-center font-semibold'} />
                ))}
            </div>
            <div className='h-[0.1px] w-full bg-gray-200 mt-10' />
            <div className='flex justify-center'>
                {isHire ? (
                    <button className='text-center justify-center px-4 py-2 text-white rounded-md w-full bg-blue-600 hover:bg-blue-700 font-bold' onClick={goToApplicants}>
                        View Applicants
                    </button>
                ) : (
                    <button onClick={handleApply} className='text-center justify-center px-4 py-2 text-white rounded-md w-full bg-blue-600 hover:bg-blue-700 font-bold ' >
                        Apply
                    </button>
                )}

            </div>

        </div>

    )
}

export default PublishJobCard