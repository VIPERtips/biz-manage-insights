import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    
    const validUsernames = ['tadiwa', 'user']; 
    const validPassword = '2020' ; 
  
    
    const inputUsername = username.trim().toLocaleLowerCase();
  
    
    if (
      validUsernames.includes(inputUsername) &&
      password.trim() === validPassword 
    ) {
      setError(''); 
      localStorage.setItem('isAuthenticated', 'true'); 
      window.location.href = '/admin/dashboard'; 
    } else {
      setError('Invalid username or password'); 
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="auth-container" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

          <Button variant="primary" className="w-100 mt-3" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Auth;
