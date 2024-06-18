import React, { useEffect } from 'react';
import { ApiManager } from './utils/API-axios/ApiManager';
import logo from './logo.svg';
import './App.css';
import { ButtonLoading, ButtonNavigation } from './components';
import { colors } from './utils/colors';


function App() {


  return (
    <div className="App">
      <ButtonLoading mt={2} backgroundColor={colors.buttonBlue} isLoading={false} variant='contained'>Test</ButtonLoading>
    </div>
  );
}

export default App;
