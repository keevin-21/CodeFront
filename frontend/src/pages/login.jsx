import "../assets/css/login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Declarar navigate
    const { login } = useSession(); // Extraer login del contexto de sesión
    const [errorMessage, setErrorMessage] = useState(""); // Para manejar mensajes de error

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            if (response.ok) {
                const data = await response.json();

                // Guarda la sesión en el contexto
                login({
                    userName: data.userName, // Información del usuario
                    userId: data.userId,     // ID del usuario
                });

                alert("LOGIN SUCCESSFUL"); // Mensaje de éxito
                navigate("/profile"); // Redirige al perfil
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Login failed.");
            }
        } catch (error) {
            setErrorMessage("An error occurred: ${error.message}");
        }
    };

    return (
        <div className="login-page">
            <div className="login-content">
                <h1 className="login-title">Welcome to CodeFront</h1>
                <p className="login-text">Please log in to continue.</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">Log In</button>
                </form>
                {errorMessage && <p className="login-error">{errorMessage}</p>}
                <p className="login-register">
                    Don't have an account?{" "}
                    <a href="/register" className="login-link">Sign up here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;