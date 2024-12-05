import React, { useState, useEffect } from "react";
import "../assets/css/home.css";
import Banner from "../assets/images/CodeFront-Banner.png";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Verificar si el usuario ha iniciado sesión
        const user = localStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    if (isLoggedIn) {
        // Si el usuario está logueado, puedes redirigirlo a otra página o mostrar el contenido correspondiente
        window.location.href = "/news"; // Por ejemplo, redirige a la página de noticias si está logueado
    }

    return (
        <div className="home-page">
            <div className="home-content">
                <div className="home-banner">
                    <img src={Banner} className="img-fluid" alt="Banner" loading="lazy" />
                </div>
                <h1 className="home-title">¡Welcome!</h1>
                <p className="home-text">Discover what we can offer you</p>
                <div className="home-buttons">
                    <button onClick={() => window.location.href = "/login"} className="btn btn-primary" aria-label="Log In">
                        Log In
                    </button>
                    <button onClick={() => window.location.href = "/register"} className="btn btn-secondary ms-2" aria-label="Sign Up">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
