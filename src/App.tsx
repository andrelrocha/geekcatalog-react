import React, { useEffect } from 'react';
import { ApiManager } from './utils/API-axios/ApiManager';
import './App.css';
import { AuthProvider } from './context/auth.context';
import AppRouter from './routes/routes';


function App() {

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
