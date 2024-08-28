'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {  // Updated to start with an uppercase letter

    const [image, setImage] = useState(false);
    const [authorImages, setAuthorImages] = useState({
        "Jahed Ahmed": "/author_img_2.png",
        "Alex Bennett": "/author_img_1.png"
    });
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Jahed Ahmed",  // Default author
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onImageChange = (event) => {
        const file = event.target.files[0];
        setAuthorImages({
            ...authorImages,
            [data.author]: file
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', authorImages[data.author_Img] instanceof File ? authorImages[data.author_Img] : null);
        formData.append('image', image);

        const response = await axios.post('/api/blog', formData);
        if (response.data.success) {
            toast.success(response.data.msg);
            setImage(false);
            setData({
                title: "",
                description: "",
                category: "Startup",
                author: "Jahed Ahmed"
            });
            setAuthorImages({
                "Jahed Ahmed": "/author_img_2.png",
                "Alex Bennett": "/author_img_1.png"
            });
        } else {
            toast.error("Error");
        }
    };

    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload thumbnail</p>
                <label htmlFor="image">
                    <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt='' />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />

                <p className='text-xl mt-4'>Blog Title</p>
                <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />

                <p className='text-xl mt-4'>Blog Description</p>
                <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Write Content here' rows={6} required />

                <p className='text-xl mt-4'>Blog Category</p>
                <select className='w-40 mt-4 px-4 py-3 border text-gray-500' name="category" onChange={onChangeHandler} value={data.category}>
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select> <br />

                <p className='text-xl mt-4'>Author List</p>
                <select className='w-40 mt-4 px-4 py-3 border text-gray-500' name="author" onChange={onChangeHandler} value={data.author}>
                    <option value="Jahed Ahmed">Jahed Ahmed</option>
                    <option value="Alex Bennett">Alex Bennett</option>
                </select> <br />

                <p className='text-xl mt-4'>Upload Author Image</p>
                <label htmlFor="author-image">
                    <Image className='mt-4'
                        src={authorImages[data.author_Img] instanceof File ? URL.createObjectURL(authorImages[data.author_Img]) : authorImages[data.author_Img]}
                        width={140} height={70} alt='Author Image' />
                </label>
                <input onChange={onImageChange} type="file" id='author-image' hidden />

                <button type="submit" className='mt-8 w-40 h-12 bg-black text-white '>Add</button>
            </form>
        </>
    )
}

export default Page;
