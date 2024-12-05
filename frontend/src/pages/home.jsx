import "../assets/css/home.css";
import React, { useState, useEffect } from "react";
import Banner from "../assets/images/CodeFront-Banner.png";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [news, setNews] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Verificar si el usuario ha iniciado sesión
        const user = localStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
            // Si está logueado, obtener noticias destacadas
            fetchNews();
            fetchFavorites();
        }
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/news/highlighted"); // Consulta a la API para obtener noticias destacadas
            if (response.ok) {
                const data = await response.json();
                setNews(data); // Guardar noticias en el estado
            } else {
                console.error("Error fetching news");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteNews") || "[]");
        setFavorites(storedFavorites);
    };

    const handleFavoriteToggle = (newsItem) => {
        let updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex(n => n.id === newsItem.id);
        if (index === -1) {
            updatedFavorites.push(newsItem); // Añadir como favorito
        } else {
            updatedFavorites.splice(index, 1); // Eliminar de favoritos
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favoriteNews", JSON.stringify(updatedFavorites)); // Guardar en localStorage
    };

    return (
        <div className="home-page">
            <div className="home-content">
                <div className="home-banner">
                    <img src={Banner} className="img-fluid" alt="Banner" />
                </div>
                <h1 className="home-title">¡Welcome!</h1>
                <p className="home-text">Discover what we can offer you</p>

                {isLoggedIn ? (
                    <div>
                        <h2>Featured News</h2>
                        <div className="news-list">
                            {news.length > 0 ? (
                                news.map((newsItem) => (
                                    <div key={newsItem.id} className="news-item">
                                        <h3>{newsItem.title}</h3>
                                        <p>{newsItem.description}</p>
                                        <button
                                            onClick={() => handleFavoriteToggle(newsItem)}
                                            className="btn btn-primary"
                                        >
                                            {favorites.find(n => n.id === newsItem.id) ? "Remove from Favorites" : "Add to Favorites"}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>Loading featured news...</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="home-buttons">
                        <button onClick={() => window.location.href = "/login"} className="btn btn-primary">
                            Log In
                        </button>
                        <button onClick={() => window.location.href = "/register"} className="btn btn-secondary ms-2">
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
