import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/news.css";
import { Card, Button, Row, Col, Modal, Form, Dropdown } from "react-bootstrap";
import ModalArticle from "../components/ModalNew";

const News = () => {
    const [news, setNews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDateFilter, setSelectedDateFilter] = useState("ANY DATE");
    const [selectedTrendingTopic, setSelectedTrendingTopic] = useState("");
    const [processingMessage, setProcessingMessage] = useState("");

    // Fetch the news from the backend
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("http://localhost:8080/news/home"); // URL del backend
                const newsData = response.data.map((article) => ({
                    urlToImage: article.urlToImage || "https://via.placeholder.com/150",
                    title: article.title,
                    description: article.shortDescription,
                    author: article.author,
                    url: article.url,
                    publishedAt: article.publishedAt,
                    content: article.content || "",
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
    const handleProcessNews = async (query) => {
        try {
            setProcessingMessage("Looking for news...");

            // Llamar al backend para iniciar el procesamiento de noticias con el término de búsqueda
            const response = await axios.get("http://localhost:8080/news/process", {
                params: { searchQuery: query }, // Enviar el término de búsqueda como parámetro
            });
            setProcessingMessage(response.data); // Mostrar el mensaje del backend

            // Llamar nuevamente al backend para obtener las noticias basadas en el término de búsqueda
            const newsResponse = await axios.get("http://localhost:8080/news/home", {
                params: { searchQuery: query }, // Enviar el término de búsqueda como parámetro
            });
            const newsData = newsResponse.data.map((article) => ({
                urlToImage: article.urlToImage || "https://via.placeholder.com/150",
                title: article.title,
                description: article.shortDescription,
                author: article.author,
                url: article.url,
                publishedAt: article.publishedAt,
                content: article.content || "",
            }));
            setNews(newsData); // Actualizar los artículos mostrados
        } catch (error) {
            setProcessingMessage("Error processing news about: " + error.message);
        }
    };

    // Handle Date Filter change
    const handleDateFilterChange = (dateFilter) => {
        setSelectedDateFilter(dateFilter);
        const query = `${searchQuery} ${dateFilter}`;
        handleProcessNews(query);
    };

    // Handle Trending Topic change
    const handleTrendingTopicChange = (topic) => {
        setSelectedTrendingTopic(topic);
        const query = `${searchQuery} ${topic}`;
        handleProcessNews(query); // Realiza la búsqueda con el nuevo tema de tendencia
    };

    return (
        <div className="news-page">
            <div className="news-content">
                <h1 className="news-title">News</h1>
                <div className="news-search">
                    <div className="news-topics">
                        <h3 className="news-topics-title">Trending topics:</h3>
                        <div className="trending-topics">
                            <Button onClick={() => handleTrendingTopicChange("Elon Musk")}>Elon Musk</Button>
                            <Button onClick={() => handleTrendingTopicChange("AI")}>AI</Button>
                            <Button onClick={() => handleTrendingTopicChange("SpaceX")}>SpaceX</Button>
                            <Button onClick={() => handleTrendingTopicChange("Java")}>Java</Button>
                            <Button onClick={() => handleTrendingTopicChange("Coding")}>Coding</Button>
                        </div>
                    </div>
                    <div className="news-input">
                        <Form
                            className="news-input-search"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleProcessNews(searchQuery);
                            }}
                        >
                            <Form.Control
                                type="text"
                                placeholder="Enter search query..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleProcessNews(searchQuery);
                                    }
                                }}
                            />
                        </Form>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Filter by Date: {selectedDateFilter}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleDateFilterChange("ANY DATE")}>ANY DATE</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("TODAY")}>TODAY</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("WEEK")}>THIS WEEK</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("MONTH")}>THIS MONTH</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("6MONTHS")}>LAST 6
                                    MONTHS</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("YEAR")}>THIS YEAR</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("2023")}>2023</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("2022")}>2022</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("2021")}>2021</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("2020")}>2020</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("2019")}>2019</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDateFilterChange("2018")}>2018</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                {processingMessage && <p className="processing-message">{processingMessage}</p>}
                <div className="news-cards">
                    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                        {news.map((article, index) => (
                            <Col key={index}>
                                <Card className="card">
                                    <Card.Img
                                        variant="top"
                                        src={article.urlToImage}
                                        alt={article.title}
                                        style={{height: "150px", objectFit: "cover"}}
                                    />
                                    <Card.Body className="card-body d-flex flex-column">
                                        <Card.Title className="card-title">{article.title}</Card.Title>
                                        <Card.Text className="card-text">
                                            {article.description}
                                        </Card.Text>
                                        <Button variant="primary" className="card-button"
                                                onClick={() => handleShowModal(article)}>
                                            Open
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
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
