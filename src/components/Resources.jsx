import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion'

const Resources = () => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts') // Replace with your API endpoint
        setResources(response.data.slice(0, 6)) // Limit to 6 resources for display
        setLoading(false)
      } catch (error) {
        console.error('Error fetching resources:', error)
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  return (
    <Container>
      <h1 className="text-blue-700 text-center" data-aos="fade-down">Resources</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {resources.map((resource, index) => (
            <Col md={4} key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title className="text-blue-700">{resource.title}</Card.Title>
                    <Card.Text>{resource.body}</Card.Text>
                    <Card.Text><strong>Type:</strong> Example Type</Card.Text>
                    <Card.Text>Download: <a href="/path/to/resource" className="text-cyan-400">Resource Link</a></Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Resources
