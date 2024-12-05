import "../assets/css/login.css";
import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                alert("Login successful!");
                // Puedes redirigir al usuario a otra página si es necesario
                // window.location.href = "/dashboard";
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="login-page">
            <div className="login-content">
                <h1 className="login-title">Welcome to CodeFront</h1>
                <p className="login-text">Please log in to continue.</p>
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
