const FAR = "FAR"
const CEL = "CEL"

export default function Temp(props) {
  const text = "change"

  const switchTemp = () => {
    const type = props.temp === CEL ? FAR : CEL 
    props.setTemp(type)
  }
  return (
    <div>
      <button onClick={switchTemp}>{text}</button>
      <h4>it is: {props.cel} degrees celcius</h4>
      <h4>it is: {props.far} degrees fahrenheit</h4>
    </div>
  )
}