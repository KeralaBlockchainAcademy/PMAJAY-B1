import { useState } from "react";
import Demo from "./Demo";
import Card from './Card'
import "./App.css";

function App() {
  const name = "vinesh";
  const x = 5;
  const y = 6;
  const style_h1 = {
    color: "blue",
    fontSize: "40px",
  };
  const colors = ["red", "green", "blue", "yellow"];
  const loggedIn = false;

  const [counter, setCounter] = useState(0)
  
  const handleClick = () => {
    setCounter(counter+1)
  };
  

  return (

    <>
    <Demo num={8}   style={style_h1}/>
    <Demo num={100} likes={14}/>
    <Demo num={100} likes={5}/>
      <p style={{ color: "red", fontSize: "30px" }}>
        sum of {x} and {y} is {x + y}
      </p>
      <h1 style={style_h1}>Hello {name}</h1>
      <div className="kba">KBA</div>
      <ul>
        <li>{colors[0]}</li>
        <li>{colors[1]}</li>
        <li>{colors[2]}</li>
      </ul>
      <br />
      <ul>
        {colors.map((color) => (
          <li>{color}</li>
        ))}
      </ul>

      {loggedIn ? <h1>Hello {name}</h1> : <h1>Hello User</h1>}
      {x > 2 && <h1>Good morning</h1>}  

      <button style={style_h1} onClick={handleClick} >{counter}</button>
      <Card comments={10} />
      <Card comments={15} />

    </>


  );
}

export default App;
