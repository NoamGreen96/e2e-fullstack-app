function App() {
  return (
    <div >
      <h1>Login</h1>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" name="username" />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Login</button>
      </form>
    </div>
  );
}

export default App;