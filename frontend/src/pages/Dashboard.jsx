import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle, FaBook, FaQuestionCircle, FaBolt, FaFileAlt, FaCog, FaBars,FaSearch, FaBookOpen, FaTimes ,FaArrowRight ,FaSun,FaMoon} from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For navigation

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: 'Documents', value: 12, color: 'primary' },
    { label: 'Explanations', value: 34, color: 'success' },
    { label: 'Quizzes', value: 7, color: 'warning' },
    { label: 'Flashcards', value: 18, color: 'info' }
  ];

  const handleUpload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const menuItems = [
    { label: 'Dashboard', icon: <FaBook />, path: '/' },
    { label: 'My PDFs', icon: <FaFileAlt />, path: '/pdfs' },
    { label: 'Chat with Docs', icon: <FaBolt />, path: '/chat' },
    { label: 'Quizzes', icon: <FaQuestionCircle />, path: '/quizzes' },
    { label: 'Flashcards', icon: <FaBookOpen />, path: '/flashcards' },
    { label: 'Portfolio', icon: <FaUserCircle />, path: '/portfolio' },
    { label: 'Settings', icon: <FaCog />, path: '/settings' }
  ];

  // Icon size logic based on sidebar state (collapsed or expanded)
  const iconSize = sidebarOpen ? 30 : 20;

  return (
    <div className={`d-flex min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      
      {/* Sidebar */}
      <div
        className={`sidebar shadow-sm d-flex flex-column justify-content-between 
        ${darkMode ? 'bg-secondary' : 'bg-primary'} ${sidebarOpen ? 'expanded' : 'collapsed'}`}
      >
        <div>
          {/* Hamburger Icon */}
          <div className="text-center mb-4">
            <button className="btn btn-outline-light mt-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Profile */}
          {sidebarOpen && (
            <div className="text-center mb-4">
              <FaUserCircle size={40} className="text-white" />
              <h5 className="mt-2 text-white">Welcome</h5>
              <p className="text-light small">you@example.com</p>
            </div>
          )}

          {/* Menu Items */}
          <ul className="nav flex-column">
            {menuItems.map((item, i) => (
              <li className="nav-item mb-3" key={i}>
                <Link to={item.path} className="nav-link text-white hover-effect d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
                  {React.cloneElement(item.icon, { size: iconSize })}
                  <span className={`menu-item-label ${sidebarOpen ? 'd-inline' : 'd-none'}`}>{item.label}</span> {/* Show label only when expanded */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        
{/* Header */}
<div className="d-flex justify-content-between align-items-center mb-4">
  <div>
    <h1 className="fw-bold text-primary" style={{ fontSize: '3rem' }}>InsightIQ Dashboard</h1>
    <p className="text-muted" style={{ fontSize: '1.25rem' }}>Transforming reading into active learning</p>
  </div>

  {/* Dark Mode & Logout Buttons */}
  <div className="d-flex gap-3">
    <button className="btn btn-outline-secondary rounded-pill" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
    <button className="btn btn-danger rounded-pill px-4" onClick={handleLogout}>
      Logout
    </button>
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

        {/* Search */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="input-group">
            <span className="input-group-text"><FaSearch /></span>
            <input type="text" className="form-control" placeholder="Search documents, quizzes..." />
          </div>
        </div>

        {/* Actions */}
        <div className="card shadow-lg p-4 mb-4 rounded-4">
          <h5 className="fw-bold mb-3">Quick Actions</h5>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-outline-primary rounded-pill px-4" onClick={handleUpload}>Upload PDF</button>
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
      </div>

      {/* Toast */}
      <ToastContainer position="top-end" style={{ zIndex: 1050 }}>
        {showToast && (
          <Toast>
            <Toast.Body>Document uploaded successfully!</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      {/* Styles */}
      <style jsx>{`
        .sidebar {
          transition: width 0.3s ease;
          overflow: hidden;
          padding: 2rem 1rem;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
        .sidebar.expanded {
          width: 260px;
        }
        .sidebar.collapsed {
          width: 80px;
        }
        .hover-effect:hover {
          color: #f8f9fa !important;
          transform: translateX(5px);
          transition: 0.2s;
        }
        .menu-item-label {
          transition: opacity 0.2s ease;
        }
        .sidebar.collapsed .menu-item-label {
          opacity: 0;
        }
        .sidebar.expanded .menu-item-label {
          opacity: 1;
        }
      `}</style>
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
