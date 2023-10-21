import React, { useEffect } from "react";
import axios from "axios";
import { Passage, Session, User } from "@passageidentity/passage-js";
import { usePassageUserInfo } from "../hooks/";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassage } from "@passageidentity/passage-react";

import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

export default function CreateListing() {
  // get user metadata from passage session
  const { userInfo } = usePassageUserInfo();

  const [listing, setListing] = React.useState({
    userId: "",
    username: "",
    firstname: "",
    zipcode: "",
    category: "",
    title: "",
    text: "",
    // does this need to be a string or number
    price: "",
    unit: "",
    image: "",
  });

  useEffect(() => {
    if (userInfo) {
      setListing((prevState) => ({
        ...prevState,
        userId: userInfo.id,
      }));
    }
    if (userInfo.user_metadata) {
      setListing((prevState) => ({
        ...prevState,
        username: userInfo.user_metadata.username,
        firstname: userInfo.user_metadata.first_name,
        zipcode: userInfo.user_metadata.zip_code,
      }));
    }
    console.log(userInfo);
  }, [userInfo]);

  // POST form data to DB
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle form submission logic here
  //   const form = e.target;
  //   const formData = new FormData(form);
  // };

  // handle form changes, manage state
  // const handleChange = e => {
  //     setListing({
  //         ...listing,
  //         [e.target.name] : e.target.value
  //     })
  // }

  //     return (
  //         <PassageAuthGuard
  //         // displays if not logged in
  //           unAuthComp={
  //             <div>
  //               <div>you must be logged in</div>
  //               <div>
  //                 <a href="/">Login</a>
  //               </div>
  //             </div>
  //           }
  //         >
  //             {/* displays if logged in */}
  //           <div>
  //             <h1>Create Listing</h1>
  //             <form method="post" onSubmit={handleSubmit}>
  //             <div>
  //                 <label htmlFor="username">Username</label>
  //                 <input
  //                 type="text"
  //                 id="username"
  //                 value={username}
  //                 //   onChange={handleChange} - non-editable field
  //                 />
  //             </div>
  //             <div>
  //                 <label htmlFor="firstName">First Name</label>
  //                 <input
  //                 type="text"
  //                 id="firstName"
  //                 value={firstName}
  //                 //   onChange={handleChange} - non-editable field
  //                 />
  //             </div>
  //             <div>
  //                 <label htmlFor="zipCode">Zip Code</label>
  //                 <input
  //                 type="number"
  //                 id="zipCode"
  //                 value={zipCode}
  //                 onChange={handleChange}
  //                 />
  //             </div>
  //             <div>
  //                 <label htmlFor="category">Category</label>
  //                 <select id="category" value={category} onChange={handleChange}>
  //                 <option value="">Select category</option>
  //                 {/* Add options for categories */}
  //                 </select>
  //             </div>
  //             <div>
  //                 <label htmlFor="title">Title</label>
  //                 <input
  //                 type="text"
  //                 id="title"
  //                 value={title}
  //                 onChange={handleChange}
  //                 />
  //             </div>
  //             <div>
  //                 <label htmlFor="text">Description</label>
  //                 <input
  //                 type="text"
  //                 id="text"
  //                 value={text}
  //                 onChange={handleChange}
  //                 />
  //             </div>
  //             <div>
  //                 <label htmlFor="price">Price</label>
  //                 <input
  //                 type="number"
  //                 id="price"
  //                 value={price}
  //                 onChange={handleChange}
  //                 />
  //             </div>
  //             <div>
  //                 <label htmlFor="unit">Unit</label>
  //                 <select id="unit" value={unit} onChange={handleChange}>
  //                 <option value="">Select unit</option>
  //                 {/* Add options for units */}
  //                 </select>
  //             </div>
  //             <div>
  //                 <label htmlFor="image">Image</label>
  //                 <input
  //                 type="text"
  //                 id="image"
  //                 value={image}
  //                 onChange={handleChange}
  //                 />
  //             </div>
  //             <button type="submit">Submit</button>
  //             {/* need cancel button */}
  //             </form>
  //           </div>
  //         </PassageAuthGuard>
  //   );
}