import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <img
        alt="not-found"
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/280x200?text=404+Not+Found';
        }}
      />
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-sub">The page you're looking for doesn't exist.</p>
      <button className="not-found-btn" onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
