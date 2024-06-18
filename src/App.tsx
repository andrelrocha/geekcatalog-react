import React, { useEffect } from 'react';
import { ApiManager } from './utils/API-axios/ApiManager';
import logo from './logo.svg';
import './App.css';
import { ButtonLoading, ButtonNavigation } from './components';
import Login from './screens/NotAuth/User/Login';
import { colors } from './utils/colors';


function App() {


  return (
      <Login />
  );
}

export default App;
