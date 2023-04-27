import React from "react";

export default function Die(props) {
  const dieStyle = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die" style={dieStyle} onClick={props.holdDice}>
      {props.value}
    </div>
  );
}
