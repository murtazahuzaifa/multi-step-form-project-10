import React from 'react';
import style from './App.module.css';
import StepperForm from './StepperForm';

function App() {
  return (
    <div className={`${style.appContainer}`} >
      <StepperForm/>
    </div>
  );
}

export default App;
