'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SpecificJobs from '@/components/specificJobs';
import Navbar from '@/components/navbar';
import Applicant from '@/components/applicant';

export default function Applications({ params }) {
    const { data: session } = useSession();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`/api/application?jobID=${params.applicants}`);
                const data = await response.json();

                console.log('applications', data);

                if (response.ok) {
                    setApplications(data.applications);
                } else {
                    console.error('Error fetching applications:', data.message);
                }
            } catch (error) {
                console.error('Error fetching applications:', error.message);
            }
        };

        if (params.applicants) {
            fetchApplications();
        }
    }, [params.applicants]);

    return (
        <section>
            <Navbar />
            <div className='flex bg-[#F3F2EF] py-14  flex-col items-center w-screen min-h-screen h-full'>
                <div className='w-[543px] mt-4 bg-white rounded-md'>
                    <h3 className='px-4 pt-4 font-medium'>Applicants</h3>
                    <div className='mt-1 py-2 px-3'>
                        {applications.map((application, index) => (
                            application.applicantIDs.map((applicant, idx) => (
                                <Applicant key={`${index}-${idx}`} applicantID={applicant._id} jobId={application.jobID._id} imageurl={'/assets/images/dp2.jpeg'} username={applicant.name} />
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
