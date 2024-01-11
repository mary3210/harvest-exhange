import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { usePassageUserInfo } from "../hooks/";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    // usePassageUserInfo();
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await fetch(
                    "/user/getUserProfile",
                    {
                        method: "GET",
                        headers: {
                            "content-Type": "application/json",
                            authorization:
                                "Bearer " +
                                localStorage.getItem("psg_auth_token"),
                        },
                    }
                );
                const resp = await response.json();
                if (resp.error) {
                    navigate("/login");
                } else {
                    setUser(resp);
                }
            } catch (err) {
            } finally {
            }
        };

        if (localStorage.getItem("psg_auth_token")) {
            getUserProfile();
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};
