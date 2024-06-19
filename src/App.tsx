import React, { useEffect } from 'react';
import { ApiManager } from './utils/API-axios/ApiManager';
import './App.css';
import Login from './screens/NotAuth/User/Login';
import { AuthProvider } from './context/auth.context';
import Home from './screens/NotAuth/Home';
import About from './screens/NotAuth/About';


function App() {

  return (
    <AuthProvider>
      <About />
    </AuthProvider>
  );
}

export default App;
