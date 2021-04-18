import "./Temp.scss"

const FAR = "FAR"
const CEL = "CEL"

export default function Temp(props) {
  const text = props.temp === CEL ? "change to fahrenheit" : "change to celcius"

  const switchTemp = () => {
    const type = props.temp === CEL ? FAR : CEL 
    props.setTemp(type)
  }
  return (
    <div>
      <button onClick={switchTemp}>{text}</button>
      {props.temp === CEL && <h1 className="temp">{props.cel}°C</h1>}
      {props.temp === FAR &&  <h1 className="temp">{props.far}°F</h1>}
    </div>
  )
}