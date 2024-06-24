import React from 'react';
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
