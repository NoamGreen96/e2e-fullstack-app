import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2>Hello!</h2>
      <p className="subtitle">You are now logged in</p>
      <button className="login-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;