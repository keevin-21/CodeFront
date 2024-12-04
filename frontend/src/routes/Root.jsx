import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "../assets/css/App.css";
import "../assets/css/Colors.css";
import "../assets/css/Fonts.css";

const Root = () => {
    return (
        <div>
            <div className="main-container">
                <Sidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Root;
