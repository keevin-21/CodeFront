import "../assets/css/register.css";

const Register = () => {
    return (
        <div className="register-page">
            <div className="register-content">
                <h1 className="register-title">Create Your Account</h1>
                <p className="register-text">Please complete the information to register.</p>
                <form className="register-form">
                    <input className="register-input" type="text" placeholder="Username" required />
                    <input className="register-input" type="password" placeholder="Password" required />
                    <input className="register-input" type="password" placeholder="Confirm Password" required />
                    <button className="register-button" type="submit">Sign Up</button>
                </form>
                <p className="register-login">
                    Already have an account? <a className="register-link" href="/login">Log in here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
