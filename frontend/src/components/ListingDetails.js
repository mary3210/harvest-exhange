import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import myStyles from "../styles/ListingDetails.css";

const ListingDetails = (props) => {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    const getPost = useCallback(
        async () => {
            try {
                const response = await fetch(process.env.REACT_APP_LOCAL_URL + `/listing/${id}`);
                const result = await response.json();
                console.log(result);
                console.log(id);
                setPost([result]);
            } catch (err) {
                console.error(err);
            }
        }, [id]
    )
    
    useEffect(() => {
        getPost();
    }, [getPost]);

  return (
    <div className="showpage">
      

      {post &&
        post.map((post) => (
          <div className="listingDetailsPage">
            <div className="listingDetailImage">
            <img src={post?.image} alt={post?.tags} />
            </div>
            <div className="listingDetailInfo">
            <h1>{post?.title}</h1>
            <p>Location: {post?.location}</p>
            <p>${post?.price} per {post?.unit}</p>
            <p><b>Plant/Produce/Seed:</b> {post?.category} </p>
            <h2>Description</h2>
            <p>{post?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListingDetails;
