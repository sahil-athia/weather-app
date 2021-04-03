import './App.css';
import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'; 

function App() {
  const [data, setData] = useState(false)
  const [location, setLocation] = useState("") 
  const [error, setError] = useState(false)
  useEffect(() => {
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API}&q=${location}&aqi=no`)
      .then(response => {
        setData(response.data)
        setError(false)
      })
      .catch(e => setError(true))
  }, [location])

  
  const handleSubmit = (event) => {
      event.preventDefault() 
      
  }

  return (
    <div className="App">
      <Form onSubmit={handleSubmit} >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Select Your Location</Form.Label>
          <Form.Control 
            placeholder="Location:"
            type="text"
            name="location"
            value={location}
            onChange={event => setLocation(event.target.value)}
          />
        </Form.Group>
      </Form>
      {error && <div>The weather for this location could not be found</div>}
      {data && !error && <div>{data.location.name}</div>}
    </div>
  );
}

export default App;
