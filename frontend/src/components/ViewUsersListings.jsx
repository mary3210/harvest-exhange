import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "../hooks/UserContext";
import { Link } from "react-router-dom";
import DelQuestBox from "./DelQuestBox";

function ViewUsersListings() {
    const [post, setPost] = useState([]);
    const { user } = useContext(UserContext);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState([])
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        async function getPost() {
            try {
                const response = await fetch(
                    `http://localhost:8000/listing/user/${user._id}`
                );
                const result = await response.json();
                setShowDeleteConfirmation(Array(result.length).fill(false));
                setPost(result);
                console.log(result);
            } catch (err) {
                console.error(err);
            }
        }
       
        console.log(user);
        if (user) {
            getPost();
        }
    }, [user]);

    function handleDeleteClick(postId){
        const index = post.findIndex((p) => p._id === postId);
        const newShowConfirmation = [...showDeleteConfirmation]
        newShowConfirmation[index] = true;
        setShowDeleteConfirmation(newShowConfirmation)
        setSelectedPostId(postId);
        
    }

    async function handleDeleteConfirm(postId) {
        try {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization:
                        "Bearer " + localStorage.getItem("psg_auth_token"),
                },
            };
            await fetch(
                `http://localhost:8000/listing/${postId}`,
                requestOptions
            );
            // After deletion, update the state to re-render the component
            setPost((prevPosts) =>
                prevPosts.filter((post) => post._id !== postId)
            );
            setShowDeleteConfirmation((prevShow) =>
            prevShow.map((show, index) =>
            index === post.findIndex((p) => p._id === postId) ? false : show));
            setSelectedPostId(null);
        } catch (err) {
            console.error(err);
        }
    }
    const handleDeleteCancel = () => {
        // Reset state variables
        setShowDeleteConfirmation(Array(post.length).fill(false));
        setSelectedPostId(null);
      };

    return (
        <div>
            <h1>Here are my listings that I have made</h1>
            <ul>
                {post &&
                    post.map((post, index) => (
                        <div className="HomePosts" key={index}>
                            
                            <div>
                                <h1>{post?.title}</h1>
                                <img src={post?.image} alt={post?.tags} />
                                <p>Location: {post?.location}</p>
                                <p>Price: {post?.price}</p>
                                <p>{post?.text}</p>
                            </div>
                            <Link to="../Listing/EditListing">Edit</Link>
                            <button
                                className="deleteBtn"
                                onClick={()=>handleDeleteClick(post._id)}
                                
                            >
                                delete
                            </button>
                            {showDeleteConfirmation[index] && (
                                <DelQuestBox
                                onConfirm={() => handleDeleteConfirm(post._id)}
                                onCancel={handleDeleteCancel}/>
                            )}
                            
                        </div>
                    ))}
            </ul>
        </div>
    );
}

export default ViewUsersListings;
