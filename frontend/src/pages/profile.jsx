import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import "../assets/css/profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useSession();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const handleLogout = () => {
        logout();
        localStorage.clear();
        navigate("/login");
    };

    if (!currentUser) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-page">
            <div className="profile-content">
                <div className="profile-rect">
                    <h1 className="profile-title">Welcome, {currentUser.userName}!</h1>
                    <div className="profile-info">
                        <p className="profile-subtitle">
                            <strong>To CodeFront: A Tech News Web.</strong>
                        </p>
                    </div>
                    <div className="gif-container">
                        <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnM2djNzdTI3bzRxZHY5aXF3NXF1cjlsbmt0czg2d2d3eGpvaHM0ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kqGxPBPUYSW8PVH9F0/giphy.gif" alt="Animated GIF"
                             className="profile-gif"/>
                    </div>
                    <div className="logout-button-container">
                        <button className="logout-button" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
