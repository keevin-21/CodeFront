import "../assets/css/register.css";
import React, { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que las contraseñas coinciden
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Enviar los datos a la API
        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
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
                alert("User registered successfully!");
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="register-page">
            <div className="register-content">
                <h1 className="register-title">Create Your Account</h1>
                <p className="register-text">Please complete the information to register.</p>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        className="register-input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="register-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        className="register-input"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className="register-button" type="submit">
                        Sign Up
                    </button>
                </form>
                <p className="register-login">
                    Already have an account? <a className="register-link" href="/login">Log in here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;