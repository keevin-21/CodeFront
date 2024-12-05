import "../assets/css/login.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");  // Estado para el mensaje de error
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reseteamos cualquier mensaje de error antes de intentar el login
        setErrorMessage("");

        // Enviar los datos a la API de login
        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_name: username,
                    user_password: password,
                }),
            });

            // Verificar la respuesta del servidor
            if (response.ok) {
                const data = await response.json();
                // Asegúrate de que `data` tenga la estructura esperada y contenga el nombre de usuario
                localStorage.setItem("user", JSON.stringify(data)); // Guardamos los datos del usuario en el localStorage
                alert("Login successful!");
                navigate("/profile"); // Redirige al perfil del usuario
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message); // Muestra el mensaje de error si las credenciales son incorrectas
            }
        } catch (error) {
            setErrorMessage(`An error occurred: ${error.message}`); // Si ocurre un error en la solicitud, lo mostramos aquí
        }
    };


    return (
        <div className="login-page">
            <div className="login-content">
                <h1 className="login-title">Welcome to CodeFront</h1>
                <p className="login-text">Please log in to continue.</p>

                {/* Mostrar el mensaje de error si existe */}
                {errorMessage && <p className="login-error">{errorMessage}</p>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="login-button" type="submit">
                        Log In
                    </button>
                </form>

                <p className="login-register">
                    Don't have an account? <a href="/register" className="login-link">Sign up here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
