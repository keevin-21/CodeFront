import React, { useState, useEffect } from "react";
import "../assets/css/favorites.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSession } from "../contexts/SessionContext";
import ModalFavorites from "../components/ModalFavorites";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const { currentUser } = useSession();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://localhost:8080/favorites/${currentUser.userId}`);
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        fetchFavorites();
    }, [currentUser]);

    const handleShowModal = (article) => {
        setSelectedArticle(article);
        setIsFavorite(article.isFavorite); // Inicializa si es favorito
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedArticle(null);
    };
    const toggleFavorite = async () => {
        if (!currentUser || !currentUser.userId) {
            alert("You need to log in to add or remove favorites.");
            return;
        }

        const isAlreadyFavorite = favorites.some(fav => fav.news.url === selectedArticle.news.url);

        try {
            if (isAlreadyFavorite) {
                // Eliminar el favorito
                console.log('Attempting to remove favorite for userId:', currentUser.userId, 'and newsUrl:', selectedArticle.news.url); // Log para depurar
                const response = await fetch('http://localhost:8080/favorites/remove', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: currentUser.userId,
                        newsUrl: selectedArticle.news.url,  // Asegúrate de que newsUrl sea correcto
                    }),
                });

                if (response.ok) {
                    setIsFavorite(false);  // Actualizar el estado para reflejar que ya no es un favorito
                    console.log('Favorite removed successfully!'); // Log para confirmar
                } else {
                    const error = await response.text();
                    console.error('Error removing favorite:', error); // Log para errores
                }
            } else {
                // Agregar el favorito
                console.log('Adding favorite for userId:', currentUser.userId, 'and newsUrl:', selectedArticle.news.url); // Log para depurar
                const response = await fetch('http://localhost:8080/favorites/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: currentUser.userId,
                        title: selectedArticle.news.title,
                        shortDescription: selectedArticle.news.shortDescription,
                        author: selectedArticle.news.author,
                        source: selectedArticle.news.source,
                        url: selectedArticle.news.url,
                        urlToImage: selectedArticle.news.urlToImage,
                        publishedAt: selectedArticle.news.publishedAt,
                        content: selectedArticle.news.content,
                    }),
                });

                if (response.ok) {
                    setIsFavorite(true);  // Actualizar el estado para reflejar que ahora es un favorito
                    console.log('Favorite added!'); // Log para confirmar
                } else {
                    const error = await response.text();
                    console.error('Error adding favorite:', error); // Log para errores
                }
            }
        } catch (error) {
            console.error('Error managing favorite:', error); // Log para errores
        }
    };

    return (
        <div className="favorites-page">
            <div className="favorites-content">
                <h1 className="favorites-title">Favorites</h1>
                <div className="favorite-cards">
                    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                        {favorites.length > 0 ? (
                            favorites.map((article, index) => (
                                <Col key={index}>
                                    <Card className="card">
                                        <Card.Img
                                            variant="top"
                                            src={article.news.urlToImage || "https://via.placeholder.com/150"}
                                            alt={article.news.title}
                                            style={{ height: "150px", objectFit: "cover" }}
                                        />
                                        <Card.Body className="card-body d-flex flex-column">
                                            <Card.Title className="card-title">{article.news.title}</Card.Title>
                                            <Card.Text className="card-text">
                                                {article.news.shortDescription || article.news.content || "No description available."}
                                            </Card.Text>
                                            <Button variant="primary" className="card-button" onClick={() => handleShowModal(article)}>
                                                Open
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p className="favorites-notfound">No favorites found.</p>
                        )}
                    </Row>
                </div>
            </div>

            {selectedArticle && (
                <ModalFavorites
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    selectedArticle={selectedArticle}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                />
            )}
        </div>
    );
};

export default Favorites;