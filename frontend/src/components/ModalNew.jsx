import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../components/modalNew.css";
import { useSession } from "../contexts/SessionContext";
import starIcon from "../assets/icons/star-icon.svg";
import starFillIcon from "../assets/icons/star-fill-icon.svg";

const ModalNew = ({ show, handleClose, article }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { currentUser } = useSession();

    const toggleFavorite = async () => {
        if (!currentUser || !currentUser.userId) {
            console.error("User not logged in or userId is undefined.");
            alert("You need to log in to add favorites.");
            return;
        }

        setIsFavorite(!isFavorite);

        try {
            const response = await fetch('http://localhost:8080/favorites/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUser.userId,
                    title: article.title,
                    shortDescription: article.shortDescription,
                    author: article.author,
                    source: article.source,
                    url: article.url,
                    urlToImage: article.urlToImage,
                    publishedAt: article.publishedAt,
                    content: article.content,
                }),
            });

            if (response.ok) {
                console.log('Favorite added!');
            } else {
                const error = await response.text();
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };


    if (!currentUser) {
        return <div>Please log in to manage favorites.</div>;
    }

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
