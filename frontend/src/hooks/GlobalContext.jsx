import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
    const [loggedin, setLoggedin] = useState(false);

    const updateLoggedin = (status) => {
        if (status === false || status === true) {
            setLoggedin(status);
        } else if (localStorage.getItem("psg_auth_token")) {
            setLoggedin(true);
        } else {
            setLoggedin(false);
        }
    }

    useEffect(() => {
        updateLoggedin();
    }, [])

    return (
        <GlobalContext.Provider value={{loggedin, updateLoggedin}}>
            {children}
        </GlobalContext.Provider>
    );
};
