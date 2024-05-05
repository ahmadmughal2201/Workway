'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import SpecificJobs from '@/components/specificJobs';
import ResumeForm from '@/components/resumeForm';
import ResumeModal from '@/components/resume';
import Navbar from '@/components/navbar';
import { getSession, useSession } from 'next-auth/react';


const getUser = async (id) => {
  
  try {
    const res = await fetch(`http://localhost:3000/api/userExists?userId=${id}`, {
      cache: 'no-store',
    });
    console.log('in getuser',id)



    if (!res.ok) {
      throw new Error("failed to fetch user");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the component
  }
};

const Profile = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasExistingResume, setHasExistingResume] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [userData, setData] = useState({
    _id: '',
    name: '',
    email: '',
    bio: '',
    occupation: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('in effect', session?.user?.id)
        const id=session?.user?.id;
        const data = await getUser(id);

        setData({
          _id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          occupation: data.user.occupation,
          bio: data.user.bio,
        }); 


      } catch (error) {
        // Handle error (e.g., show an error message to the user)
        console.error('Error fetching user:', error.message);
      }
    };

    fetchData();
    console.log(userData) 

  }, [session?.user?.id]);


  const handleResumeCallback = (hasExisting) => {
    setHasExistingResume(hasExisting);
  };

  const openModal = () => {
    console.log("Opening Modal");
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const openResumeModal = () => {
    setIsResumeModalOpen(true);
  };

  const closeResumeModal = () => {
    setIsResumeModalOpen(false);
  };

  return (
    <section>
      <Navbar />
      <div className=' flex justify-center h-full w-screen bg-[#F3F2EF]  gap-4 py-20 '>
        <section>
          <div className='w-[783px] h-auto bg-white rounded-md'>
            <div>
              <img
                className=" rounded-t-md w-full h-[200px] object-cover"
                alt=""
                src="/assets/images/cover.png"
              />
            </div>

            <div className="relative -top-24 left-[3%] transform: -translateX-1/2">
              <img
                className="rounded-[50%] border-[3px] border-white w-[130px] h-[130px] object-cover"
                alt=""
                src="/assets/images/dp2.jpeg"
              />
            </div>

            <div className='py-4'>
              <div className='flex flex-col pl-5 pr-5  items-start justify-center mt-0  '>
                <p className='font-medium text-2xl text-black'>{userData.name}</p>
                <p className='text-sm text-gray-500 pt-1'>{userData.occupation}</p>
                <p className='text-sm text-gray-500 pt-1'>{userData.bio}</p>
              </div>

              <div className='flex gap-[2px]'>

                <button
                  onClick={openModal}

                  className='w-full mt-2 h-10 inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  {hasExistingResume ? 'Edit Resume' : 'Create Resume'}

                </button>

                {isModalOpen && (
                  <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                    <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
                      <div className="absolute inset-0 bg-black opacity-75"></div>
                    </div>
                    <div className="z-10 rounded-lg shadow-md max-w-md mx-auto">

                      <ResumeForm userID={session?.user?.id} onClose={closeModal} onResumeCallback={handleResumeCallback} />

                    </div>
                  </div>
                )}

                {/* ____________________Resume Moda_____________________- */}
                <button
                  onClick={openResumeModal}
                  className='w-full mt-2 h-10 inline-flex justify-center rounded-full border border-gray-500 shadow-sm px-4 py-2 bg-white text-base font-medium  text-gray-500 hover:border-2 hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  My Resume
                </button>

                {isResumeModalOpen && (
                  <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                    <div className="fixed inset-0 transition-opacity" onClick={closeResumeModal}>
                      <div className="absolute inset-0 bg-black opacity-75"></div>
                    </div>
                    <div className="z-10 rounded-lg shadow-md max-w-md mx-auto">
                      {/* Render your Resume component here */}
                      <ResumeModal userID={session?.user?.id} onClose={closeResumeModal} />

                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
          {/* ______________Posts__________________ */}
          <div className='w-[783px] mt-4 bg-white rounded-md'>
            <h3 className='px-4 pt-4 font-medium'>Published Jobs</h3>
            <div className='mt-1 px-3'>
              <SpecificJobs isHire={true} userID={userData._id} />
            </div>
          </div>
        </section>

        <section className='w-[290px]'>

          <div className=' flex flex-col items-start pb-4 justify-start bg-white rounded-md w-[290px]'>

            <h3 className='p-4 text-gray-500 border-b  w-full'>Your Dashboard</h3>

            <div className=' '>
              <div className=' px-3 text-center items-center justify-between '>
                <p className='text-[52px] font-[900] text-blue-500'>50 </p>
                <p className=' text-gray-500'>Recuritments</p>
              </div>
              <div className=' px-3 text-center items-center justify-between '>
                <p className='text-[52px] font-[900] text-blue-500'>5 </p>
                <p className=' text-gray-500'>Job Applications</p>
              </div>
              <div className=' px-3 text-center items-center justify-between '>
                <p className='text-[52px] font-[900] text-blue-500'>25 </p>
                <p className=' text-gray-500'>Profile Views</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </section>

  )
}

export default Profile