import "../assets/css/home.css";
import Banner from "../assets/images/CodeFront-Banner.png";
import {Navigate} from "react-router-dom";
import {useSession} from "../contexts/SessionContext";

const Home = () => {
    const { currentUser } = useSession();

    if (currentUser) {
        return <Navigate to="/news" replace />;
    }
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
                <h1 className="footer-title">About us</h1>
                <footer className="home-footer">
                    <div className="footer-content container">
                        <div className="row">
                            <div className="col-md-4">
                                <h5>Roles</h5>
                                <ul>
                                    <li><strong>◆ Frontend/UX:</strong> Teresa Rivas Gomez</li>
                                    <li><strong>◆ Backend/API:</strong> Andrea Rivas Gomez</li>
                                    <li><strong>◆ Data Base:</strong> Kevin Alejandro Gonzalez</li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h5>Subject</h5>
                                <p>Java Programming Workshop</p>
                                <p><strong>◆ Teacher:</strong> Sergio Omar Infante Prieto</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Origin</h5>
                                <p>Universidad Autónoma de Baja California</p>
                                <p><strong>◆ Location:</strong> Ensenada, B.C. Campus Punta Morro</p>
                                <p><strong>◆ Career:</strong> Ingeniero en Software y Tecnologías Emergentes</p>
                                <p><strong>◆ Group:</strong> 5to Semestre Grupo 932</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Home;