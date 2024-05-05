import React, { useEffect, useState } from 'react';
import PublishJobCard from './publishJobCard';

const getJobs = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/job?recruiterID=${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error("failed to fetch jobs");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to be caught by the component
    }
};

export default function SpecificJobs({ userID , isHire, LoggedInID}) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(userID)
                const data = await getJobs(userID);
                setJobs(data.jobs);
            } catch (error) {
                // Handle error (e.g., show an error message to the user)
                console.error('Error fetching jobs:', error.message);
            }
        };

        fetchData();
    }, [userID]); // Add userID to the dependency array

    return (
        <div className='mt-4'>
            {jobs.map((job, index) => (
                <PublishJobCard
                    key={index}
                    imageurl={"/assets/images/dp2.jpeg"}
                    username={job.recruiterID.name}
                    text={job.description}
                    title={job.title}
                    date={job.dueDate}
                    tags={job.tags}
                    classes={'border'}
                    isHire={isHire !== undefined ? isHire : LoggedInID === job.recruiterID._id}
                    userID={userID}
                    jobID={job._id}
                    
                />
            ))}
        </div>
    );
}
