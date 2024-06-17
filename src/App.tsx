import React, { useEffect } from 'react';
import { ApiManager } from './utils/API-axios/ApiManager';
import logo from './logo.svg';
import './App.css';

const checkServerAvailability = async () => {
  try {
      await ApiManager.get("/infra/ping");
      console.log("Server is online.");
  } catch (error) {
      console.error("Server is not available.");
      alert("Error: Server is not available.");
  }
}

function App() {
  useEffect(() => {
    checkServerAvailability();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
