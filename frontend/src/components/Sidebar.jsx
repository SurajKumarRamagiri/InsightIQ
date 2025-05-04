import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaBook, FaQuestionCircle, FaBolt, FaFileAlt, FaCog, FaBars, FaSearch, FaBookOpen, FaTimes, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ darkMode, setDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData({ name: res.data.name, email: res.data.email });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: <FaBook />, path: '/dashboard' },
    { label: 'My Documents', icon: <FaFileAlt />, path: '/docs' },
    { label: 'Chat with Docs', icon: <FaBolt />, path: '/chat' },
    { label: 'Quizzes', icon: <FaQuestionCircle />, path: '/quizzes' },
    { label: 'Flashcards', icon: <FaBookOpen />, path: '/flashcards' },
    { label: 'Portfolio', icon: <FaUserCircle />, path: '/portfolio' },
    { label: 'Settings', icon: <FaCog />, path: '/settings' },
    {
      label: darkMode ? 'Light Mode' : 'Dark Mode',
      icon: darkMode ? <FaSun /> : <FaMoon />,
      action: () => setDarkMode(!darkMode)
    },
    {
      label: 'Logout',
      icon: <FaSignOutAlt />,
      action: handleLogout
    }
  ];

  const iconSize = sidebarOpen ? 30 : 20;

  return (
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
            <h5 className="mt-2 text-white">Welcome, {userData.name}</h5>
            <p className="text-light small">{userData.email}</p>
          </div>
        )}

        {/* Menu Items */}
        <ul className="nav flex-column">
          {menuItems.map((item, i) => (
            <li className="nav-item mb-3" key={i}>
              {item.path ? (
                <Link to={item.path} className="nav-link text-white hover-effect d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
                  {React.cloneElement(item.icon, { size: iconSize })}
                  <span className={`menu-item-label ${sidebarOpen ? 'd-inline' : 'd-none'}`}>{item.label}</span>
                </Link>
              ) : (
                <button
                  className="btn btn-link nav-link text-white hover-effect d-flex align-items-center gap-2 justify-content-center justify-content-md-start p-0"
                  onClick={item.action}
                  type="button"
                >
                  {React.cloneElement(item.icon, { size: iconSize })}
                  <span className={`menu-item-label ${sidebarOpen ? 'd-inline' : 'd-none'}`}>{item.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Styles */}
      <style>{`
        .sidebar {
          transition: width 0.3s ease;
          overflow: hidden;
          padding: 2rem 1rem;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          height: 100vh;
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

export default Sidebar;
