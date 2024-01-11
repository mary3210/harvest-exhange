import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";

function EditListing(props) {
  
    const navigate = useNavigate();
    const [imageError, setImageError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [titleError, setTitleError] = useState('');
    const { id } = useParams();
    const { data } = props;
    const URL = process.env.REACT_APP_LOCAL_URL + '/listing/';
    const [editForm, setEditForm] = useState({
        title: "",
        text: "",
        image: "",
        location: "",
        category: "produce",
        price: "",
        unit: "lb",
    });

    const getPost = async (id) => {
      try {
        const response = await fetch(URL + `${id}`);
        const result = await response.json();
        setEditForm(result);
      } catch (err) {
        console.error(err);
      }
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
        const currentState = { ...editForm };
        console.log(currentState)
        const title = editForm.title.trim()
        if (title === '') {
          setTitleError('Please enter a title');
          return;
        }
        const location = editForm.location.trim()
        if (location === '') {
          setLocationError('Please enter a zipcode');
          return;
        }
        else {
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "content-Type": "application/json",
                    authorization:
                        "Bearer " + localStorage.getItem("psg_auth_token"),
                },
                body: JSON.stringify(currentState),
            };
            const response = await fetch(URL + id, requestOptions);
            const result = await response.json();
            setEditForm(result);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
      }
  }
    useEffect(() => {
       
        getPost(id)
        console.log("abs ", data);
    }, [id]);

    const handleChange = (e) => {
        const userInput = { ...editForm };
        userInput[e.target.name] = e.target.value;
        setEditForm(userInput);
        setLocationError('');
        setTitleError('');
    };
    const handleChange2 = (event) => {
        const userInput = { ...editForm };
        userInput[event.target.name] =
            event.target.value === ""
                ? event.target.value
                : parseInt(event.target.value);
        setEditForm(userInput);
    };
   
    return (
        <div>
            <h1>EditListing</h1>
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
                            value={editForm.title}
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
                            value={editForm.location}
                            onChange={handleChange}
                        />
                        <div style={{ color: 'red' }}>{locationError}</div>
                    </label>
                </div>
                <div className="imageinput">
                    Image:
                    <UploadImage setPostform={setEditForm} imageError={imageError}
        setImageError={setImageError} editImage={editForm.image }/>
                </div>
                <div className="txt">
                    <label>
                        Description:
                        <textarea
                            type="text"
                            id="details"
                            name="text"
                            placeholder="Enter Description"
                            value={editForm.text}
                            onChange={handleChange}
                        ></textarea>
                    </label>
                </div>
                <br />
                Category:
                <select
                    name="category"
                    id="category"
                    value={editForm.category}
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
                    value={editForm.unit}
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
                    <div className="btn editbtn1">
                        <input
                            className="editBtn"
                            type="submit"
                            value="Confirm"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditListing;
