import React from 'react';
import { motion } from 'framer-motion';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { 
  FaChartLine, 
  FaLightbulb, 
  FaTools, 
  FaRocket,
  FaGlobe,
  FaChartBar,
  FaBalanceScale,
  FaUsers,
  FaCogs, FaBriefcase, FaIndustry, FaChartPie
} from 'react-icons/fa';

const Home = () => {
  // Hardcoded graph data
  const sampleData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 83 },
    { month: 'Apr', value: 92 },
    { month: 'May', value: 81 },
    { month: 'Jun', value: 95 }
  ];

  const Graph = () => {
    const maxValue = Math.max(...sampleData.map(d => d.value));
    const minValue = Math.min(...sampleData.map(d => d.value));
    const range = maxValue - minValue;
    const yScale = 250 / range;
    
    // Generate dynamic Y-axis labels
    const yTicks = [];
    const step = Math.ceil(range / 5);
    for(let i = minValue; i <= maxValue; i += step) {
      yTicks.push(i);
    }

    return (
      <svg viewBox="0 0 500 300" className="w-100 h-100">
        {/* Grid lines */}
        {yTicks.map((y, i) => (
          <line
            key={i}
            x1="50"
            y1={280 - ((y - minValue) * yScale)}
            x2="450"
            y2={280 - ((y - minValue) * yScale)}
            stroke="#2d3748"
            strokeWidth="0.5"
          />
        ))}

        {/* Data line */}
        <path
          d={`M ${sampleData.map((d, i) => 
            `${50 + i * 80},${280 - ((d.value - minValue) * yScale)}`
          ).join(' L ')}`}
          fill="none"
          stroke="#4299e1"
          strokeWidth="2"
        />

        {/* Data points */}
        {sampleData.map((d, i) => (
          <circle
            key={i}
            cx={50 + i * 80}
            cy={280 - ((d.value - minValue) * yScale)}
            r="4"
            fill="#4299e1"
          />
        ))}

        {/* Axes */}
        <path d="M50 280 L450 280" stroke="#718096" strokeWidth="1" />
        <path d="M50 30 L50 280" stroke="#718096" strokeWidth="1" />

        {/* Labels */}
        {sampleData.map((d, i) => (
          <text
            key={i}
            x={50 + i * 80}
            y="295"
            fill="#a0aec0"
            fontSize="12"
            textAnchor="middle"
          >
            {d.month}
          </text>
        ))}

        {yTicks.map((y, i) => (
          <text
            key={i}
            x="35"
            y={285 - ((y - minValue) * yScale)}
            fill="#a0aec0"
            fontSize="12"
            textAnchor="end"
          >
            ${y}
          </text>
        ))}
      </svg>
    );
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero vh-100 d-flex align-items-center position-relative overflow-hidden">
        <img 
          src='/bg-1.jpg'
          className="position-absolute w-100 h-100 object-fit-cover"
          style={{ zIndex: 0 }}
          alt="Business background"
        />
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="display-3 fw-bold mb-4"
            >
              Master Modern Business Management
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="lead fs-3 mb-5">
                Expert insights, actionable strategies, and cutting-edge tools for 
                <span className="d-block">business leaders and entrepreneurs</span>
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="d-flex gap-3 justify-content-center flex-wrap"
            >
              <Button
              href='#about'
                variant="primary" 
                size="lg"
                className="px-5 py-3 rounded-pill m-2"
              >
                Explore Our Business
              </Button>
              <Button 
                variant="outline-light" 
                size="lg"
                className="px-5 py-3 rounded-pill m-2"
              >
                Watch Intro
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Value Propositions */}
      <section className="py-7 bg-light" id="about">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-6 mt-1"
          >
            <h2 className="display-5 mb-4 text-dark" >
              Why Choose BizManage Insights?
            </h2>
            <p className="lead text-secondary">
              Transform your business with our comprehensive resource hub
            </p>
          </motion.div>

          <Row className="g-4">
            {[
              {
                icon: <FaChartLine className="display-4 text-primary" />,
                title: 'Data-Driven Strategies',
                text: 'Leverage analytics and market insights for informed decision-making'
              },
              {
                icon: <FaLightbulb className="display-4 text-primary" />,
                title: 'Expert Knowledge',
                text: 'Access proven frameworks from industry leaders and successful entrepreneurs'
              },
              {
                icon: <FaTools className="display-4 text-primary" />,
                title: 'Practical Tools',
                text: 'Download ready-to-use templates and operational checklists'
              },
              {
                icon: <FaRocket className="display-4 text-primary" />,
                title: 'Growth Hacks',
                text: 'Accelerate your business development with innovative techniques'
              }
            ].map((item, index) => (
              <Col md={6} lg={3} key={index}>
                <motion.div 
                  className="card h-100 shadow-sm border-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="card-body text-center p-4">
                    <div className="mb-3">{item.icon}</div>
                    <h3 className="h5 mb-3 text-dark">{item.title}</h3>
                    <p className="text-muted mb-0">{item.text}</p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-4"
          >
            <h3 className="text-center mb-5 text-dark">Our Core Services</h3>
            <Row className="g-4">
              {[
                {
                  icon: <FaCogs className="display-4 text-primary" />,
                  title: 'Expert Analysis',
                  text: 'In-depth analysis of business trends and market dynamics'
                },
                {
                  icon: <FaBriefcase className="display-4 text-primary" />,
                  title: 'Strategic Solutions',
                  text: 'Practical solutions backed by real-world case studies'
                },
                {
                  icon: <FaIndustry className="display-4 text-primary" />,
                  title: 'Business Research',
                  text: 'Comprehensive market trend analysis and consumer insights'
                },
                {
                  icon: <FaChartPie className="display-4 text-primary" />,
                  title: 'Financial Analysis',
                  text: 'Thorough evaluation of financial health and profitability'
                }
              ].map((item, index) => (
                <Col md={6} lg={3} key={index}>
                  <motion.div 
                   className="card h-100 shadow-sm border-0"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                   transition={{ delay: index * 0.1 }}
                   whileHover={{ scale: 1.05 }}
                  >
                    <div className="card-body text-center p-4">
                      <div className="mb-3">{item.icon}</div>
                      <h4 className="h5 mb-3 text-dark">{item.title}</h4>
                      <p className="text-muted mb-0">{item.text}</p>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Business Intelligence Section */}
      <section className="py-7 bg-dark">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="display-5 mb-4 text-light">
                  Stay Ahead with Real-Time Business Intelligence
                </h2>
                <p className="lead text-light mb-4 opacity-75">
                  Our platform continuously aggregates and analyzes data from:
                </p>
                <ul className="list-unstyled">
                  {[
                    { icon: <FaGlobe />, text: 'Global market trends' },
                    { icon: <FaChartBar />, text: 'Emerging industry patterns' },
                    { icon: <FaBalanceScale />, text: 'Regulatory changes' },
                    { icon: <FaUsers />, text: 'Consumer behavior shifts' }
                  ].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="d-flex align-items-center mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="bg-primary text-white rounded-circle me-3 p-2">
                        {item.icon}
                      </div>
                      <span className="fs-5 text-light">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="ratio ratio-16x9 bg-dark-800 rounded-3 overflow-hidden p-3"
              >
                <div className="bg-dark-900 rounded-2 p-3 h-100">
                  <h3 className="text-light mb-3">Market Performance</h3>
                  <div className="text-light opacity-75 small mb-4">
                    Quarterly growth analysis (Sample Data)
                  </div>
                  <div className="graph-container">
                    <Graph />
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;