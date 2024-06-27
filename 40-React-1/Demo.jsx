import { useState } from "react";

function Demo({
  num,
  style = {
    color: "lime",
    fontSize: "20px",
  },
  likes = 0,


}) {
  const [count, setCount] = useState(num);

  return (
    <>
    <div style= {{ color: "red", fontSize: "30px", height: '50px', width:'50px'}}>
    
    </div>
    <button style={style} onClick={() => setCount(count + 2)}>
      {count}
    </button>
    <h1>Number of likes : {likes}</h1>
    </>
  );
}

export default Demo;
