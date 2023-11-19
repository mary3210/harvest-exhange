import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "../hooks/UserContext";
import { Link } from "react-router-dom";
function ViewUsersListings() {
    const [post, setPost] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
      

        async function getPost() {
            try {
                const response = await fetch(
                    `http://localhost:8000/listing/user/${user._id}`
                );
                const result = await response.json();
                setPost(result);
                console.log(result);
            } catch (err) {
                console.error(err);
            }
        }

        console.log(user)
        if (user) {
            getPost();
        }

    }, [user]);

    async function remove(postId){ 
        try {
          
    
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("psg_auth_token")
                },
            }
            await fetch(`http://localhost:8000/listing/${postId}`, requestOptions)
             // After deletion, update the state to re-render the component
            setPost((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } catch (err) {
            console.error(err);
        }
      }

    return (
        <div>
            <h1>Here are my listings that I have made</h1>
            <ul>
                {post &&
                    post.map((post, index) => (
                        <div className="HomePosts" key={index}>
                            {/* <Link key={post._id} to={`/listing/${post._id}`}> */}
                                <div>
                                    <h1>{post?.title}</h1>
                                    <img src={post?.image} alt={post?.tags} />
                                    <p>Location: {post?.location}</p>
                                    <p>Price: {post?.price}</p>
                                    <p>{post?.text}</p>
                                </div>
                                <Link to="../Listing/EditListing">
                                    Edit</Link>
                                <button className="deleteBtn" onClick={()=> remove(post._id)}>delete</button>
                            {/* </Link> */}
                        </div>
                    ))}
            </ul>
        </div>
    );
}

export default ViewUsersListings;
