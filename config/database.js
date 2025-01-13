import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

let connection = mongoose.connect("mongodb://127.0.0.1:27017/TaskManagementSystem");
// let connection = mongoose.connect("mongodb+srv://mrunali:mrunalibind@cluster0.tsxywrf.mongodb.net/TaskManagementSystem?retryWrites=true&w=majority");

export default connection;