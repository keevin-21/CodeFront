import React from 'react';
// import { useSession } from '../contexts/SessionContext';
import { useNavigate } from 'react-router-dom';
import '../assets/css/profile.css'; // Asegúrate de agregar el CSS necesario

const Profile = () => {
    // const { session, logout } = useSession();
    const navigate = useNavigate();
    const handleLogout = () => {
        // logout();
        navigate('/login'); // Redirige al login después de cerrar sesión
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">My Profile</h1>
            <div className="profile-info">
                {/*<p><strong>Username:</strong> {session ? session.username : "Username not available"}</p>*/}
                {/* Temporarily displaying a fixed username */}
                <p className="profile-subtitle"><strong>Username:</strong></p>
                <p className="profile-text">Pamela2001</p>
            </div>
            <div className="logout-button-container">
                <button className="logout-button" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
};

export default Profile;
