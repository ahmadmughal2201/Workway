import React, { useState, useEffect } from 'react';
import TagComponent from './tag';

const TagsModal = ({ onClose, handleSelectedTags }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);

    const fetchTags = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/tag');

            if (!res.ok) {
                throw new Error('Failed to fetch tags');
            }

            const tags = await res.json();
            setAllTags(tags.tag);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTags(); // Fetch tags when the component mounts
    }, []);

    const handleTagClick = (tag) => {
        if (selectedTags.some((selectedTag) => selectedTag._id === tag._id)) {
            setSelectedTags(selectedTags.filter((item) => item._id !== tag._id));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleDone = () => {
        handleSelectedTags(selectedTags);
        onClose();
    };

    return (
        <div className="absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center overflow-y-auto">
            <div className="transition-opacity w-full h-full bg-gray-500 opacity-75 absolute"></div>
            <div className="z-50 flex flex-col justify-between relative bg-white rounded-lg p-6 w-[500px] h-[350px]">
                <div className="text-center justify-between flex mb-4">
                    <div className='w-full'>
                        <input
                            type="text"
                            className=" w-inherit rounded-l-md border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white p-2"
                            placeholder="Search Tags"
                        />
                        <button className="rounded-r-md border-t border-b border-r text-gray-800 border-gray-200 bg-white p-2">
                            Search
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <img
                            onClick={onClose}
                            className="p-[2px] rounded-full w-[20px] h-[20px] hover:bg-gray-200 cursor-pointer"
                            alt=""
                            src="./assets/icons/close.svg"
                        />
                    </div>

                </div>

                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                    Selected Tags
                </h3>
                <div className="flex flex-wrap mt-2">
                    {selectedTags.map((tag, index) => (
                        <TagComponent
                            key={index}
                            onClick={() => handleTagClick(tag)}
                            tag={tag}
                            classes={"cursor-pointer bg-gray-300 font-semibold text-gray-800 text-sm px-3 py-1 rounded-full m-1"}
                        />
                    ))}
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                    All Tags
                </h3>
                <div className="flex flex-wrap mt-2">
                    {allTags
                        .filter((tag) => !selectedTags.some((selectedTag) => selectedTag._id === tag._id))
                        .map((tag, index) => (
                            <TagComponent
                                key={index}
                                onClick={() => handleTagClick(tag)}
                                classes="cursor-pointer bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full m-1"
                                tag={tag}
                            />
                        ))}
                </div>
                <div className="mt-6 flex justify-end text-center">
                    <button
                        onClick={handleDone}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TagsModal;
