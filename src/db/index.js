import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
dotenv.config();

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: DB_NAME, // Explicitly set the database name
    });
    console.log("Connected to MongoDB" + connection.connection.host);
    console.log("running on port", "http://localhost:" + process.env.PORT);

    return connection;
  } catch (error) {
    console.log("Error at index.js line 8", error);
    process.exit(1);
  }
};

export default connectDb;
