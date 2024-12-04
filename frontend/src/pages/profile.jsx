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
            <h1 className="profile-title">Mi Perfil</h1>
            <div className="profile-info">
                {/*<p><strong>Nombre de usuario:</strong> {session ? session.username : "Usuario no disponible"}</p>*/}
                {/* Temporariamente mostramos un texto fijo para el nombre de usuario */}
                <p className="profile-subtitle"><strong>Usuario:</strong></p>
                <p className="profile-text">Pamela2001</p>
            </div>
            <div className="logout-button-container">
                <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </div>
    );
};

export default Profile;
