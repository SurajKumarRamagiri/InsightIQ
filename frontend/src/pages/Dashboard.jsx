import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle, FaBook, FaQuestionCircle, FaBolt, FaFileAlt, FaBars, FaSearch, FaBookOpen, FaTimes } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For navigation

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Study Progress',
        data: [20, 40, 60, 80, 100, 75, 90],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

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
    { label: 'Settings', icon: <FaBars />, path: '/settings' }
  ];

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
                  {item.icon}
                  {sidebarOpen && <span>{item.label}</span>}
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
          <button className="btn btn-danger rounded-pill px-4" onClick={handleLogout}>Logout</button>
        </div>

        {/* Dark Mode */}
        <div className="d-flex justify-content-end mb-4">
          <button className="btn btn-outline-secondary rounded-pill" onClick={() => setDarkMode(!darkMode)}>
            Toggle Dark Mode
          </button>
        </div>

        {/* Stats */}
        <div className="row g-4 mb-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Chart */}
        <div className="card shadow-lg p-4 mb-4 rounded-4">
          <h5 className="fw-bold mb-3">Learning Progress</h5>
          <div style={{ height: '200px' }}>
            <Line data={chartData} />
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
