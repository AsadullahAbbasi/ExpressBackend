import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";





 let  uploadCloudinary = async (localFilePath) => {
  
  try { 
    if(!localFilePath) return;
    const result = await cloudinary.uploader.upload(localFilePath,{
        resource_type : "auto"
    }) 
    console.log("file uploaded to cloudinary", result);
      // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return result;
    return result

  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error);
  }
}



export default uploadCloudinary;