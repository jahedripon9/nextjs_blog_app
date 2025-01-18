import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    authors: {
        type: [String], // Array of strings for multiple authors
        required: true
    },
    images: {
        type: [String], // Array of strings for multiple author images
        required: true
    },
    mainImage: { // Separate main image for the blog post
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const BlogModel = mongoose.models.blog || mongoose.model('blog', Schema);

export default BlogModel;
