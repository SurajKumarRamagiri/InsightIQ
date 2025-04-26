import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LandingPage() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <nav className="d-flex justify-content-between align-items-center p-3">
        <h2 className="mb-0">InsightIQ</h2>
        <Link to="/signup">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </nav>

      <div className="text-center my-auto px-3">
        <h1 className="fw-bold mb-3">Learn Smarter with AI-Powered Insights</h1>
        <p className="lead mb-4">
          Upload study material, chat with your documents, and grow your knowledge intelligently with quizzes, flashcards, and concept maps.
        </p>
        <Link to="/signup">
          <button className="btn btn-info btn-lg">Try InsightIQ Now</button>
        </Link>
      </div>

      <div className="bg-secondary p-4 d-flex justify-content-around flex-wrap mt-auto">
        <div className="text-center p-3" style={{ maxWidth: "250px" }}>
          <i className="bi bi-file-earmark-text fs-2"></i>
          <h5 className="mt-2">Chat with PDFs</h5>
          <p className="small">
            Ask questions and extract key insights from any uploaded document.
          </p>
        </div>

        <div className="text-center p-3" style={{ maxWidth: "250px" }}>
          <i className="bi bi-robot fs-2"></i>
          <h5 className="mt-2">AI Tutor</h5>
          <p className="small">
            Get interactive explanations, flashcards, and quizzes from AI.
          </p>
        </div>

        <div className="text-center p-3" style={{ maxWidth: "250px" }}>
          <i className="bi bi-journal-check fs-2"></i>
          <h5 className="mt-2">Learning Portfolio</h5>
          <p className="small">
            Track learned topics and revisit them via your personalized dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
