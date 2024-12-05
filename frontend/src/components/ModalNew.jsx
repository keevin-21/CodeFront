import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../components/modalNew.css";

// Rutas de los íconos
import starIcon from "../assets/icons/star-icon.svg";
import starFillIcon from "../assets/icons/star-fill-icon.svg";

const ModalNew = ({ show, handleClose, article, handleFavorite }) => {
    const [isFavorite, setIsFavorite] = useState(article.isFavorite || false); // Inicializa con el estado pasado

    // Función para actualizar el estado de favoritos en localStorage
    const updateFavoriteStatus = (article, status) => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (status) {
            // Agregar al localStorage
            savedFavorites.push(article);
        } else {
            // Eliminar del localStorage
            const updatedFavorites = savedFavorites.filter((fav) => fav.id !== article.id);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        }
        localStorage.setItem("favorites", JSON.stringify(savedFavorites));
        return savedFavorites;
    };

    const toggleFavorite = () => {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);
        handleFavorite(article, newFavoriteStatus); // Llamada para actualizar el estado global o persistente

        // Actualizar el estado local de favoritos en localStorage
        updateFavoriteStatus(article, newFavoriteStatus);
    };

    return (
        <Modal show={show} onHide={handleClose} className="custom-modal">
            <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title className="custom-modal-title">{article.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal-body">
                <img
                    src={article.urlToImage}
                    className="img-fluid custom-img"
                    alt={article.title}
                    style={{ marginBottom: "20px" }}
                />
                <p className="custom-modal-content"><strong className="custom-modal-text">Description:</strong> {article.description}</p>
                <hr />
                <p className="custom-modal-content"><strong className="custom-modal-text">Author:</strong> {article.author}</p>
                <p className="custom-modal-content"><strong className="custom-modal-text">Published on:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
                <hr />
                <p className="custom-modal-content"><strong className="custom-modal-text">Content:</strong> {article.content}</p>
                <hr />
                <p><strong className="custom-modal-link">Link: </strong><a href={article.url} target="_blank" rel="noopener noreferrer" className="link">
                    Read full article
                </a></p>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <img
                    src={isFavorite ? starFillIcon : starIcon}
                    alt="Favorite"
                    className="favorite-icon"
                    onClick={toggleFavorite}
                    style={{ cursor: "pointer" }}
                />
                <p className="favorite-text">Favorite</p>
                <Button variant="secondary" onClick={handleClose} className="custom-btn">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalNew;
