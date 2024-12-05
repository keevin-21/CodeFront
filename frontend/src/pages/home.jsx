import "../assets/css/home.css";
import Banner from "../assets/images/CodeFront-Banner.png";

const Home = () => {
    return (
        <div className="home-page">
            <div className="home-content">
                <div className="home-banner">
                    <img src={Banner} className="img-fluid" alt="Banner" loading="lazy"/>
                </div>
                <h1 className="home-title">¡Welcome!</h1>
                <p className="home-text">Discover what we can offer you</p>
                <div className="home-buttons">
                    <button onClick={() => window.location.href = "/login"} className="btn btn-primary"
                            aria-label="Log In">
                        Log In
                    </button>
                    <button onClick={() => window.location.href = "/register"} className="btn btn-secondary ms-2"
                            aria-label="Sign Up">
                        Sign Up
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Home;