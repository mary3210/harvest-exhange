import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UploadImage from "../components/UploadImage";

function CreateListing() {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    const [locationError, setLocationError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [imageError, setImageError] = useState('');
    const [postForm, setPostform] = useState({
        title: "",
        text: "",
        image: "",
        location: "",
        category: "produce",
        price: "0",
        unit: "lb",
    });

    const URL = "http://localhost:8000";

    const handleChange = (e) => {
        const userInput = { ...postForm };
        userInput[e.target.name] = e.target.value;
        setPostform(userInput);
        setLocationError('');
        setTitleError('');
    };
    const handleChange2 = (event) => {
        const userInput = { ...postForm };
        userInput[event.target.name] =
            event.target.value === ""
                ? event.target.value
                : parseInt(event.target.value);
        setPostform(userInput);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentState = { ...postForm };
        const title = postForm.title.trim()
        if (title === '') {
          setTitleError('Please enter a title');
          return;
        }
        const location = postForm.location.trim()
        if (location === '') {
          setLocationError('Please enter a location');
          return;
        }

        if (!postForm.image) {
            setImageError("Please upload an image");
            return;
          }



        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    authorization:
                        "Bearer " + localStorage.getItem("psg_auth_token"),
                },
                body: JSON.stringify(currentState),
            };
            const response = await fetch(URL + "/listing", requestOptions);
            const newPost = await response.json();
            setPostform([...post, newPost]);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <section>
                <h2>Create New Listing</h2>
                <div className="createListing">
                    <br />
                    <form onSubmit={handleSubmit}>
                        <br />
                        <div>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter a title"
                                    value={postForm.title}
                                    onChange={handleChange}
                                />
                                 <div style={{ color: 'red' }}>{titleError}</div>
                            </label>
                        </div>
                        <br />
                        <div>
                            <label>
                                zipcode:
                                <input
                                    type="text"
                                    id="zipcode"
                                    name="location"
                                    placeholder="Enter a zipcode"
                                    value={postForm.location}
                                    onChange={handleChange}
                                />
                                <div style={{ color: 'red' }}>{locationError}</div>
                            </label>
                        </div>
                        <div className="imageinput">
                            <label>
                                Image:
                                <UploadImage setPostform={setPostform} imageError={imageError}
        setImageError={setImageError}/>
                                <div style={{ color: 'red' }}>{imageError}</div>
                            </label>
                        </div>
                        <div className="txt">
                            <label>
                                Description:
                                <textarea
                                    type="text"
                                    id="details"
                                    name="text"
                                    placeholder="Enter Description"
                                    value={postForm.text}
                                    onChange={handleChange}
                                ></textarea>
                            </label>
                        </div>
                        <br />
                        Category:
                        <select
                            name="category"
                            id="category"
                            value={postForm.category}
                            onChange={handleChange}
                        >
                            <option value="produce">produce</option>
                            <option value="seed">seed</option>
                            <option value="live plant">live plant</option>
                        </select>
                        <br />
                        <label htmlFor="price">
                            If not swapping for items what price?
                        </label>
                        <input
                            type="Number"
                            id="price"
                            name="price"
                            min="0"
                            onChange={handleChange2}
                        ></input>
                        per:
                        <select
                            name="unit"
                            id="unit"
                            value={postForm.unit}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="lb">lb</option>
                            <option value="gram">gram</option>
                            <option value="ounce">ounce</option>
                            <option value="pint">pint</option>
                            <option value="flat">flat</option>
                            <option value="dozen">dozen</option>
                        </select>
                        <div>
                            <div className="btn postbtn1">
                                <input
                                    className="postBtn"
                                    type="submit"
                                    value="Post"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default CreateListing;
