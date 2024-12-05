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

    // Maneja el cambio de estado de favorito
    const handleFavorite = (article, isFavorite) => {
        const updatedFavorites = isFavorite
            ? [...favorites, article] // Si se marca como favorito, se agrega
            : favorites.filter((item) => item.id !== article.id); // Si se elimina, se filtra

        // Actualiza los favoritos en el estado y en localStorage
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    // Elimina un artículo de favoritos
    const handleRemoveFavorite = (id) => {
        // Filtra el artículo específico por ID para eliminarlo sin afectar los demás
        const updatedFavorites = favorites.filter((article) => article.id !== id);

        // Actualiza el estado y guarda los cambios en localStorage
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
                            <div key={article.id} className="card">
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
                                        onClick={() => handleRemoveFavorite(article.id)} // Aseguramos que solo se elimine el artículo con este id
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
                    handleFavorite={handleFavorite}
                />
            )}
        </div>
    );
};

export default Favorites;
