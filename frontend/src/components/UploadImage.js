import React, { useState } from "react";

function UploadImage(props) {
  //holds image to be uploaded
  const [image, setImage] = useState("");
  //holds the image url after its been uploaded
  const [url, setUrl] = useState("");
  let uploadedImage = props.uploadedImage

  function ImageUpload(e) {
    const files = e.target.files
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "harvest_exchange");
    data.append("cloud_name", "dr9kvkbgq");

    fetch("https://api.cloudinary.com/v1_1/dr9kvkbgq/image/upload", {
      method: "POST",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        setImage(data.url)
        
        if(props.uploadedImage){
            props.uploadedImage(data.url)
        }
        
      })
      .catch((err) => console.log(err));
  }
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
        <img src={url} />
      </div>
    </div>
  );
}

export default UploadImage;
