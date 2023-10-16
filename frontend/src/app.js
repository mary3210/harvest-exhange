import React from "react";
import { Routes, Route } from "react-router-dom";
import { PassageProvider } from "@passageidentity/passage-react";

import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Chat from "./views/Chat";
import Banner from "./components/banner";
import Browse from "./views/Browse";
import styles from "./styles/App.module.css";

function App() {
  return (
    <PassageProvider appId={process.env.REACT_APP_PASSAGE_APP_ID}>
      <div>
        <Banner />
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/browse" element={<Browse />}></Route>
          </Routes>
        </div>
      </div>
    </PassageProvider>
  );
}

export default App;
