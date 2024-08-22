import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://j_ripon:Hello121@cluster0.piqtj.mongodb.net/blog/app');
    console.log("DB Connected");
}