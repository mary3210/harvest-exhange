import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myStyles from "../styles/Searchbar.css"
import mylistingStyles from "../styles/listing.css"
import { BiDotsVertical } from "react-icons/bi";
import { TbGridDots } from "react-icons/tb";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const BASE_URL = "";
  const [filter, setFilter] = useState({
    location: "",
    distance: "",
    category: "",
    minprice: "",
    maxprice: ""
  });

  const [isColumn, setIsColumn] = useState(true)
  const [isSearchFormExpanded, setIsSearchFormExpanded] = useState(false);
 
 const toggleColumn = () => {
  setIsColumn((column) => !column);
 }

  const toggleSearchForm = () => {
    setIsSearchFormExpanded((prevExpanded) => !prevExpanded);
  };

  function moveLabelUp(input) {
    const label = document.querySelector(`label[for=${input.id}]`);
    if (label) {
      label.classList.add("label-up");
    }
  }
  
  function moveLabelBack(input) {
    if (!input.value && !input.matches(":focus")) {
      const label = document.querySelector(`label[for=${input.id}]`);
      if (label) {
        label.classList.remove("label-up");
      }
    }
  }

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
        "/listing?" +
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
    <div className="Home">
      <div className="everythingbar">
      <div className="Searchbar">
        <div className="iconContainer">
          <div className="slens" id="searchIcon" onClick={toggleSearchForm}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.5556 3C19.4579 3 21 4.54213 21 6.44444V17.5556C21 19.4579 19.4579 21 17.5556 21H6.44444C4.54213 21 3 19.4579 3 17.5556V6.44444C3 4.54213 4.54213 3 6.44444 3H17.5556Z" stroke="#000000" stroke-width="2"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5067 7.01392C9.02527 7.01392 7.01367 9.02551 7.01367 11.5069C7.01367 13.9884 9.02527 16 11.5067 16C12.3853 16 13.205 15.7478 13.8973 15.3119L15.1658 16.5803C15.5563 16.9709 16.1895 16.9709 16.58 16.5803C16.9705 16.1898 16.9705 15.5566 16.58 15.1661L15.3116 13.8977C15.7475 13.2053 15.9997 12.3856 15.9997 11.5069C15.9997 9.02551 13.9881 7.01392 11.5067 7.01392ZM9.01367 11.5069C9.01367 10.1301 10.1298 9.01392 11.5067 9.01392C12.8836 9.01392 13.9997 10.1301 13.9997 11.5069C13.9997 12.8838 12.8836 14 11.5067 14C10.1298 14 9.01367 12.8838 9.01367 11.5069Z" fill="#000000"></path> </g></svg></div>
        </div>
      <form onSubmit={DoFilterTask} className={`search-form ${isSearchFormExpanded ? "expand" : ""}`}>
        <div className="distance">
        <select
          name="distance"
          id="distance"
          value={filter.distance}
          onChange={handleChange2}
        >
          <option value="">any distance from</option>
          <option value="1">1 mile from</option>
          <option value="5">5 miles from</option>
          <option value="10">10 miles from</option>
          <option value="15">15 miles from</option>
          <option value="20">20 miles from</option>
          <option value="25">25 miles from</option>
        </select>
        </div>
        <div className="locationdiv">
        <input
         className="locationfield"
          type="text"
          id="location"
          name="location"
          value={filter.location}
          onChange={handleChange}
          onFocus={() => moveLabelUp(document.getElementById("location"))}
          onBlur={() => moveLabelBack(document.getElementById("location"))}
        ></input>
         <label htmlFor="location" className="locationlabel">Zipcode/Address</label>
        </div>
        <div className="category">
        <select
          name="category"
          id="category"
          value={filter.category}
          onChange={handleChange}
        >
          <option value="">all categories</option>
          <option value="produce">produce</option>
          <option value="seed">seed</option>
          <option value="live plant">live plant</option>
        </select>  
        </div>
        <div className="minprice">
        <label htmlFor="minprice">Min Price</label>
        <input
          type="Number"
          id="minprice"
          name="minprice"
          min="0"
          onChange={handleChange2}
          onFocus={() => moveLabelUp(document.getElementById("minprice"))}
          onBlur={() => moveLabelBack(document.getElementById("minprice"))}
        ></input>
        </div>
        <div><span>-</span></div>
        <div className="maxprice">
        <label htmlFor="maxprice">Max Price</label>
        <input
          type="Number"
          id="maxprice"
          name="maxprice"
          min="0"
          onChange={handleChange2}
          onFocus={() => moveLabelUp(document.getElementById("maxprice"))}
          onBlur={() => moveLabelBack(document.getElementById("maxprice"))}
        ></input>
        </div>
        <div className="btn findbtn1">
          <input className="findBtn" type="submit" value="search" />
        </div>
      </form>
     
      </div>
      <div className="columnIconContainer">
        <div className={`listingsArrangement ${isColumn ? "column" : "row"}`} onClick={toggleColumn}>{ isColumn ? <TbGridDots /> :<BiDotsVertical />}</div>
        </div>
        </div>
      <ul className={` ${isColumn ? "column" : "row"}`}>
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
                <div className="listingText">
                  <p>${post.price} per {post.unit} </p>
                </div>
                <div className="location">
                  <p>Location: {post.location}</p>
                </div>
              </Link>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default PostList;
