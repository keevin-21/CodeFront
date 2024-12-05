import React from "react";
import { Link } from "react-router-dom";
import "../components/sidebar.css"
import CodeFront from "../assets/images/CodeFront_Full.png"
import homeIcon from "../assets/icons/home-icon.svg";
import favoritesIcon from "../assets/icons/star-icon.svg";
import profileIcon from "../assets/icons/profile-icon.svg";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav className="nav flex-column">
                <div className="nav-logo">
                    <img src={CodeFront} alt="Logo" className="Logo"/>
                </div>
                <Link to="/" className="nav-link">
                    <img src={homeIcon} alt="Inicio" className="icon"/>
                    Home
                </Link>
                <Link to="/favorites" className="nav-link">
                    <img src={favoritesIcon} alt="Favoritos" className="icon"/>
                    Favorites
                </Link>
                <Link to="/profile" className="nav-link">
                    <img src={profileIcon} alt="Perfil" className="icon"/>
                    Profile
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;