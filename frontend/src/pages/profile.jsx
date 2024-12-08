import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import "../assets/css/profile.css";

const Profile = () => {
    const [favoriteNews, setFavoriteNews] = useState([]);
    const navigate = useNavigate();
    const { session, logout } = useSession();

    // Redirigir al login si no hay una sesión activa
    useEffect(() => {
        if (!session) {
            navigate("/login");
        } else {
            // Cargar noticias favoritas del usuario desde el localStorage
            const storedFavorites = JSON.parse(localStorage.getItem("favoriteNews") || "[]");
            setFavoriteNews(storedFavorites); // Establece las noticias favoritas en el estado
        }
    }, [session, navigate]);

    const handleLogout = () => {
        logout(); // Cierra la sesión en el contexto
        localStorage.clear(); // Limpia el localStorage
        navigate("/login"); // Redirige al login
    };
    const handleFavoriteToggle = (news) => {
        let updatedFavorites = [...favoriteNews];
        const index = updatedFavorites.findIndex((n) => n.id === news.id);
        if (index === -1) {
            updatedFavorites.push(news); // Añadir como favorito
        } else {
            updatedFavorites.splice(index, 1); // Eliminar de favoritos
        }
        setFavoriteNews(updatedFavorites);
        localStorage.setItem("favoriteNews", JSON.stringify(updatedFavorites)); // Guardar en localStorage
    };

    if (!session) {
        // Puedes mostrar un mensaje de "Cargando..." mientras se redirige
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-page">
            <div className="profile-content">
                <h1 className="profile-title">Welcome, {session.userName}!</h1>
                <div className="profile-info">
                    <p className="profile-subtitle">
                        <strong>To CodeFront: A Tech News Web.</strong>
                    </p>
                </div>
                <div className="logout-button-container">
                    <button className="logout-button" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

/*
<div className="favorite-news-container">
    <h2>Favorite News</h2>
    {favoriteNews.length === 0 ? (
        <p>No favorite news yet.</p>
    ) : (
        <ul>
            {favoriteNews.map((news) => (
                <li key={news.id}>
                    <p>{news.title}</p>
                    <button onClick={() => handleFavoriteToggle(news)}>Remove from favorites</button>
                </li>
            ))}
        </ul>
    )}
</div>
*/