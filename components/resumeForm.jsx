'use client'
import React, { useState, useEffect } from 'react';

const ResumeForm = ({ userID, onResumeCallback, onClose }) => {
    const [hasExistingResume, setHasExistingResume] = useState(false);
    const [resID, setResID] = useState('')
    const [formData, setFormData] = useState({
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

            if (response.ok && data.existingResume) {
                // If resume exists, set the resume data
                setFormData(prevData => ({
                    ...prevData,
                    name: data.existingResume.name,
                    address: data.existingResume.address || '',
                    email: data.existingResume.email || '',
                    phone: data.existingResume.phone || '',
                    purpose: data.existingResume.purpose || '',
                    experience: data.existingResume.experience || '',
                    project: data.existingResume.project || '',
                    achievement: data.existingResume.achievement || '',
                }));
                setResID(data.existingResume._id)
                setHasExistingResume(true);
                onResumeCallback(data.existingResume ? true : false);


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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Function to fetch resume data


    const submitResume = async (formData, userID) => {
        let resumeId;
        try {
            const response = await fetch('/api/resume', {
                method: 'POST',
                body: JSON.stringify({
                    userId: userID,
                    name: formData.name,
                    address: formData.address,
                    email: formData.email,
                    phone: formData.phone,
                    purpose: formData.purpose,
                    experience: formData.experience,
                    project: formData.project,
                    achievement: formData.achievement,
                }),
            });

            if (!response.ok) {
                throw new Error('Error submitting resume');
            }

            const responseData = await response.json();

            // Extract the resume ID from the response
            resumeId = responseData.resumeId;

            // Log the newly created or updated resume ID
            console.log('Resume submitted successfully. Resume ID:', resumeId);

            // Make an API call to update the user data with resumeID
            try {
                const updateUserResponse = await fetch(`/api/userExists`,
                    {
                        method: 'PUT',
                        body: JSON.stringify({
                            userId: userID,
                            resumeID: resumeId,
                        }),
                    });

                if (!updateUserResponse.ok) {
                    throw new Error('Error updating resume ID');
                }

                console.log('Resume ID updated successfully');

                try {
                    console.log('Res ID', resumeId);

                    const auditResponse = await fetch(`/api/resumeAudit`, {
                        method: 'POST',
                        body: JSON.stringify({
                            resumeID: resumeId,
                            updatedData: formData,
                        }),
                    });

                    if (!auditResponse.ok) {
                        throw new Error('Error adding audit entry');
                    }

                    console.log('Audit entry added successfully');
                } catch (auditError) {
                    console.error('Error adding audit entry:', auditError.message);
                }

            } catch (updateUserError) {
                console.error('Error updating resume ID:', updateUserError.message);
            }
        } catch (error) {
            console.error('Error submitting resume:', error.message);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        submitResume(formData, userID);
        const actionText = hasExistingResume ? 'updated' : 'created';
        alert(`Resume ${actionText} successfully`);
        setFormData({
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
    };

    return (
        <form className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className='flex justify-between'>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <img onClick={onClose}
                    className="p-[2px] rounded-full w-[20px] h-[20px] hover:bg-gray-200 cursor-pointer"
                    alt=""
                    src="/assets/icons/close.svg"
                />
            </div>

            <hr className="my-4" />

            {/* Additional fields */}
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="purpose">
                        Purpose
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="experience">
                        Experience
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="project">
                        Project
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        id="project"
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="achievement">
                        Achievement
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        id="achievement"
                        name="achievement"
                        value={formData.achievement}
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-md"
                type="submit"
            >
                Save Resume
            </button>
        </form>
    );
};

export default ResumeForm;
