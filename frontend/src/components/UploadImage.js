import React, { useState } from "react";
import { useEffect } from "react";

function UploadImage(props) {
  //holds image to be uploaded
  const [image, setImage] = useState("");
  //holds the image url after its been uploaded
  const [url, setUrl] = useState("");
  
  const [loading, setLoading] = useState(false);

  const { uploadedImage, initialImage } = props;


  function ImageUpload(e) {

    const files = e.target.files
   
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "harvest_exchange");
    data.append("cloud_name", "dr9kvkbgq");
    setLoading(true);
    fetch("https://api.cloudinary.com/v1_1/dr9kvkbgq/image/upload", {
      method: "POST",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        setImage(data.url)
        console.log("a")
        console.log(data.url)
        if(uploadedImage){
            uploadedImage(data.url);
            setLoading(false);
        }
        
      })
      .catch((err) => {console.log(err)
        setLoading(false);});
  }
  useEffect(() => {
    // Set the initial image value when the component mounts
    if (initialImage) {
      setUrl(initialImage);
    }
  }, [initialImage]);

  return (
    <div>
      <div>
        <input
          name="image"
          placeholder="upload an image"
          type="file"
          onChange={ImageUpload}
        ></input>
        
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        {loading ?( <p>Loading...</p>):(
          url && (
            <><img src={url} alt="uploaded"/>
            
            </>
          )
        )}
        
  
        
      </div>
    </div>
  );
}

export default UploadImage;
