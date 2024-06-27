import { useState } from "react";

const Card = ({ comments = 0 }) => {

  const [likes, setLikes] = useState(0);
  
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "300px",
    height: "200px",
    margin: "auto",
    marginTop: "50px",
    padding: "20px",
    backgroundColor: "gray",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "purple",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={cardStyle}>
      <h2>Card Title</h2>
      <p>This is some text inside the card.</p>

      <h3>Comments{comments} </h3>
      <h3>
        <button style={buttonStyle} onClick={()=> setLikes(likes+1)}>Like</button>
        {likes}
      </h3>
    </div>
  );
};

export default Card;
