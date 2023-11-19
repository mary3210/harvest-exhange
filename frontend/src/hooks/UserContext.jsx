import { createContext, useState, useEffect } from "react";
// import { usePassageUserInfo } from "../hooks/";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // usePassageUserInfo();
    const [user, setUser] = useState();

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:8000/user/getUserProfile", {
                    method: "GET",
                    headers: {
                        "content-Type": "application/json",
                        authorization: "Bearer " + localStorage.getItem("psg_auth_token")
                    }
                });
                const userinfo = await response.json();
                setUser(userinfo);
            } catch (err) {
        
            }
        }
        
        getUserProfile();
    }, []);
    
    return (
        <UserContext.Provider
            value={{user}}
        >
            {children}
        </UserContext.Provider>
    );
};
