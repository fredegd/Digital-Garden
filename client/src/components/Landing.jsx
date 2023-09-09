import React from "react";

import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import axios from "axios"; // Import Axios

import sourceImage from "../assets/saved-artwork.svg";
import Artwork from "./Artwork";

import "./Landing-styles.css";
import DrawerBGChange from "./DrawerBGChange";

export default function Landing() {
  // Constants to define the number of rows and columns
  //the amount of rows and columns is defined by the screen orientation and size
  const numRows = window.innerHeight > window.innerWidth ? 7 : 9;
  const numCols = window.innerHeight > window.innerWidth ? 9 : 7;
  const maxScale = 1.0;
  //State variables to store the background image and the SVG data
  const [bgImage, setBgImage] = useState(sourceImage);

  // State variables to store mouse positions
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // State variable to store the fill color
  const [svgFillColor, setSvgFillColor] = useState("#000"); // Default fill color

   // fetch "../assets/saved-artwork.svg" and set it the bgImage state variable
  //  useEffect(() => {
  //   async function fetchSvg() {
  //  await fetch("../assets/saved-artwork.svg")
  //     .then((response) => response.text())
  //     .then((data) => {
  //       setBgImage(data);
  //     });
  //   }
  //   fetchSvg();
  // }, []);


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
      image.src = bgImage; // Set the source of your image

      // Once the image is loaded, set it as the background image for each square
      
        squares.forEach((square) => {
          square.style.backgroundImage = `url(${bgImage})`;
          square.style.backgroundPosition = `${image.width / 2}px ${
            image.height / 2
          }px`;
        });
      

      function handleMouseMove(e) {
        const containerRect = container.getBoundingClientRect();
        const tileWidth = containerRect.width / numCols;
        const tileHeight = containerRect.height / numRows;
        const newMouseX =
          e.clientX - containerRect.width * 0.5 - tileWidth * 0.5;
        const newMouseY =
          e.clientY - containerRect.height * 0.5 - tileHeight * 0.5;

        setMouseX(newMouseX);
        setMouseY(newMouseY);

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
          const distance = Math.sqrt(
            (newMouseX - xt) ** 2 + (newMouseY - yt) ** 2
          );
          const multiplier = Math.min(
            maxScale,
            maxScale *
              Math.abs(
                map(distance, 0, containerRect.width / 2, 3 / Math.sqrt(2), 0)
              )
          );

          square.style.width = `${tileWidth * 1}px`; // instead of 1, use multiplier
          square.style.height = `${tileHeight * 1}px`; // instead of 1, use multiplier
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
          square.style.backgroundSize = `${
            containerRect.width * multiplier
          }px ${containerRect.height * multiplier}px`;
          square.style.transform = `translate(${
            (-tileWidth / 2) * multiplier + tileWidth / 2
          }px, ${(-tileHeight / 2) * multiplier + tileHeight / 2}px)`;
        });
      }
      
      // Attach the mousemove event to the document object
      document.addEventListener("mousemove", handleMouseMove);
      
    
    return () => {
      // Remove the mousemove event listener when component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      container.innerHTML = "";
    };
  
  }, [sourceImage]);

  function map(value, fromLow, fromHigh, toLow, toHigh) {
    return (
      ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow
    );
  }

  const textStyle = {
    zIndex: "1000",
    color: "#000",
    // backgroundColor: "#f1f1f1",
    // mixBlendMode: "difference",
  };

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to change the SVG fill color to a random color
  const changeSvgFillColor = () => {
    const newColor = getRandomColor();
    setSvgFillColor(newColor);
  };

  return (
    <div className="big-container">
      <div style={textStyle}>
        <DrawerBGChange bgImage={bgImage} setBgImage={setBgImage} />{" "}
      </div>

      <div className="intro">
        <h1 style={textStyle}>Fred Egidi</h1>
        <h2 style={textStyle}>
          <Typewriter
            options={{
              strings: [
                "Creative Web developer  ",
                "welcome to my digital garden  ",
                "greetings from Berlin Germany ",
                "   .",
                "apologies for the inconvenience",
              ],
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
                .deleteAll();
              // .callFunction(() => {
              //   console.log("All strings were deleted");
              // })
              //.start();
            }}
          />
        </h2>
      </div>

      <div className="container" id="container"></div>
    </div>
  );
}
