import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
//import About from './components/About'
import Blog from './components/Blog'
import CaseStudies from './components/CaseStudies'
import Resources from './components/Resources'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.css"
import './index.css' // Import custom CSS for additional styling
import Auth from './components/Auth'
import AdminDashboard from './components/AdminDashboard'

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  const Forbidden = () => {
    return (
      <>
      <div className="text-center justify-content-center">
      <h1 className='text-light'>403 - Forbidden</h1>
      <p className='text-light lead'>You do not have permission to access this page.</p>
      </div>
      </>
    );
  };

  const NotFound = () => {
    return (
      <div className="text-center justify-content-center">
        <h1 className='text-light'>404 - Not Found</h1>
        <p className='text-light lead'>The page you are looking for does not exist.</p>
      </div>
    );
  };

  return (
    <Router>
      <div className="bg-dark text-gray-800">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/*<Route path="/about" element={<About />} />*/}
          <Route path="/blog" element={<Blog />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/admin/dashboard" element={isAuthenticated() ? <AdminDashboard /> : <Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
