import React from 'react'
import TagComponent from './tag';

const getTags = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/tag');

        if (!res.ok) {
            throw new Error("failed to fetch tags")
        }
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

export default async function TagLists() {
    const alltags = await getTags()

    return (
        <div >
            {alltags.map((tag, index) => (
                <div key={index} >
                    {tag.title}
                </div>
            ))}</div>
    )
}

