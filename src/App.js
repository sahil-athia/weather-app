import './App.scss';
import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'; 
import classNames from 'classnames';

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

  // console.log(data)

  const handleSubmit = (event) => {
      event.preventDefault() 
      
  }

  const curr_time = () => {
    let hour;
    const str = data.location.localtime;
    if(str.length === 16) {
      hour = str[11] + str[12]
    } else if(str.length === 15) {
      hour = str[11]
    }
    
    return Number(hour)
  }

  const time = data ? curr_time() : ""

  const appClass = classNames({
    'app--morning': 7 < time < 17,
    'app--sunrise': 6 <= time <=7,
    'app--sunset': 17 <= time <= 18,
    'app--evening': 18 < time < 21,
    'app--night': (21 <= time <= 24) || 0 < curr_time < 6
  });

  return (
    <div className={appClass}>
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
      {data && !error && 
      <div>
          <span>{data.location.name}</span> <br></br>
          <span>it is: {data.current.feelslike_c} degrees celcius</span>
          <img src={data.current.condition.icon}></img>
          <span>{curr_time()}</span>
      </div>}
    </div>
  );
}

export default App;
