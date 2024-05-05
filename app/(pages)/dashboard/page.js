"use client"
import React, { useState, useEffect } from 'react';
import HomepageProfile from '@/components/homepageProfile'
import Navbar from '@/components/navbar'
import PublishJob from '@/components/publishJob'
import AlertBar from '@/components/alertBar';
import ChatSection from '@/components/chatSection';
import JobLists from '@/components/jobLists';
import { getSession, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const [userData, setData] = useState({
    _id: '',
    name: '',
    email: '',
    bio: '',
    occupation: '',
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = session?.user?.id;
        console.log('id', id)
        const data = await getUser(session?.user?.id);

        setData({
          _id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          occupation: data.user.occupation,
          bio: data.user.bio,
          // set other attributes
        });
        console.log('in effect', data.user.name)
        console.log(userData)


      } catch (error) {
        // Handle error (e.g., show an error message to the user)
        console.error('Error fetching user:', error.message);
      }
    };

    fetchData();
  }, [session?.user?.id]);


  return (
    <>
      <Navbar className="mt-0" />

      <section className="mb-20 md:mb-0 px-4 md:px-10 bg-[#F3F2EF]  w-full h-full ">

        <div className='flex justify-between pt-8'>

          <section className='hidden md:flex md:flex-col w-[225px] ml-[90px] '>
            <HomepageProfile name={session?.user?.name} bio={userData.bio} />
            <AlertBar />
          </section>

          <section className='w-full  md:w-[543px] '>

            <PublishJob userId={session?.user?.id} />
            <div className='mt-4'>
              <JobLists loggedInID={session?.user?.id} />
            </div>
          </section>

          <section className='hidden md:flex md:flex-col w-[325px] mr-[60px] '>
            <ChatSection />
          </section>

        </div>

      </section>
    </>
  )
}
