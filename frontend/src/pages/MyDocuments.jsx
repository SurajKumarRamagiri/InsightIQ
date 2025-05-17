import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const MyDocuments = ({ darkMode, setDarkMode }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/upload', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDocuments(response.data);
      } catch (err) {
        setError('Failed to fetch documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return <div>Loading documents...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className={`d-flex min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow-1 p-4">
        <h2>My Documents</h2>
        {documents.length === 0 ? (
          <p>You have not uploaded any documents yet.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Upload Date</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.originalname}</td>
                  <td>{new Date(doc.uploadDate).toLocaleString()}</td>
                  <td>
                    <a
                      href={`http://localhost:5000/api/upload/download/${doc._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyDocuments;
