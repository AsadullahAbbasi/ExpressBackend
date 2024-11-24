import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
}); 



export default   const uploadCloudinary = async (localFilePath) => {
  try { 
    if(!localFilePath) return;
    const result = await cloudinary.uploader.upload(localFilePath,{
        resource_type : "auto"
    }) 
    console.log("file uploaded to cloudinary", result);
      // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    return result

  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error);
  }
}


