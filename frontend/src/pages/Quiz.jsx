import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Quiz = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`d-flex min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow-1 p-4">
        <h1>Quiz Page</h1>
        <p>This is the quiz page. Quiz content will go here.</p>
      </div>
    </div>
  );
};

export default Quiz;
