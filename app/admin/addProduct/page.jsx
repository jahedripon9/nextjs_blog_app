'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennett",
        authorImg: "/author_img.png"
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        formData.append('image', image);

        try {
            const response = await axios.post('/api/blog', formData);
            if (response.data.success) {
                toast.success(response.data.msg);
                setImage(null);
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: "Alex Bennett",
                    authorImg: "/author_img.png"
                });
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error("An error occurred while submitting the blog post.");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
            <p className='text-xl'> Upload thumbnail</p>
            <label htmlFor="image">
                <Image
                    className='mt-4'
                    src={image ? URL.createObjectURL(image) : assets.upload_area}
                    width={140}
                    height={70}
                    alt='Blog thumbnail'
                />
            </label>
            <input
                type="file"
                id='image'
                onChange={onImageChange}
                hidden
                required
            />
            <p className='text-xl mt-4'>Blog Title</p>
            <input
                name='title'
                onChange={onChangeHandler}
                value={data.title}
                className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
                type="text"
                placeholder='Type here'
                required
            />
            <p className='text-xl mt-4'>Blog Description</p>
            <textarea
                name='description'
                onChange={onChangeHandler}
                value={data.description}
                className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
                placeholder='Write Content here'
                rows={6}
                required
            />
            <p className='text-xl mt-4'>Blog Category</p>
            <select
                className='w-40 mt-4 px-4 py-3 border text-gray-500'
                name="category"
                onChange={onChangeHandler}
                value={data.category}
            >
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
            <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>
                Add
            </button>
        </form>
    );
}

export default Page;
