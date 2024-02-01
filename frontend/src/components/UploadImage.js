import { useState, createContext, useEffect } from "react";
import CloudinaryUploadWidget from "../hooks/CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { edit } from "@cloudinary/url-gen/actions/animated";

export default function UploadImage({ setPostform, setImageError, imageError, editImage}) {
    const [imageInfo, setImageInfo] = useState("");
    // Replace with your own cloud name
    const [cloudName] = useState("dr9kvkbgq");
    // Replace with your own upload preset
    const [uploadPreset] = useState("harvest_exchange");

  
    const [uwConfig] = useState({
        cloudName,
        uploadPreset,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        // multiple: false,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
    });

    useEffect(() => {
        if (imageInfo) {
            setPostform((prev) => ({
                ...prev,
                image: imageInfo?.secure_url
            }));
            setImageError("")
        }
    }, [imageInfo, editImage]);

    return (
        <div className="UploadImage">
            <CloudinaryUploadWidget
                uwConfig={uwConfig}
                setPublicId={setImageInfo}
            />

           
            {imageInfo && (
                <img
                    src={imageInfo?.secure_url}
                    style={{ width: "300px", display: "block" }}
                    alt="produce"
                />
            ) }
              {editImage && !imageInfo &&(
              <img
              src={editImage}
              style={{ width: "300px", display: "block" }}
              alt="produce"
          />
          )}  
        </div>
    );
}
