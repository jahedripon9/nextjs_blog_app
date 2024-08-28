import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className='flex flex-col bg-slate-100 h-full sm:h-auto'>
            {/* Logo Section */}
            <div className='px-4 py-4 sm:py-6 border-b border-black flex justify-center sm:justify-start'>
                <Image src={assets.logo} alt='Logo' width={120} height={60} className='block' />
            </div>

            {/* Links Section */}
            <div className='w-full sm:w-80 min-h-screen py-6 px-4 border-t sm:border-none border-black relative'>
                <div className='flex flex-col space-y-6'>
                    {/* Add Blog Link */}
                    <Link href='/admin/addProduct' className='flex items-center border border-black gap-3 font-medium px-4 py-2 bg-white shadow-[3px_3px_0px_#000000] hover:bg-gray-100'>
                        <Image src={assets.add_icon} alt='Add Icon' width={28} height={28} />
                        <p>Add Blog</p>
                    </Link>

                    {/* Blog List Link */}
                    <Link href='/admin/blogList' className='flex items-center border border-black gap-3 font-medium px-4 py-2 bg-white shadow-[3px_3px_0px_#000000] hover:bg-gray-100'>
                        <Image src={assets.blog_icon} alt='Blog Icon' width={28} height={28} />
                        <p>Blog List</p>
                    </Link>

                    {/* Subscription Link */}
                    <Link href='/admin/subscription' className='flex items-center border border-black gap-3 font-medium px-4 py-2 bg-white shadow-[3px_3px_0px_#000000] hover:bg-gray-100'>
                        <Image src={assets.email_icon} alt='Email Icon' width={28} height={28} />
                        <p>Subscription</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
