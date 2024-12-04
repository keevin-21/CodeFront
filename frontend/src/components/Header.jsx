import React from "react";
import "./header.css";
import logo from "../assets/images/CodeFront.png";

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <img src={logo} alt="Logo" className="logo" />
            </div>
        </header>
    );
};

export default Header;
