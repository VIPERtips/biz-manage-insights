import React from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaChartPie, FaBriefcase, FaRocket, FaIndustry, FaCogs } from 'react-icons/fa';
import Lottie from 'lottie-react';
import financialAnimation from '../assets/financialAnimation.json';
import missionAnimation from '../assets/missionAnimation.json';
import analysisAnimation from '../assets/analysisAnimation.json';
import researchAnimation from '../assets/researchAnimation.json';
import solutionsAnimation from '../assets/solutionsAnimation.json';

const About = () => {
  console.log(financialAnimation); // Check the animation data

  const stats = [
    { number: '85%', description: 'Client Success Rate' },
    { number: '500+', description: 'Business Cases Analyzed' },
    { number: '50+', description: 'Industry Experts' },
    { number: '25+', description: 'Countries Served' },
  ];

  // Common style for all cards: a light gray background with a soft shadow
  const cardStyle = {
    backgroundColor: '#f8f9fa', // Light gray background
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: 'none',
  };

  // Style for paragraphs to improve font size and readability
  const paragraphStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* About Section */}
        <section className="about mb-5" data-aos="fade-up">
          <h1 className="text-light ps-1 text-center">About BizManage Insights</h1>
          <Card className="mb-4 shadow" style={cardStyle} data-aos="zoom-in">
            <Card.Body>
              <h2 className="text-primary">
                <FaRocket className="me-2" /> Our Mission
              </h2>
              <div className="mission-animation blur-effect">
                <Lottie 
                  animationData={missionAnimation} 
                  loop={true} 
                  autoplay={true} 
                  height={200} 
                  width={200} 
                />
              </div>
              <p style={paragraphStyle}>
                At BizManage Insights, our mission is to provide businesses with
                the tools and knowledge they need to thrive in a competitive
                market. We offer a wide range of services designed to help
                organizations make data-driven decisions, optimize their
                operations, and achieve sustainable growth.
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow" style={cardStyle} data-aos="zoom-in">
            <Card.Body>
              <h2 className="text-primary" data-aos="fade-right">
                <FaChartPie className="me-2" /> What We Offer
              </h2>
              <Row>
                <Col md={6} data-aos="fade-right" data-aos-delay="100">
                  <h3 className="text-primary">
                    <FaCogs className="me-2" /> Expert Analysis
                  </h3>
                  <div className="analysis-animation blur-effect">
                    <Lottie 
                      animationData={analysisAnimation} 
                      loop={true} 
                      autoplay={true} 
                      height={200} 
                      width={200} 
                    />
                  </div>
                  <p style={paragraphStyle}>
                    Our team of industry experts provides in-depth analysis of
                    current business trends, market dynamics, and emerging
                    opportunities, enabling clients to make informed decisions
                    and stay ahead of the competition.
                  </p>
                </Col>
                <Col md={6} data-aos="fade-left" data-aos-delay="200">
                  <h3 className="text-primary">
                    <FaBriefcase className="me-2" /> Strategic Solutions
                  </h3>
                  <div className="solutions-animation blur-effect">
                    <Lottie 
                      animationData={solutionsAnimation} 
                      loop={true} 
                      autoplay={true} 
                      height={200} 
                      width={200} 
                    />
                  </div>
                  <p style={paragraphStyle}>
                    We deliver practical, implementable solutions tailored to
                    your business needs, backed by real-world case studies and
                    research, ensuring that our strategies are both effective
                    and relevant.
                  </p>
                </Col>

                <Col md={6} data-aos="fade-right" data-aos-delay="300">
                  <h3 className="text-primary">
                    <FaIndustry className="me-2" /> Business Research
                  </h3>
                  <div className="research-animation blur-effect">
                    <Lottie 
                      animationData={researchAnimation} 
                      loop={true} 
                      autoplay={true} 
                      height={200} 
                      width={200} 
                    />
                  </div>
                  <p style={paragraphStyle}>
                    Our comprehensive business research services provide
                    valuable insights into market trends, consumer behavior, and
                    competitive landscapes, helping businesses identify
                    opportunities and mitigate risks.
                  </p>
                </Col>
                <Col md={6} data-aos="fade-left" data-aos-delay="400">
                  <h3 className="text-primary">
                    <FaChartPie className="me-2" /> Financial Analysis
                  </h3>
                  <div className="financial-animation blur-effect">
                    <Lottie 
                      animationData={financialAnimation} 
                      loop={true} 
                      autoplay={true} 
                      height={200} 
                      width={200} 
                    />
                  </div>
                  <p style={paragraphStyle}>
                    Our financial analysis services offer a thorough evaluation
                    of your company's financial health, including profitability,
                    liquidity, and solvency assessments, to inform strategic
                    planning and investment decisions.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </section>

        {/* Statistics Section */}
        <section className="statistics" data-aos="fade-up">
          <Card className="shadow" style={cardStyle}>
            <Card.Body>
              <h2 className="text-primary">Our Impact</h2>
              <Row>
                {stats.map((stat, index) => (
                  <Col md={3} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="text-center mb-4"
                    >
                      <h3 className="display-4 text-primary">{stat.number}</h3>
                      <p style={paragraphStyle}>{stat.description}</p>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </section>
      </motion.div>
    </Container>
  );
};

export default About;
