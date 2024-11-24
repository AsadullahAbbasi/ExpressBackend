
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';
dotenv.config(); 


const connectDb = async () => {
    try {
       const connection= await mongoose.connect(`${process.env.MONGODB_URI }/${DB_NAME }`);
        console.log("Connected to MongoDB"+connection.connection.host);
        return connection
    } catch (error) {
        console.log("Error at index.js line 8",error);
        process.exit(1);    
    }
}

export default connectDb