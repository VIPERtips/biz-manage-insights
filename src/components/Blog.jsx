import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Pagination } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Blog = ({ title = 'Blog' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const articlesPerPage = 6;
  const placeholderImage = '/placeholder.svg';

  const getDailyCategory = () => {
    const categories = ['technology', 'business', 'science'];
    const dayIndex = new Date().getDay();
    return categories[dayIndex % categories.length];
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const category = getDailyCategory();
        const response = await axios.get('https://api.currentsapi.services/v1/latest-news', {
          params: {
            apiKey: 'FxvM2VXgfnTZMYG79tACG7JhN2EQ09St7NBN_qqnBkOmsdtf',
            category: category,
            language: 'en',
            page: currentPage,
            pageSize: articlesPerPage,
          },
        });
        
        console.table(response.data.news);
        setArticles(response.data.news);
        setTotalResults(response.data.totalResults ?? response.data.news.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalResults / articlesPerPage));

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container>
      <h1 className="text-center text-light py-2" data-aos="fade-down">
        {title}
      </h1>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Row className="g-4">
            {articles.map((article, index) => (
              <Col xs={12} sm={6} md={4} key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                <motion.div whileHover={{ scale: 1.05 }} style={{ height: '100%' }}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={article.image && article.image.trim().length > 0 ? article.image : placeholderImage}
                      alt="News Image"
                      onError={(e) => {
                        e.target.src = placeholderImage;
                      }}
                      style={{ height: '200px', objectFit: 'cover' }} // Fixed image height
                    />
                    <Card.Body style={{ overflowY: 'auto' }}>
                      <Card.Title className="text-blue-700">{article.title}</Card.Title>
                      <Card.Text>{article.description}</Card.Text>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Read more
                      </a>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Blog;