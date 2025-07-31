import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      setMsg('');
      navigate('/home');
    } else {
      setMsg(`Error: ${data.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input 
            value={username} 
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      {msg && <p className="response-msg">{msg}</p>}
    </div>
  );
}

export default Login;
