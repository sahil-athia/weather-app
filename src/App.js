import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'; 

function App() {
  useEffect(() => {
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API}&q=London&aqi=no`)
      .then(response => console.log(response))
  }, [])


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
