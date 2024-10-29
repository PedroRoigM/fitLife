import { useState } from 'react';
import PersonalData from './components/PersonalData';
import FitData from './components/FitData';
import PayData from './components/PayData';
import './App.css';
function App() {
  const [createdUser, setCreatedUser] = useState(false);
  const [createdFitAccount, setCreatedFitAccount] = useState(false);
  const handleData = (values) => {
    setCreatedUser(true);
    fetch('https://fitLife.com/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values) // SE ENVIA EL OBJETO EN FORMATO JSON //
    })
      .then(response => response.json())
      .then(data => {
        alert(data); // RESPUESTA DE LA API SOBRE LA RECEPCION //
        setCreatedUser(true); // Update the state here
      })
      .catch(error => console.log(error));
  }
  const handleFitAccount = async(values) => {
    try { // ACTUALIZA TODOS LOS CAMPOS MIENTRAS QUE EL PATH SOLO ACTUALIZA LOS CAMPOS QUE SE LE INDICAN //
      const response = await fetch('https://fitLife.com/post',
          {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values)
          });
      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Error updating data:', error);
  }
  setCreatedFitAccount(true);
  }
  const handlePayData = async(values) => {
    try {
      const response = await fetch('https://fitLife.com/post',
          {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values)
          });
      const data = await response.json();
      console.log(data);
    } catch (error) {
        console.error('Error updating data:', error);
    }
    setCreatedFitAccount(false);
    setCreatedUser(false);
  }
  return (
    <div className="App">
      {!createdUser ? <PersonalData handleData={handleData} /> : null}
      {createdUser && !createdFitAccount ? <div><FitData handleData={handleFitAccount} /></div> : null}
      {createdFitAccount ? <div><PayData handleData={handlePayData} /></div> : null}
    </div>
  );
}

export default App;