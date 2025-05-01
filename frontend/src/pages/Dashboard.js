import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle, FaBook, FaQuestionCircle, FaBolt, FaFileAlt, FaBars, FaSearch } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Toast, ToastContainer } from 'react-bootstrap';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Track the state of the sidebar (open or closed)

  // Chart Data for Progress Tracking
  const data = {
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
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow for custom sizing
    plugins: {
      title: {
        display: true,
        text: 'Learning Progress Over Time'
      }
    }
  };

  // Function to trigger the toast (for example, after uploading a document)
  const handleUpload = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Logout function to clear session/token and redirect to login page
  const handleLogout = () => {
    // Clear user session or token (from localStorage, sessionStorage, or cookies)
    localStorage.removeItem('authToken'); // Or use sessionStorage if applicable

    // Redirect to login page
    window.location.href = '/login'; // Redirecting to login page after logout
  };

  return (
    <div className={`d-flex min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      {/* Sidebar */}
      <div className={`sidebar shadow-sm ${darkMode ? 'bg-secondary' : 'bg-primary'}`} style={{ width: sidebarOpen ? '260px' : '0' }}>
        <div className="text-center mb-4">
          <FaUserCircle size={60} className="text-white" />
          <h5 className="mt-2 text-white">Welcome, Learner</h5>
          <p className="text-light small">you@example.com</p>
        </div>
        <ul className="nav flex-column">
          {['Dashboard', 'My PDFs', 'Chat with Docs', 'Quizzes', 'Flashcards', 'Portfolio', 'Settings'].map((item, i) => (
            <li className="nav-item mb-2" key={i}>
              <a className="nav-link text-white hover-effect" href="#">{item}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {/* Header with Hamburger */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-outline-light" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars size={30} />
          </button>
          <div>
            <h1 className="fw-bold text-primary" style={{ fontSize: '3rem' }}>InsightIQ Dashboard</h1> {/* Increased font size */}
            <p className="text-muted" style={{ fontSize: '1.25rem' }}>Transforming reading into active learning</p> {/* Increased font size */}
          </div>
          <button className="btn btn-danger rounded-pill px-4" onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>

        {/* Dark Mode Toggle */}
        <div className="d-flex justify-content-end mb-4">
          <button className="btn btn-outline-secondary rounded-pill" onClick={() => setDarkMode(!darkMode)}>
            Toggle Dark Mode
          </button>
        </div>

        {/* Stats */}
        <div className="row g-4 mb-4">
          <StatCard icon={<FaFileAlt />} label="Documents" value="12" color="primary" />
          <StatCard icon={<FaBolt />} label="Explanations" value="34" color="success" />
          <StatCard icon={<FaQuestionCircle />} label="Quizzes" value="7" color="warning" />
          <StatCard icon={<FaBook />} label="Flashcards" value="18" color="info" />
        </div>

        {/* Progress Chart (Reduced Height) */}
        <div className="card shadow-lg p-4 mb-4 rounded-4">
          <h5 className="fw-bold mb-3">Learning Progress</h5>
          <div style={{ height: '200px' }}>
            <Line data={data} options={options} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="input-group">
            <span className="input-group-text"><FaSearch /></span>
            <input type="text" className="form-control" placeholder="Search documents, quizzes..." />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card shadow-lg p-4 mb-4 rounded-4">
          <h5 className="fw-bold mb-3">Quick Actions</h5>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-outline-primary rounded-pill px-4" onClick={handleUpload}>
              Upload PDF
            </button>
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

      {/* Toast Notifications */}
      <ToastContainer position="top-end" style={{ zIndex: 1050, position: 'absolute' }}>
        {showToast && (
          <Toast>
            <Toast.Body>Document uploaded successfully!</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      {/* Custom CSS */}
      <style jsx>{`
        .sidebar {
          transition: width 0.3s ease-in-out;
          overflow: hidden;
          padding: 2rem 1.5rem;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
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

// StatCard Component
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
