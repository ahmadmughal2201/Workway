'use client'
import React from 'react'
import { useSession } from 'next-auth/react';
import SpecificJobs from '@/components/specificJobs';
import Navbar from '@/components/navbar';


export default function Applications() {
    const { data: session } = useSession();

    return (
        <section>
            <Navbar />
            <div className='flex bg-[#F3F2EF] py-14  flex-col items-center w-screen min-h-screen h-full'>
                <div className=' w-[543px] mt-4 bg-white rounded-md'>
                    <h3 className='px-4 pt-4 font-medium'>Published Jobs</h3>
                    <div className='mt-1 px-3'>
                        <SpecificJobs isHire={true} userID={session?.user?.id} />
                    </div>
                </div>
            </div>
        </section>
    )
}

