import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myStyles from "../styles/Searchbar.css"
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const BASE_URL = "http://localhost:8000";
  const [filter, setFilter] = useState({
    location: "",
    distance: "",
    category: "",
    minprice: "",
    maxprice: ""
  });

  const getPosts = async () => {
    try {
      console.log(BASE_URL);
      const response = await fetch(BASE_URL + "/listing");
      const allPosts = await response.json();
      console.log(allPosts);
      setPosts(allPosts);
    } catch (err) {
      console.error(err);
    }
  };
  async function DoFilterTask(e) {
    try {
      e.preventDefault();
      const filteredResponse = await fetch(
        "http://localhost:8000/listing?" +
          new URLSearchParams(filter).toString()
      );
      const allFilteredPosts = await filteredResponse.json();
      console.log(allFilteredPosts);
      setPosts(allFilteredPosts);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);

  const handleChange = (event) => {
    const userInput = { ...filter };
    userInput[event.target.name] = event.target.value;
    setFilter(userInput);
  };

  const handleChange2 = (event) => {
    const userInput = { ...filter };
    userInput[event.target.name] =
      event.target.value === ""
        ? event.target.value
        : parseInt(event.target.value);
    setFilter(userInput);
  };

  return (
    <>
      <h2>Garden Listings</h2>
      <div className="Searchbar">
      <form onSubmit={DoFilterTask}>
        <div className="locationdiv">
       
        <input
         className="locationfield"
          type="text"
          id="location"
          name="location"
          value={filter.location}
          onChange={handleChange}
        ></input>
         <label htmlFor="location" className="locationlabel">Location</label>
        </div>
        <div className="distance">
        <label htmlFor="distance">Distance:</label>
        <select
          name="distance"
          id="distance"
          value={filter.distance}
          onChange={handleChange2}
        >
          <option value="">any distance</option>
          <option value="1">1 miles</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="15">15 miles</option>
          <option value="20">20 miles</option>
          <option value="25">25 miles</option>
        </select>
        </div>
        <div className="category">
        <label htmlFor="category">category:</label>
        <select
          name="category"
          id="category"
          value={filter.category}
          onChange={handleChange}
        >
          <option value="">any</option>
          <option value="produce">produce</option>
          <option value="seed">seed</option>
          <option value="live plant">live plant</option>
        </select>
        </div>
        <div className="minprice">
        <label htmlFor="minprice">min:</label>
        <input
          type="Number"
          id="minprice"
          name="minprice"
          min="0"
          onChange={handleChange2}
        ></input>
        </div>
        <div className="maxprice">
        <label htmlFor="maxprice">max:</label>
        <input
          type="Number"
          id="maxprice"
          name="maxprice"
          min="0"
          onChange={handleChange2}
        ></input>
        </div>
        <div className="btn findbtn1">
          <input className="findBtn" type="submit" value="Find" />
        </div>
      </form>
      </div>

      <ul>
        {posts &&
          posts.map((post, index) => (
            <div className="HomePosts" key={index}>
              <Link key={post._id} to={`/listing/${post._id}`}>
                <div className="listingTitle">
                  <h1> {post.title}</h1>
                </div>
                <div className="images">
                  <img alt={post.tags} src={post.image} />
                </div>
                <div className="location">
                  <p>Location: {post.location}</p>
                </div>
                <div className="listingText">
                  <p>Price: ${post.price} per {post.unit} </p>
                </div>
              </Link>
            </div>
          ))}
      </ul>
    </>
  );
};

export default PostList;
