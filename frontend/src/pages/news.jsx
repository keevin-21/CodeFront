import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/news.css";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import ModalArticle from "../components/ModalNew";

const News = () => {
    const [news, setNews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [processingMessage, setProcessingMessage] = useState("");

    // Fetch the news from the backend
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("http://localhost:8080/news/home"); // URL del backend
                const newsData = response.data.map((article) => ({
                    // Asignación de los datos obtenidos del backend al formato requerido
                    urlToImage: article.urlToImage || "https://via.placeholder.com/150", // Imagen predeterminada si no hay imagen
                    title: article.title,
                    description: article.shortDescription,
                    author: article.author,
                    url: article.url,
                    publishedAt: article.datePublished,
                    content: article.content || "", // Agregar contenido si existe
                }));
                setNews(newsData);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    // Handle modal open/close
    const handleShowModal = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedArticle(null);
    };

    // Handle processing news and updating the displayed articles
    const handleProcessNews = async () => {
        try {
            setProcessingMessage("Procesando noticias...");

            // Llamar al backend para iniciar el procesamiento de noticias con el término de búsqueda
            const response = await axios.get("http://localhost:8080/news/process", {
                params: { searchQuery }, // Enviar el término de búsqueda como parámetro
            });
            setProcessingMessage(response.data); // Mostrar el mensaje del backend

            // Llamar nuevamente al backend para obtener las noticias basadas en el término de búsqueda
            const newsResponse = await axios.get("http://localhost:8080/news/home", {
                params: { searchQuery }, // Enviar el término de búsqueda como parámetro
            });
            const newsData = newsResponse.data.map((article) => ({
                urlToImage: article.urlToImage || "https://via.placeholder.com/150",
                title: article.title,
                description: article.shortDescription,
                author: article.author,
                url: article.url,
                publishedAt: article.datePublished,
                content: article.content || "",
            }));
            setNews(newsData); // Actualizar los artículos mostrados
        } catch (error) {
            setProcessingMessage("Error al procesar noticias: " + error.message);
        }
    };


    return (
        <div className="news-page">
            <div className="news-header">
                <h1 className="news-title">News</h1>
                <div className="news-search">
                    <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleProcessNews(); }}>
                        <Form.Control
                            type="text"
                            placeholder="Enter search query..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant="primary" type="submit">
                            Search News
                        </Button>
                    </Form>
                </div>
                {processingMessage && <p className="processing-message">{processingMessage}</p>}
            </div>
            <div className="news-content">
                <div className="news-cards">
                    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                        {news.map((article, index) => (
                            <Col key={index}>
                                <Card className="card">
                                    <Card.Img
                                        variant="top"
                                        src={article.urlToImage}
                                        alt={article.title}
                                        style={{ height: "150px", objectFit: "cover" }}
                                    />
                                    <Card.Body className="card-body d-flex flex-column">
                                        <Card.Title className="card-title">{article.title}</Card.Title>
                                        <Card.Text className="card-text">
                                            {article.description}
                                        </Card.Text>
                                        <Button variant="primary" className="card-button" onClick={() => handleShowModal(article)}>
                                            Open
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
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

export default News;
