import './App.scss';
import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'; 
import classNames from 'classnames';
import Temp from "./components/Temp"

function App() {
  const [temp, setTemp] = useState("CEL")
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

  const curr_hour = () => {
    let hour;
    const str = data.location.localtime; 
    if(str.length === 16) {
      hour = str[11] + str[12]
    } else if(str.length === 15) {
      hour = str[11]
    }
    
    return Number(hour)
  }

  const curr_time = () => {
    let hour;
    const str = data.location.localtime; 
    if(str.length === 16) {
      hour = str[11] + str[12] + str[13] + str[14] + str[15]
    } else if(str.length === 15) {
      hour = str[11] +  str[12] + str[13] + str[14]
    }
    
    return hour
  }

  const hour = data ? curr_hour() : ""


  const appClass = classNames("app", {
    'app--morning': 7 < hour && hour < 17,
    'app--sunrise': 6 <= hour && hour <=7,
    'app--sunset': 17 <= hour && hour <= 18,
    'app--evening': 18 < hour && hour < 21,
    'app--night': (21 <= hour && hour <= 24) || 0 < hour && hour < 6
  });

  console.log(temp)
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
          <span className="location">{data.location.name}</span> <br></br>
          <p className="time">Local Time: {curr_time()}</p>

          <div className="weather">
            <img src={data.current.condition.icon}></img> 
            <p>{data.current.condition.text}</p> 
          </div>

          <Temp 
            cel={data.current.feelslike_c}
            far={data.current.feelslike_f}
            temp={temp}
            setTemp = {setTemp}
          />

          <div className="info-box">
            <p>Percipitation: {data.current.precip_mm}</p>
            <p>UV Index: {data.current.uv}</p>
          </div>
      </div>}
    </div>
  );
}

export default App;
