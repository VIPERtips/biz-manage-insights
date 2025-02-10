import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FaUser,FaComment, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <Container>
      <h1 className="text-center my-4 text-light">Contact Us</h1>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form action="https://formspree.io/f/xjkgroje" method="POST" className='text-light'>
            <Form.Group controlId="formName">
              <Form.Label><FaUser  className='text-primary'/>  Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter your name" required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label><FaEnvelope  className='text-primary'/> Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your email" required />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label><FaComment className='text-primary'/> Message</Form.Label>
              <Form.Control as="textarea" name="message" rows={3} placeholder="Enter your message" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2 w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <section className="social-media mt-5 text-center">
        <h2>Follow Us</h2>
        <p>
          {/* Social media links */}
          <a href="https://facebook.com/bizManageInsights" target="_blank" rel="noopener noreferrer" className="mx-2">Facebook</a> | 
          <a href="https://twitter.com/bizManageInsights" target="_blank" rel="noopener noreferrer" className="mx-2">Twitter</a> | 
          <a href="https://linkedin.com/bizManageInsights" target="_blank" rel="noopener noreferrer" className="mx-2">LinkedIn</a>
        </p>
      </section>
    </Container>
  );
};

export default Contact;
