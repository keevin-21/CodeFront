import "../assets/css/login.css";

const Login = () => {
    return (
        <div className="login-page">
            <div className="login-content">
                <h1 className="login-title">Bienvenido a CodeFront</h1>
                <p className="login-text">Por favor, inicia sesión para continuar.</p>
                <form className="login-form">
                    <input type="text" placeholder="Usuario" className="login-input" required />
                    <input type="password" placeholder="Contraseña" className="login-input" required />
                    <button type="submit" className="login-button">Iniciar Sesión</button>
                </form>
                <p className="login-register">
                    ¿No tienes cuenta? <a href="/register" className="login-link">Regístrate aquí</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
