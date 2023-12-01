import React from "react";
import { Routes, Route } from "react-router-dom";
import { PassageProvider } from "@passageidentity/passage-react";
import Home from "./views/Home"
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Listing from "./views/Listing";
import EditListing from "./views/EditListing";
import CreateListing from "./views/CreateListing";
import Navbar from "./components/Navbar";
import ViewUsersListings from "./components/ViewUsersListings";
import { UserProvider } from "./hooks/UserContext";
import { GlobalProvider } from "./hooks/GlobalContext";

function App() {
    return (
        <GlobalProvider>
            <PassageProvider appId={process.env.REACT_APP_PASSAGE_APP_ID}>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/listing/:id" element={<Listing/>}></Route>
                    <Route path="/listing/CreateListing" element={<UserProvider><CreateListing/></UserProvider>}></Route>
                    <Route path="/listing/EditListing/:id" element={<UserProvider><EditListing/></UserProvider>}></Route>
                    <Route path="/listing/viewmylisting" element={<UserProvider><ViewUsersListings/></UserProvider>}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/logout" element={<Dashboard />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </Routes>
            </PassageProvider>
        </GlobalProvider>
    );
}
 
export default App;
