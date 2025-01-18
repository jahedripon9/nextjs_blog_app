'use client'
import { assets } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blog', {
                params: {
                    id: params.id
                }
            });
            setData(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to load blog data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return data ? (
        <>
            <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
                <div className='flex justify-between items-center'>
                    <Link href='/'>
                        <Image src={assets.logo} alt='Logo' width={180} className='w-[130] sm:w-auto' />
                    </Link>
                    <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
                        Get Started <Image src={assets.arrow} alt='Arrow' />
                    </button>
                </div>
                <div className='text-center my-24'>
                    <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                    <Image
                        src={data.author_Img} // Automatically use the author image URL from the database
                        className='mx-auto mt-6 border border-white rounded-full'
                        width={60}
                        height={60}
                        alt={`${data.author}'s profile`}
                    />
                    <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
                </div>
            </div>
            <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
                <Image className='border-4 border-white' src={data.image} alt='Blog main image' width={1280} height={720} />

                <div className='blog-content' dangerouslySetInnerHTML={{ __html: data.description }}></div>

                <div className='my-24'>
                    <p className='text-black font-semibold my-4'>Share this article on Social Media</p>
                    <div className='flex'>
                        <Image src={assets.facebook_icon} width={50} height={50} alt='Facebook icon' />
                        <Image src={assets.twitter_icon} width={50} height={50} alt='Twitter icon' />
                        <Image src={assets.googleplus_icon} width={50} height={50} alt='Google Plus icon' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    ) : null;
};

export default Page;
