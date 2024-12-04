import "../assets/css/register.css";

const Register = () => {
    return (
        <div className="register-page">
            <div className="register-content">
                <h1 className="register-title">Crea tu cuenta</h1>
                <p className="register-text">Por favor, completa la información para registrarte.</p>
                <form className="register-form">
                    <input className="register-input" type="text" placeholder="Usuario" required />
                    <input className="register-input" type="password" placeholder="Contraseña" required />
                    <input className="register-input" type="password" placeholder="Confirmar contraseña" required />
                    <button className="register-button" type="submit">Registrarme</button>
                </form>
                <p className="register-login">
                    ¿Ya tienes una cuenta? <a className="register-link" href="/login">Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
