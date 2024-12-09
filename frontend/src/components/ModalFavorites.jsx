import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import starIcon from "../assets/icons/star-icon.svg";
import starFillIcon from "../assets/icons/star-fill-icon.svg";

const ModalFavorites = ({ showModal, handleCloseModal, selectedArticle, toggleFavorite, isFavorite }) => {
    const [localFavorite, setLocalFavorite] = useState(isFavorite);

    const handleToggleFavorite = () => {
        setLocalFavorite(!localFavorite);
        toggleFavorite();
    };

    const handleClose = () => {
        window.location.reload();  // Reload the page
        handleCloseModal();  // Close the modal
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
            <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title className="custom-modal-title">{selectedArticle.news.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal-body">
                <img
                    src={selectedArticle.news.urlToImage || "https://via.placeholder.com/150"}
                    className="img-fluid custom-img"
                    alt={selectedArticle.news.title}
                    style={{ marginBottom: "20px" }}
                />
                <p className="custom-modal-content">
                    <strong className="custom-modal-text">Author:</strong> {selectedArticle.news.author || "Unknown author"}
                </p>
                <p className="custom-modal-content">
                    <strong className="custom-modal-text">Published on:</strong> {new Date(selectedArticle.news.publishedAt).toLocaleString()}
                </p>
                <hr />
                <p className="custom-modal-content">
                    <strong className="custom-modal-text">Content:</strong> {selectedArticle.news.content || "No content available."}
                </p>
                <hr />
                <p>
                    <strong className="custom-modal-link">Link: </strong>
                    <a href={selectedArticle.news.url} target="_blank" rel="noopener noreferrer" className="link">
                        Read full article
                    </a>
                </p>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <img
                    src={localFavorite ? starIcon : starFillIcon}
                    alt="Favorite"
                    className="favorite-icon"
                    onClick={handleToggleFavorite}
                    style={{cursor: "pointer"}}
                />
                <p className="favorite-text">Not favorite</p>
                <Button variant="secondary" onClick={handleClose} className="custom-btn">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalFavorites;
