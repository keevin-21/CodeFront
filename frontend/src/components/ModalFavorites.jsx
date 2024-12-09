import React from "react";
import { Button, Modal } from "react-bootstrap";
import starIcon from "../assets/icons/star-icon.svg";
import starFillIcon from "../assets/icons/star-fill-icon.svg";

const ModalFavorites = ({ showModal, handleCloseModal, selectedArticle, toggleFavorite, isFavorite }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
            <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title className="custom-modal-title">{selectedArticle.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal-body">
                <img
                    src={selectedArticle.news.urlToImage || "https://via.placeholder.com/150"}
                    className="img-fluid custom-img"
                    alt={selectedArticle.news.title}
                    style={{ marginBottom: "20px" }}
                />
                <p className="custom-modal-content">
                    <strong className="custom-modal-text">Description:</strong> {selectedArticle.news.shortDescription || "No description available."}
                </p>
                <hr />
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
                    src={isFavorite ? starFillIcon : starIcon}
                    alt="Favorite"
                    className="favorite-icon"
                    onClick={toggleFavorite}
                    style={{cursor: "pointer"}}
                />
                <p className="favorite-text">Favorite</p>
                <Button variant="secondary" onClick={handleCloseModal} className="custom-btn">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalFavorites;
