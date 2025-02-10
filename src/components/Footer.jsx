import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Instagram, Linkedin } from 'react-bootstrap-icons';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socials = [
    { icon: <Facebook />, url: 'https://facebook.com/tadiwa.tips.37' },
    { icon: <Instagram />, url: 'https://instagram.com/young_tips_blessed' },
    { icon: <Linkedin />, url: 'https://linkedin.com/in/tadiwa-chipungu' }
  ];

  return (
    <footer className=" text-bg-dark dark:bg-gray-800 py-4">
      
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0">
            <p className="text-gray-600 dark:text-gray-300">
              &copy; {currentYear} BizManage Insights. All rights reserved.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 mx-2 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
