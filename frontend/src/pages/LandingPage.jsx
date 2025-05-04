import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import CountUp from 'react-countup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

function LandingPage() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = e.target.elements.demoInput.value;
    if (!userInput) {
      setResponse("❗ Please type something to ask!");
      return;
    }
    setLoading(true);
    setResponse('');
    setTimeout(() => {
      setLoading(false);
      setResponse(`🤖 Great question! Here's a quick insight on: "${userInput}". Sign up to get full access!`);
    }, 1200);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      {/* Navbar */}
      <nav className="d-flex justify-content-between align-items-center p-3">
        <h2 className="mb-0">InsightIQ</h2>
        <div>
          <Link to="/login">
            <button className="btn btn-outline-light me-2">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center my-auto px-3">
        <h1 className="fw-bold mb-3 animate__animated animate__fadeInDown">
          Learn Smarter with AI-Powered Insights
        </h1>
        <p className="lead mb-4 animate__animated animate__fadeInUp">
          Upload study material, chat with your documents, and grow your knowledge intelligently with quizzes, flashcards, and concept maps.
        </p>
        <Link to="/signup">
          <button className="btn btn-info btn-lg animate__animated animate__pulse animate__infinite">
            ✨ Try InsightIQ Now
          </button>
        </Link>
      </div>

      {/* AI Demo Section */}
      <div className="bg-dark text-light py-5 border-top border-secondary">
        <h3 className="text-center mb-4 animate__animated animate__fadeIn">🚀 Try Our AI Tutor Now</h3>
        <div className="container d-flex flex-column align-items-center">
          <p className="text-muted text-center mb-3 animate__animated animate__fadeIn" style={{ maxWidth: '600px' }}>
            Curious how InsightIQ works? Type any question below and get a sneak peek of how our AI-powered tutor responds!
          </p>
          <div className="w-100" style={{ maxWidth: '500px' }}>
            <form onSubmit={handleSubmit} className="animate__animated animate__fadeInUp">
              <div className="input-group mb-3">
                <span className="input-group-text bg-info text-white">
                  <i className="bi bi-chat-dots"></i>
                </span>
                <input
                  type="text"
                  name="demoInput"
                  className="form-control"
                  placeholder="Ask me anything about your study material..."
                />
                <button className="btn btn-info" type="submit">
                  Ask
                </button>
              </div>
            </form>
            <div
              className={`bg-secondary text-light rounded p-3 mt-2 animate__animated ${
                response ? 'animate__fadeIn' : ''
              }`}
              style={{ minHeight: '80px', transition: 'all 0.3s ease', position: 'relative' }}
            >
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 mb-0">AI is thinking...</p>
                </div>
              ) : (
                response
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="bg-info text-dark py-5 text-center">
        <h3 className="mb-4 animate__animated animate__fadeIn">📊 Trusted by Thousands of Learners</h3>
        <div className="d-flex justify-content-around flex-wrap">
          <div className="p-3">
            <h2><CountUp end={10000} duration={3} separator="," />+</h2>
            <p>Documents Analyzed</p>
          </div>
          <div className="p-3">
            <h2><CountUp end={5000} duration={3} separator="," />+</h2>
            <p>Active Users</p>
          </div>
          <div className="p-3">
            <h2><CountUp end={99} duration={3} suffix="%" /></h2>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="bg-dark text-white py-5">
        <h3 className="text-center mb-4 animate__animated animate__fadeIn">🌟 What Our Users Say</h3>
        <div className="container" style={{ maxWidth: '700px' }}>
          <Carousel variant="dark">
            <Carousel.Item>
              <div className="text-center">
                <p>"InsightIQ totally changed my study habits. The AI is like having a personal tutor 24/7!"</p>
                <small>- Sarah M., Student</small>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="text-center">
                <p>"I love how easy it is to upload PDFs and get instant explanations. Super useful!"</p>
                <small>- Raj P., College Learner</small>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="text-center">
                <p>"The flashcards and quizzes helped me ace my exams. Highly recommended."</p>
                <small>- Emily W., Test Prep</small>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-secondary text-dark py-5">
        <h3 className="text-center mb-4 animate__animated animate__fadeIn">🎬 See InsightIQ in Action</h3>
        <div className="container d-flex justify-content-center">
          <div className="ratio ratio-16x9" style={{ maxWidth: '800px' }}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="InsightIQ Demo Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-secondary p-4 d-flex justify-content-around flex-wrap mt-auto">
        <div className="text-center p-3 animate__animated animate__fadeInLeft" style={{ maxWidth: "250px" }}>
          <i className="bi bi-file-earmark-text fs-2"></i>
          <h5 className="mt-2">Chat with PDFs</h5>
          <p className="small">
            Ask questions and extract key insights from any uploaded document.
          </p>
        </div>

        <div className="text-center p-3 animate__animated animate__fadeInUp" style={{ maxWidth: "250px" }}>
          <i className="bi bi-robot fs-2"></i>
          <h5 className="mt-2">AI Tutor</h5>
          <p className="small">
            Get interactive explanations, flashcards, and quizzes from AI.
          </p>
        </div>

        <div className="text-center p-3 animate__animated animate__fadeInRight" style={{ maxWidth: "250px" }}>
          <i className="bi bi-journal-check fs-2"></i>
          <h5 className="mt-2">Learning Portfolio</h5>
          <p className="small">
            Track learned topics and revisit them via your personalized dashboard.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-0">© 2025 InsightIQ. All rights reserved.</p>
          <div className="mt-3">
            <a href="#" className="text-white me-3">
              <i className="bi bi-facebook"></i> Facebook
            </a>
            <a href="#" className="text-white me-3">
              <i className="bi bi-twitter"></i> Twitter
            </a>
            <a href="#" className="text-white">
              <i className="bi bi-linkedin"></i> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
