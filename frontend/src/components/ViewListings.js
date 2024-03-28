import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myStyles from "../styles/Searchbar.css"
import mylistingStyles from "../styles/listing.css"
import { BiDotsVertical } from "react-icons/bi";
import { TbGridDots } from "react-icons/tb";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import  CustomSelect  from '../hooks/CustomSelect.jsx'
import { FaToggleOn } from "react-icons/fa";
import { LiaToggleOffSolid } from "react-icons/lia";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [delayedPosts, setDelayedPosts] = useState([]);
  const [filter, setFilter] = useState({
    location: "",
    distance: "",
    category: "",
    minprice: "",
    maxprice: ""
  });

  const [isColumn, setIsColumn] = useState(true)
  const [isSearchFormExpanded, setIsSearchFormExpanded] = useState(true);
 
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

  const getPosts = async (e) => {
    try {
      e?.preventDefault();
      const response = await fetch(process.env.REACT_APP_LOCAL_URL + "/services/listing?" + new URLSearchParams(filter).toString());
      const allPosts = await response.json();
      setPosts(allPosts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    let i = 0;
    setDelayedPosts([]);
    const interval = setInterval(function() {
      if (i < posts.length) {
        setDelayedPosts((existingDelayedPosts) => {
          return [...existingDelayedPosts, posts[existingDelayedPosts.length]];
        });
        i++;
      } else {
        clearInterval(interval);
      }
    }, 250);

    return () => {
      clearInterval(interval);
    }
  }, [posts]);


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

  const handleChange3 = (value) => {
    const userInput = { ...filter };
    userInput["distance"] = value ==="" ? value : parseInt(value);
    setFilter(userInput);
  };

  const handleChange4 = (value) => {
    const userInput = { ...filter };
    userInput["category"] = value;
    setFilter(userInput);
  };

  return (
    <div>
    <div className="homeBanner"><h2>The Market</h2></div>
    <div className="Home">
      
      
      <ul className={` ${isColumn ? "column" : "row"}`}>
      <div className="everythingbar desktopeverythingbar">
      <div className="Searchbar">
        <div className="iconContainer">
          <div className="slens" id="searchIcon" onClick={toggleSearchForm}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.5556 3C19.4579 3 21 4.54213 21 6.44444V17.5556C21 19.4579 19.4579 21 17.5556 21H6.44444C4.54213 21 3 19.4579 3 17.5556V6.44444C3 4.54213 4.54213 3 6.44444 3H17.5556Z" stroke="#000000" strokeWidth="2"></path> <path fillRule="evenodd" clipRule="evenodd" d="M11.5067 7.01392C9.02527 7.01392 7.01367 9.02551 7.01367 11.5069C7.01367 13.9884 9.02527 16 11.5067 16C12.3853 16 13.205 15.7478 13.8973 15.3119L15.1658 16.5803C15.5563 16.9709 16.1895 16.9709 16.58 16.5803C16.9705 16.1898 16.9705 15.5566 16.58 15.1661L15.3116 13.8977C15.7475 13.2053 15.9997 12.3856 15.9997 11.5069C15.9997 9.02551 13.9881 7.01392 11.5067 7.01392ZM9.01367 11.5069C9.01367 10.1301 10.1298 9.01392 11.5067 9.01392C12.8836 9.01392 13.9997 10.1301 13.9997 11.5069C13.9997 12.8838 12.8836 14 11.5067 14C10.1298 14 9.01367 12.8838 9.01367 11.5069Z" fill="#000000"></path> </g></svg></div>
        </div>
      <form onSubmit={getPosts} className={`search-form ${isSearchFormExpanded ? "expand" : ""}`}>
        <Swiper modules={[FreeMode]} freeMode={true} slidesPerView="auto" direction="horizontal" wrapperClass="filterswiperwrapper">
          <SwiperSlide>
            <CustomSelect
            DropdownList={[
              {text:"any distance from", value:''},
              {text:"1 mile from", value:'1'},
              {text:"5 miles from", value: '5'},
              {text:"10 miles from", value: '10'},
              {text:"15 miles from", value: '15'},
              {text:"20 miles from", value: '20'},
              {text:"25 miles from", value: '25'}
            ]}
            ReturnValue ={(value) => handleChange3(value)}/>
          </SwiperSlide>
          <SwiperSlide>
            <div className="locationdiv">
              <input
              className="locationfield searchinput"
                type="text"
                id="location"
                name="location"
                value={filter.location}
                onChange={handleChange}
                onFocus={(e) => moveLabelUp(e.target)}
                onBlur={(e) => moveLabelBack(e.target)}
              ></input>
              <label htmlFor="location" className="locationlabel searchlabel">Zipcode/Address</label>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <CustomSelect
            DropdownList={[
              {text:"all categories", value:''},
              {text:"produce", value:'produce'},
              {text:"seed", value: 'seed'},
              {text:"live plant", value: 'live plant'}
            ]}
            ReturnValue ={(value) => handleChange4(value)}/>
          </SwiperSlide>
          <SwiperSlide>
            <div className="minprice">
              <label htmlFor="minprice" className="searchlabel">Min Price</label>
              <input
              className="searchinput"
                type="Number"
                id="minprice"
                name="minprice"
                min="0"
                onChange={handleChange2}
                onFocus={(e) => moveLabelUp(e.target)}
                onBlur={(e) => moveLabelBack(e.target)}
              ></input>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div><span>-</span></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="maxprice">
              <label htmlFor="maxprice" className="searchlabel">Max Price</label>
              <input
              className="searchinput"
                type="Number"
                id="maxprice"
                name="maxprice"
                min="0"
                onChange={handleChange2}
                onFocus={(e) => moveLabelUp(e.target)}
                onBlur={(e) => moveLabelBack(e.target)}
              ></input>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="btn findbtn1">
                <input className="findBtn" type="submit" value="search" />
            </div>
          </SwiperSlide>
        </Swiper>
      </form>
     
      </div>
      <div className="columnIconContainer">
        <div className={`listingsArrangement ${isColumn ? "column" : "row"}`} onClick={toggleColumn}>{ isColumn ? <FaToggleOn />:<LiaToggleOffSolid />}</div>
        </div>
        </div>
        {delayedPosts &&
          delayedPosts.map((post, index) => (
            <div className="HomePosts grow" key={index}>
              <Link key={post._id} to={`/listing/${post._id}`}>
              <div className="images">
                  <img alt={post.tags} src={post.image} />
                </div>
                <div className="HomePostsContent">
                <div className="listingTitle">
                  <h2> {post.title}</h2>
                </div>
                
                <div className="listingText">
                  <p>${post.price} per {post.unit} </p>
                </div>
                <div className="location">
                  <p>Location: {post.location}</p>
                </div>
                </div>
              </Link>
            </div>
          ))}
      </ul>
    </div>
    </div>
  );
};

export default PostList;
