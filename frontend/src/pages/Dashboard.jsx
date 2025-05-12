import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowRight } from 'react-icons/fa';
import { Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [showErrorToast, setShowErrorToast] = React.useState(false);

  const stats = [
    { label: 'Documents', value: 12, color: 'primary' },
    { label: 'Explanations', value: 34, color: 'success' },
    { label: 'Quizzes', value: 7, color: 'warning' },
    { label: 'Flashcards', value: 18, color: 'info' }
  ];

  const fileInputRef = React.useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('File upload failed:', error);
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
    }
  };

  return (
    <div className={`d-flex min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow-1 p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold text-primary" style={{ fontSize: '3rem' }}>InsightIQ Dashboard</h1>
            <p className="text-muted" style={{ fontSize: '1.25rem' }}>Transforming reading into active learning</p>
          </div>
        </div>

        {/* Stats */}
        <div className="row g-4 mb-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Learning Progress Card */}
        <div className="card shadow-lg p-4 mb-4 rounded-4">
          <h5 className="fw-bold mb-3">📚 Current Learning Progress</h5>

          {/* Topic Name */}
          <h6 className="fw-bold text-primary mb-2">Introduction to Machine Learning</h6>

          {/* Description + Progress */}
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
            
            {/* Description */}
            <p className="text-muted mb-0 me-3 flex-grow-1">
              Learn core ML concepts like supervised, unsupervised learning, and key algorithms.
            </p>

            {/* Progress Bar */}
            <div style={{ minWidth: '200px' }}>
              <div className="progress" style={{ height: '15px' }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: '45%' }}
                  aria-valuenow="45"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                </div>
                {/* Percentage Text */}
            <span className="ms-2 fw-bold text-success">45%</span>
              </div>
            </div>

          </div>

          {/* Stats + Button Row */}
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            
            {/* Badges */}
            <div className="d-flex flex-wrap gap-3">
              <span className="badge bg-primary bg-opacity-10 text-primary p-2 rounded-3">
                📝 Quizzes: 2/5
              </span>
              <span className="badge bg-info bg-opacity-10 text-info p-2 rounded-3">
                🃏 Flashcards: 10/20
              </span>
              <span className="badge bg-warning bg-opacity-10 text-warning p-2 rounded-3">
                ⏱️ ETA: 30 mins
              </span>
            </div>

            {/* Continue Button */}
            <button className="btn btn-primary rounded-pill px-4 mt-3 mt-md-0 d-flex align-items-center gap-2">
              Continue <FaArrowRight />
            </button>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="card shadow-lg p-4 mb-4 rounded-4">
          <h5 className="fw-bold mb-3">Quick Actions</h5>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-outline-primary rounded-pill px-4" onClick={handleUploadClick}>Upload PDF</button>
            <input
              type="file"
              accept=".pdf,.docx"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {['Start Chat', 'Generate Quiz', 'Review Flashcards'].map((label, i) => (
              <button key={i} className="btn btn-outline-primary rounded-pill px-4">{label}</button>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="card shadow-lg p-4 rounded-4">
          <h5 className="fw-bold mb-3">Learning Insights</h5>
          <p className="text-muted">✅ You've covered 75% of your weekly goals — great progress!</p>
        </div>

        {/* Toast */}
        <ToastContainer position="top-end" style={{ zIndex: 1050 }}>
          {showToast && (
            <Toast bg="success" onClose={() => setShowToast(false)} delay={3000} autohide>
              <Toast.Body>Document uploaded successfully!</Toast.Body>
            </Toast>
          )}
          {showErrorToast && (
            <Toast bg="danger" onClose={() => setShowErrorToast(false)} delay={3000} autohide>
              <Toast.Body>Failed to upload document. Please try again.</Toast.Body>
            </Toast>
          )}
        </ToastContainer>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value, color }) => (
  <div className="col-md-3">
    <div className={`card shadow-lg border-0 p-3 rounded-4 text-${color}`}>
      <div className="d-flex align-items-center gap-3">
        <div className={`bg-${color} bg-opacity-25 p-3 rounded-circle`}>
          {icon}
        </div>
        <div>
          <h6 className="mb-1 text-muted">{label}</h6>
          <h5 className="fw-bold">{value}</h5>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;