import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert, Pagination } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaIndustry, FaRegChartBar, FaUser, FaCalendarAlt } from 'react-icons/fa';

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get('https://bizmanageinsights-backend.onrender.com/api/case-studies');
        setCaseStudies(response.data.data);
      } catch (error) {
        console.error('Error fetching case studies:', error);
        setError('Failed to load case studies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const paginatedCaseStudies = caseStudies.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(caseStudies.length / pageSize);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <h1 className="text-center text-light py-2" data-aos="fade-down">Case Studies</h1>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : (
        <>
          <Row className="g-4">
            {paginatedCaseStudies.map((caseStudy, index) => (
              <Col xs={12} sm={6} md={4} key={caseStudy.id} data-aos="zoom-in" data-aos-delay={index * 100}>
                <motion.div whileHover={{ scale: 1.05 }} style={{ height: '100%' }}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body style={{ overflowY: 'auto' }}>
                      <Card.Title className="text-primary">
                        <FaRegChartBar className="me-2" /> {caseStudy.title}
                      </Card.Title>
                      <Card.Text>{caseStudy.description}</Card.Text>
                      {caseStudy.problem && <Card.Text><strong>Problem:</strong> {caseStudy.problem}</Card.Text>}
                      {caseStudy.solution && <Card.Text><strong>Solution:</strong> {caseStudy.solution}</Card.Text>}
                      {caseStudy.results && <Card.Text><strong>Outcome:</strong> {caseStudy.results}</Card.Text>}
                      <Card.Text>
                        <strong>Industry:</strong>{' '}
                        <span className="badge bg-info text-dark">
                          <FaIndustry className="me-1" /> {caseStudy.industry}
                        </span>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between text-muted">
                      <small><FaUser className="me-1" /> {caseStudy.author || 'Unknown'}</small>
                      <small><FaCalendarAlt className="me-1" /> {caseStudy.publishedDate || 'N/A'}</small>
                    </Card.Footer>
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
                {[...Array(totalPages).keys()].map(number => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
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

export default CaseStudies;