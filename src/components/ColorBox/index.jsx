/** @format */

import React, { useState } from "react";
import "./ColorBox.scss";

ColorBox.propTypes = {};
function getRandomColor() {
  const COLOR_LIST = ["yellow", "red", "blue", "green", "black"];
  const randomIndexColor = Math.trunc(Math.random() * COLOR_LIST.length);
  return COLOR_LIST[randomIndexColor];
}

function ColorBox() {
  const [color, setColor] = useState(() => {
    const initialColor = localStorage.getItem("box-color") || "deeppink";
    return initialColor;
  });
  function handleBoxClick() {
    const newColor = getRandomColor();
    setColor(newColor);
    localStorage.setItem("box-color", newColor);
  }
  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={handleBoxClick}></div>
  );
}

export default ColorBox;
