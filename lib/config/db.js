import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://jahedripon9:443170@cluster0.tjbr9.mongodb.net/blog-app');
    console.log("DB Connected");
}