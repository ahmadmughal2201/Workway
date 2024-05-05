'use client'
import React, { useEffect, useState } from 'react';
import PublishJobCard from './publishJobCard';



export default function JobLists({loggedInID}) {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getJobs();
                setJobs(data.jobs);
            } catch (error) {
                // Handle error (e.g., show an error message to the user)
                console.error('Error fetching jobs:', error.message);
            }
        };

        fetchData();
    }, []); 

    const getJobs = async () => {
    
        try {
            const res = await fetch('http://localhost:3000/api/job', {
                cache: 'no-store',
            });

            if (!res.ok) {
                throw new Error("failed to fetch jobs")
            }
            return res.json();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='mt-4'>
            {jobs && jobs.map((job, index) => (
                <PublishJobCard key={index} jobID={job._id} userID={job.recruiterID._id} imageurl={"./assets/images/dp.png"} username={job.recruiterID.name} text={job.description} title={job.title} date={job.dueDate} tags={job.tags}
                isHire={loggedInID === job.recruiterID._id}
                />
            ))}
        </div>)
}

