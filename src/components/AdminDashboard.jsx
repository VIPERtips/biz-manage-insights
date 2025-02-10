import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Table, Alert, Modal, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [currentCaseStudy, setCurrentCaseStudy] = useState(null);
  const [error, setError] = useState('');
  const [newCaseStudy, setNewCaseStudy] = useState({
    title: '',
    description: '',
    industry: '',
    problem: '',
    solution: '',
    results: '',
    author: '',
    publishedDate: ''
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [loading, setLoading] = useState(false); // State for loading indicator

  const url = "https://bizmanageinsights-backend.onrender.com";

  // Fetch case studies on load
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/api/case-studies`)
      .then((response) => {
        setCaseStudies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch case studies');
        setLoading(false);
      });
  }, []);

  // Handle adding a new case study
  const handleAddCaseStudy = () => {
    setLoading(true);
    axios
      .post(`${url}/api/case-studies`, newCaseStudy)
      .then((response) => {
        setCaseStudies([...caseStudies, response.data.data]);
        setNewCaseStudy({
          title: '',
          description: '',
          industry: '',
          problem: '',
          solution: '',
          results: '',
          author: '',
        });
        setShowModal(false); // Close the modal after adding
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to add case study');
        setLoading(false);
      });
  };

  // Handle editing a case study
  const handleEditCaseStudy = () => {
    if (!currentCaseStudy) return;
    setLoading(true);
    axios
      .put(`${url}/api/case-studies/${currentCaseStudy.id}`, currentCaseStudy)
      .then((response) => {
        setCaseStudies(
          caseStudies.map((cs) =>
            cs.id === currentCaseStudy.id ? response.data.data : cs
          )
        );
        setCurrentCaseStudy(null);
        setShowEditModal(false); // Close the modal after editing
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to edit case study');
        setLoading(false);
      });
  };

  // Handle deleting a case study
  const handleDeleteCaseStudy = (id) => {
    setLoading(true);
    axios
      .delete(`${url}/api/case-studies/${id}`)
      .then(() => {
        setCaseStudies(caseStudies.filter((cs) => cs.id !== id));
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to delete case study');
        setLoading(false);
      });
  };

  // Open the edit modal and populate the form
  const handleOpenEditModal = (caseStudy) => {
    setCurrentCaseStudy(caseStudy);
    setShowEditModal(true);
  };

  return (
    <Container>
      {/* Navbar */}
      <AdminNavbar />

      {/* Error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading indicator */}
      {loading && <Spinner animation="border" variant="primary" className="d-block mx-auto my-3" />}

      <Card className="shadow mb-4">
        <Card.Header className="bg-dark text-white">
          <h6 className="m-0 font-weight-bold text-center">Manage Case Studies</h6>
        </Card.Header>
        <Card.Body>
          <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
            Add Case Study
          </Button>
          <div className="table-responsive">
            <Table striped bordered hover className="w-100">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Industry</th>
                  <th>Problem</th>
                  <th>Solution</th>
                  <th>Results</th>
                  <th>Author</th>
                  <th>Published Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.map((caseStudy, index) => (
                  <tr key={caseStudy.id}>
                    <td>{index + 1}</td>
                    <td>{caseStudy.title}</td>
                    <td>{caseStudy.description}</td>
                    <td>{caseStudy.industry}</td>
                    <td>{caseStudy.problem}</td>
                    <td>{caseStudy.solution}</td>
                    <td>{caseStudy.results}</td>
                    <td>{caseStudy.author}</td>
                    <td>{caseStudy.publishedDate}</td>
                    <td className='d-flex'>
                      <Button
                        variant="warning"
                        className="btn-sm"
                        onClick={() => handleOpenEditModal(caseStudy)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="btn-sm ms-2"
                        onClick={() => handleDeleteCaseStudy(caseStudy.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Modal for adding new case study */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Case Study</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newCaseStudy.title}
                onChange={(e) => setNewCaseStudy({ ...newCaseStudy, title: e.target.value })}
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={newCaseStudy.description}
                onChange={(e) => setNewCaseStudy({ ...newCaseStudy, description: e.target.value })}
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group controlId="industry" className="mt-3">
              <Form.Label>Industry</Form.Label>
              <Form.Control
                type="text"
                value={newCaseStudy.industry}
                onChange={(e) => setNewCaseStudy({ ...newCaseStudy, industry: e.target.value })}
                placeholder="Enter industry"
              />
            </Form.Group>
            <Form.Group controlId="problem" className="mt-3">
              <Form.Label>Problem</Form.Label>
              <Form.Control
                type="text"
                value={newCaseStudy.problem}
                onChange={(e) => setNewCaseStudy({ ...newCaseStudy, problem: e.target.value })}
                placeholder="Enter problem"
              />
            </Form.Group>
            <Form.Group controlId="solution" className="mt-3">
              <Form.Label>Solution</Form.Label>
              <Form.Control
                type="text"
                value={newCaseStudy.solution}
                onChange={(e) => setNewCaseStudy({ ...newCaseStudy, solution: e.target.value })}
                placeholder="Enter solution"
              />
            </Form.Group>
            <Form.Group controlId="results" className="mt-3">
              <Form.Label>Results</Form.Label>
              <Form.Control
                type="text"
                value={newCaseStudy.results}
                onChange={(e) => setNewCaseStudy({ ...newCaseStudy, results: e.target.value })}
                placeholder="Enter results"
              />
            </Form.Group>
            <Form.Group controlId="author" className="mt-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={newCaseStudy.author}
                onChange={(e) => setNewCaseStudy({ ...newCaseStudy, author: e.target.value })}
                placeholder="Enter author"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCaseStudy}>
            Add Case Study
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing case study */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Case Study</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={currentCaseStudy?.title}
                onChange={(e) =>
                  setCurrentCaseStudy({ ...currentCaseStudy, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={currentCaseStudy?.description}
                onChange={(e) =>
                  setCurrentCaseStudy({ ...currentCaseStudy, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="industry" className="mt-3">
              <Form.Label>Industry</Form.Label>
              <Form.Control
                type="text"
                value={currentCaseStudy?.industry}
                onChange={(e) =>
                  setCurrentCaseStudy({ ...currentCaseStudy, industry: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="problem" className="mt-3">
              <Form.Label>Problem</Form.Label>
              <Form.Control
                type="text"
                value={currentCaseStudy?.problem}
                onChange={(e) =>
                  setCurrentCaseStudy({ ...currentCaseStudy, problem: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="solution" className="mt-3">
              <Form.Label>Solution</Form.Label>
              <Form.Control
                type="text"
                value={currentCaseStudy?.solution}
                onChange={(e) =>
                  setCurrentCaseStudy({ ...currentCaseStudy, solution: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="results" className="mt-3">
              <Form.Label>Results</Form.Label>
              <Form.Control
                type="text"
                value={currentCaseStudy?.results}
                onChange={(e) =>
                  setCurrentCaseStudy({ ...currentCaseStudy, results: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="author" className="mt-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={currentCaseStudy?.author}
                onChange={(e) =>
                  setCurrentCaseStudy({ ...currentCaseStudy, author: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditCaseStudy}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;