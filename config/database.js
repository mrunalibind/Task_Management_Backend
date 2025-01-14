import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

let connection = mongoose.connect(process.env.URL);

export default connection;