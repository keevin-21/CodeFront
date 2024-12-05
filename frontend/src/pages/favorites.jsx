import React, { useState, useEffect } from "react";
import "../components/modalNew.css";
import "../assets/css/favorites.css";
import ModalArticle from "../components/ModalNew"; // Importa el modal

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Cargar los favoritos desde localStorage cuando el componente se monta
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    // Función para manejar el modal
    const handleShowModal = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedArticle(null);
    };

    // Elimina un artículo de favoritos
    const handleRemoveFavorite = (articleToRemove) => {
        const updatedFavorites = favorites.filter((article) => article.title !== articleToRemove.title);

        // Actualiza los favoritos en el estado y en localStorage
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites-page">
            <div className="favorites-content">
                <h1 className="favorites-title">Your Favorite Articles</h1>
                <div className="favorite-cards">
                    {favorites.length > 0 ? (
                        favorites.map((article) => (
                            <div key={article.title} className="card">
                                <img
                                    src={article.urlToImage || "https://via.placeholder.com/150"}
                                    alt={article.title}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text">{article.description}</p>
                                    <button
                                        className="card-button"
                                        onClick={() => handleShowModal(article)}
                                    >
                                        Open
                                    </button>
                                    <button
                                        className="card-button"
                                        onClick={() => handleRemoveFavorite(article)} // Pasamos el artículo completo para eliminar
                                    >
                                        Remove from Favorites
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No favorites found.</p>
                    )}
                </div>
            </div>
            {/* Modal */}
            {selectedArticle && (
                <ModalArticle
                    show={showModal}
                    handleClose={handleCloseModal}
                    article={selectedArticle}
                />
            )}
        </div>
    );
};

export default Favorites;
