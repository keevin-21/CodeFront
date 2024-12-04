import "../assets/css/login.css";

const Login = () => {
    return (
        <div className="login-page">
            <div className="login-content">
                <h1 className="login-title">Welcome to CodeFront</h1>
                <p className="login-text">Please log in to continue.</p>
                <form className="login-form">
                    <input type="text" placeholder="Username" className="login-input" required />
                    <input type="password" placeholder="Password" className="login-input" required />
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
