import React, { useState } from "react";
import "../assets/css/favorites.css";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import ModalArticle from "../components/ModalNew";

const Favorites = () => {
    // SIMULATED DATA
    const mockData = [
        {
            urlToImage: "https://media.cnn.com/api/v1/images/stellar/prod/cnne-1784694-google-chrome-separarse.jpg?q=w_1110,c_fill/f_webp",
            title: "US Justice Department asks court to force Google to divest Chrome browser over antitrust violations",
            description: "The US government formally proposed a partial breakup of Google on Wednesday, urging a federal judge to force the sale of the company's Chrome web browser after a landmark ruling this year found that Google had violated US antitrust law with its search business. The request by the Justice Department and a group of states opens the door to the most significant antitrust penalties for a tech giant in a generation, targeting not only Google's illegal monopoly in search but also its growing ambitions in artificial intelligence.",
            author: "techcrunch.com",
            url: "https://cnnespanol.cnn.com/2024/11/21/departamento-justicia-ee-uu-google-chrome-antimonopolio-trax",
            publishedAt: "2024-12-05T09:45:00Z",
            content: "In a move that could reshape the future of the tech industry, the US Justice Department has proposed a court order that would force Google to divest its Chrome browser. The ruling stems from an antitrust case that found Google guilty of monopolistic practices in its search business, and now the government is looking to curb its control in the browser market as well. The proposed break-up could have widespread consequences for Google's business, as Chrome holds a dominant share of the global browser market.",
        },
        {
            urlToImage: "https://media.cnn.com/api/v1/images/stellar/prod/cnne-1789580-intel.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
            title: "Intel CEO Pat Gelsinger resigns after disastrous tenure",
            description: "Intel announced Monday that its chief executive, Pat Gelsinger, has resigned after a difficult time at the company. Shares of the once-dominant chipmaker plunged as it failed to capitalize on the rise of artificial intelligence and was outperformed by most of its rivals.",
            author: "techcrunch.com",
            url: "https://cnnespanol.cnn.com/2024/12/02/renuncia-ceo-intel-pat-gelsinger-tras-mandato-desastroso-trax",
            publishedAt: "2024-12-05T10:30:00Z",
            content: "Pat Gelsinger's resignation marks the end of a tumultuous period for Intel, which has struggled to keep up with its competitors in the rapidly evolving chip industry. Under Gelsinger's leadership, the company failed to capitalize on the growing demand for AI-powered chips and was overtaken by rivals such as AMD and NVIDIA. Intel's market share in the semiconductor space has dwindled, and its stock has taken a hit in recent months. Gelsinger's departure raises questions about the future direction of the company.",
        },
        {
            urlToImage: "https://via.placeholder.com/150",
            title: "Tesla News 3",
            description: "This is a description of the third news article.",
            author: "autoblog.com",
            url: "https://www.autoblog.com/2024/12/05/tesla-news-3",
            publishedAt: "2024-12-05T11:00:00Z",
            content: "Tesla continues to dominate the electric vehicle market, with new innovations on the horizon. The company has announced plans to introduce a fully autonomous electric car by 2025, which could revolutionize the way we travel. Stay tuned for more updates on Tesla's groundbreaking developments.",
        },
        {
            urlToImage: "https://via.placeholder.com/150",
            title: "Tesla News 4",
            description: "This is a description of the fourth news article.",
            author: "autoblog.com",
            url: "https://www.autoblog.com/2024/12/05/tesla-news-4",
            publishedAt: "2024-12-05T12:15:00Z",
            content: "Tesla has unveiled its latest update to the Cybertruck, improving its durability and range. The electric pickup truck is set to hit the market next year, and it's already generating excitement. Here's what you need to know about the latest Cybertruck features.",
        },
        {
            urlToImage: "https://via.placeholder.com/150",
            title: "Tesla News 5",
            description: "This is a description of the fifth news article.",
            author: "electricvehicles.com",
            url: "https://www.electricvehicles.com/2024/12/05/tesla-news-5",
            publishedAt: "2024-12-05T13:00:00Z",
            content: "Tesla's energy division has made significant strides in the solar panel market. With new innovations in efficiency and affordability, Tesla is becoming a leader in sustainable energy solutions. This article dives into the latest developments and their impact on the industry.",
        },
    ];
    // MODAL STATE
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    // HANDLE
    const handleShowModal = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedArticle(null);
    };

    return (
        <div className="favorites-page">
            <div className="favorites-content">
                <h1 className="favorites-title">Favorites</h1>
                <div className="favorite-cards">
                    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                        {mockData.map((article, index) => (
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

export default Favorites;