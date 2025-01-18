'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {

    const [image, setImage] = useState(null);  // Main thumbnail image for the blog post
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

    // Handle text and select input changes
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle author image file upload
    const onAuthorImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAuthorImages((prevImages) => ({
                ...prevImages,
                [data.author]: file // Update the specific author's image with the uploaded file
            }));
        }
    };

    // Handle main blog image file upload
    const onImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    // Handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Prepare form data for submission
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);

        // Check if the author's image is a File object and append it if so
        const authorImageFile = authorImages[data.author] instanceof File ? authorImages[data.author] : null;
        if (authorImageFile) {
            formData.append('authorImg', authorImageFile);
        }

        // Append the main image if it's a File object
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('/api/blog', formData);
            if (response.data.success) {
                toast.success(response.data.msg);

                // Reset form fields and images to default
                setImage(null);
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
                toast.error("Error uploading blog post.");
            }
        } catch (error) {
            toast.error("An error occurred.");
        }
    };

    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload Blog Thumbnail</p>
                <label htmlFor="image">
                    <Image
                        className='mt-4'
                        src={image ? URL.createObjectURL(image) : assets.upload_area}
                        width={140} height={70} alt='Blog Thumbnail'
                    />
                </label>
                <input onChange={onImageChange} type="file" id='image' hidden />

                <p className='text-xl mt-4'>Blog Title</p>
                <input
                    name='title'
                    onChange={onChangeHandler}
                    value={data.title}
                    className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
                    type="text"
                    placeholder='Type title here'
                    required
                />

                <p className='text-xl mt-4'>Blog Description</p>
                <textarea
                    name='description'
                    onChange={onChangeHandler}
                    value={data.description}
                    className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
                    placeholder='Write content here'
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

                <p className='text-xl mt-4'>Author</p>
                <select
                    className='w-40 mt-4 px-4 py-3 border text-gray-500'
                    name="author"
                    onChange={onChangeHandler}
                    value={data.author}
                >
                    <option value="Jahed Ahmed">Jahed Ahmed</option>
                    <option value="Alex Bennett">Alex Bennett</option>
                </select>

                <p className='text-xl mt-4'>Upload Author Image</p>
                <label htmlFor="author-image">
                    <Image
                        className='mt-4'
                        src={authorImages[data.author] instanceof File
                            ? URL.createObjectURL(authorImages[data.author])
                            : authorImages[data.author]
                        }
                        width={140}
                        height={70}
                        alt='Author Image'
                    />
                </label>
                <input onChange={onAuthorImageChange} type="file" id='author-image' hidden />

                <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>Add Blog</button>
            </form>
        </>
    )
}

export default Page;
