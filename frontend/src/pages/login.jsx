import "../assets/css/login.css";
import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                alert("Login successful!");
                // Redireccionar a la página principal o dashboard
                window.location.href = "/dashboard";
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
                <p className="login-register">
                    Don't have an account? <a href="/register" className="login-link">Sign up here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
