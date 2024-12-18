import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [favoriteNews, setFavoriteNews] = useState([]);
    const navigate = useNavigate();

    // Cargar datos del usuario desde localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Establece el usuario en el estado
        } else {
            navigate("/login"); // Redirige al login si no hay usuario en el localStorage
        }

        // Cargar noticias favoritas del usuario
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteNews") || "[]");
        setFavoriteNews(storedFavorites); // Establece las noticias favoritas en el estado
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Elimina al usuario de localStorage
        navigate('/login'); // Redirige al login después de cerrar sesión
    };

    const handleFavoriteToggle = (news) => {
        let updatedFavorites = [...favoriteNews];
        const index = updatedFavorites.findIndex(n => n.id === news.id);
        if (index === -1) {
            updatedFavorites.push(news); // Añadir como favorito
        } else {
            updatedFavorites.splice(index, 1); // Eliminar de favoritos
        }
        setFavoriteNews(updatedFavorites);
        localStorage.setItem("favoriteNews", JSON.stringify(updatedFavorites)); // Guardar en localStorage
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-title">Welcome, {user.userName}!</h1>  {/* Muestra el nombre del usuario */}
            <div className="profile-info">
                <p className="profile-subtitle"><strong>To CodeFront: A Tech News Web.</strong></p>
            </div>
            <div className="favorite-news-container">
                <h2>Favorite News</h2>
                {favoriteNews.length === 0 ? (
                    <p>No favorite news yet.</p>
                ) : (
                    <ul>
                        {favoriteNews.map((news) => (
                            <li key={news.id}>
                                <p>{news.title}</p>
                                <button onClick={() => handleFavoriteToggle(news)}>
                                    Remove from favorites
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="logout-button-container">
                <button className="logout-button" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
};

export default Profile;