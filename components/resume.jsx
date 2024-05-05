'use client'
import React, { useState, useEffect } from 'react';

const ResumeModal = ({ userID , onClose}) => {

  const [resumeData, setResumeData] = useState({
    userID: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    purpose: '',
    experience: '',
    project: '',
    achievement: '',
  });

  const fetchResumeData = async () => {
    try {
      const response = await fetch(`/api/resume?userId=${userID}`);
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        // If resume exists, set the resume data
        setResumeData(prevData => ({
          ...prevData,
          name: data.existingResume.name  || '',
          address: data.existingResume.address || '',
          email: data.existingResume.email || '',
          phone: data.existingResume.phone || '',
          purpose: data.existingResume.purpose || '',
          experience: data.existingResume.experience || '',
          project: data.existingResume.project || '',
          achievement: data.existingResume.achievement || '',
        }));


      }
    } catch (error) {
      console.error('Error fetching resume data:', error.message);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchResumeData();
    }
  }, [userID]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className='flex justify-between'>
       
        <div>
          <div className="text-2xl font-bold mb-4">{resumeData.name}</div>
          <div className="text-gray-600 mb-2">{resumeData.address}</div>
          <div className="text-gray-600 mb-2">{resumeData.email}</div>
          <div className="text-gray-600 mb-4">{resumeData.phone}</div>
        </div>
        <img onClick={onClose}
          className="p-[2px] rounded-full w-[20px] h-[20px] hover:bg-gray-200 cursor-pointer"
          alt=""
          src="/assets/icons/close.svg"
        />
      </div>

      <hr className="my-4" />

      <div className="mb-4">
        <div className="text-xl font-bold mb-2">Purpose</div>
        <p>{resumeData.purpose}</p>
      </div>

      <div className="mb-4">
        <div className="text-xl font-bold mb-2">Experience</div>
        <p>{resumeData.experience}</p>
      </div>

      <div className="mb-4">
        <div className="text-xl font-bold mb-2">Project</div>
        <p>{resumeData.project}</p>
      </div>

      <div className="mb-4">
        <div className="text-xl font-bold mb-2">Achievement</div>
        <p>{resumeData.achievement}</p>
      </div>
    </div>
  );
};

export default ResumeModal;
