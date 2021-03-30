import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'; 

function App() {
  const [data, setData] = useState(false)
  useEffect(() => {
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API}&q=London&aqi=no`)
      .then(response => setData(response.data))
  }, [])

  return (
    <div className="App">
      {data && <div>{data.location.name}</div>}
    </div>
  );
}

export default App;
