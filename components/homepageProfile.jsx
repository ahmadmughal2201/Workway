import React from 'react'
import Link from 'next/link';


const HomepageProfile = ({name, bio}) => {
    return (

        <div className='h-[285px] rounded-md w-[225px] bg-white z-0'>
            <Link href='/profile'>
                <div className='relative'>
                    <img
                        className=" rounded-t-md w-full h-[63px] object-cover"
                        alt=""
                        src="./assets/images/smallCover.png"
                    />
                </div>

                <div className="relative -top-7 left-[35%] transform: -translateX-1/2">
                    <img
                        className="rounded-[50%] border-[3px] border-white w-[63px] h-[63px] object-cover"
                        alt=""
                        src="./assets/images/dp2.jpeg"
                    />
                </div>
                <div className='flex flex-col pl-5 pr-5 text-center items-center justify-center mt-0 '>
                    <p className='font-semibold text-black'>{name}</p>
                    <p className='text-sm text-gray-500'>{bio} </p>

                </div>
            </Link>

            <div className=''>


                <div className='mt-4 border-t border-b '>
                    <div className='flex pl-3 pr-3 p-1 text-center items-center justify-between '>
                        <p className=' text-gray-500'>Recuritments</p>
                        <p className='text-sm text-blue-500'>fifty </p>
                    </div>
                    <div className='flex  pl-3 pr-3 p-1 text-center items-center justify-between '>
                        <p className=' text-gray-500'>Job Applications</p>
                        <p className='text-sm text-blue-500'>5 </p>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default HomepageProfile