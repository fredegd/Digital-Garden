import React from "react";

import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
// import sourceImage from "../src/assets/sonia-nadales-NCPlsNHBXqA-unsplash.jpeg";
// import sourceImage from "../assets/molnar-random.png";
import sourceImage from "../assets/zeichnung.svg";
import "./Landing-styles.css";

export default function Landing() {
  const numRows = 11;
  const numCols = 13;
  const maxScale = 1.0;
  let mouseX = 0;
  let mouseY = 0;

  useEffect(() => {
    const container = document.getElementById("container");

    container.style.setProperty("--num-rows", numRows);
    container.style.setProperty("--num-cols", numCols);
    container.style.setProperty(
      "grid-template-columns",
      `repeat(${numCols},1fr )`
    );
    container.style.setProperty(
      "grid-template-rows",
      `repeat(${numRows},1fr )`
    );

    // Create the squares
    const createSquare = () => {
      const square = document.createElement("div");
      square.classList.add("square");
      container.appendChild(square);
      return square;
    };

    const squares = Array.from({ length: numRows * numCols }, createSquare);

    // Load the image
    const image = new Image();
    image.src = sourceImage; // Set the source of your image

    // Once the image is loaded, set it as the background image for each square
    image.onload = () => {
      squares.forEach((square) => {
        square.style.backgroundImage = `url(${sourceImage})`;
        square.style.backgroundPosition = `${image.width / 2}px ${
          image.height / 2
        }px`;
      });
    };

    function handleMouseMove(e) {
      const containerRect = container.getBoundingClientRect();
      // console.log(containerRect, "domRect", mouseX, "MX", mouseY, "MY");
      const tileWidth = containerRect.width / numCols;
      const tileHeight = containerRect.height / numRows;
      mouseX = e.clientX - containerRect.width * 0.5 - tileWidth * 0.5;
      mouseY = e.clientY - containerRect.height * 0.5 - tileHeight * 0.5;

      squares.forEach((square, index) => {
        const row = Math.floor(index / numCols);
        const col = index % numCols;
        const xt = map(
          col,
          0,
          numCols,
          -containerRect.width / 2,
          containerRect.width / 2
        );
        const yt = map(
          row,
          0,
          numRows,
          -containerRect.height / 2,
          containerRect.height / 2
        );
        const distance = Math.sqrt((mouseX - xt) ** 2 + (mouseY - yt) ** 2);
        const multiplier = Math.min(
          maxScale,
          maxScale *
            Math.abs(
              map(distance, 0, containerRect.width / 2, 3 / Math.sqrt(2), 0)
            )
        );

        square.style.width = `${tileWidth * multiplier}px`;
        square.style.height = `${tileHeight * multiplier}px`;
        square.style.opacity = `${map(
          distance,
          0,
          containerRect.width / 2,
          1.5,
          0.1
        )}`;

        // Calculate background position based on the square's position
        const bgX = containerRect.width / 2 - xt;
        const bgY = containerRect.height / 2 - yt;
        square.style.backgroundPosition = `${bgX}px ${bgY}px`;
        square.style.backgroundSize = `${containerRect.width * multiplier}px ${
          containerRect.height * multiplier
        }px`;
        square.style.transform = `translate(${
          (-tileWidth / 2) * multiplier + tileWidth / 2
        }px, ${(-tileHeight / 2) * multiplier + tileHeight / 2}px)`;
      });
    }

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.innerHTML = "";
    };
  }, []);

  function map(value, fromLow, fromHigh, toLow, toHigh) {
    return (
      ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow
    );
  }

  const textStyle = {
    zIndex: "1000",
    color: "#000",
    backgroundColor: "#f1f1f1",
    mixBlendMode: "difference",
  };

  return (
    <div className="big-container">
      <div className="intro">
    
        <h1  style={textStyle}>
        Hi, my name is Fred Egidi,
        <Typewriter
       options={{
        strings: [ "I am a Creative Web developer", "welcome to my digital garden.", "greetings from Berlin Germany "  ],
        autoStart: true,
        loop: true,
      }}
          onInit={(typewriter) => {
            typewriter
              // .typeString()
              // .callFunction(() => {
              //   console.log("String typed out!");
              // })
              .pauseFor(2500)
              .deleteAll()
              // .callFunction(() => {
              //   console.log("All strings were deleted");
              // })
              .start();
          }}

          
        />
</h1>
      </div>
      <div className="container" id="container"></div>
    </div>
  );
}
