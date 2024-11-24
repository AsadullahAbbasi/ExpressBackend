import dotenv from "dotenv";
import dbConnect from "./db/index.js";
import app from "./app.js";
dotenv.config();

dbConnect()
.then((res) => {
  console.log(`MongoDB Connected: ${res.connection.host}`);
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
  
})
.catch((err) => {
  console.log(err);
})



