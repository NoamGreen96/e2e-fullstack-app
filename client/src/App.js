import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      setMsg(`Success: ${data.message}`);
    } else {
      setMsg(`Error: ${data.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
          value={username} 
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input 
          type="password" 
          value={password} 
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default App;