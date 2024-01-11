import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const ListingDetails = (props) => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const BASE_URL = "/";

    const getPost = useCallback(
        async () => {
            try {
                const response = await fetch(BASE_URL + `listing/${id}`);
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
      <h1>Listing Details page</h1>

      {post &&
        post.map((post) => (
          <div>
            <h1>{post?.title}</h1>
            <img src={post?.image} alt={post?.tags} />
            <p>Location: {post?.location}</p>
            <p>Price: {post?.price}</p>
            <p>{post?.text}</p>
          </div>
        ))}
    </div>
  );
};

export default ListingDetails;
