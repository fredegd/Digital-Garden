import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

import "./Landing-styles.css";
import DrawerBGChange from "./DrawerBGChange";

export default function Landing() {

  const [gridSize, setGridSize] = useState({ numRows: 11, numCols: 7 });

  const calculateGridSize = () => {
    const newNumRows = window.innerHeight > window.innerWidth ? 11 : 7;
    const newNumCols = window.innerHeight > window.innerWidth ? 7 : 11;
    console.log(newNumRows, newNumCols)
    return { numRows: newNumRows, numCols: newNumCols };
  };
  const maxScale = 1.0;
  //State variables to store the background image and the SVG data

  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const svgData = localStorage.getItem("svgData");
    if (svgData) {
      setBgImage(svgData);
    }
  }, []);



  // State variables to store mouse positions
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // State variable to store the fill color

  useEffect(() => {
    setGridSize(calculateGridSize());

    const container = document.getElementById("container");

    container.style.setProperty("--num-rows", gridSize.numRows);
    container.style.setProperty("--num-cols", gridSize.numCols);
    container.style.setProperty(
      "grid-template-columns",
      `repeat(${gridSize.numCols},1fr )`
    );
    container.style.setProperty(
      "grid-template-rows",
      `repeat(${gridSize.numRows},1fr )`
    );

    // Create the squares
    const createSquare = () => {
      const square = document.createElement("div");
      square.classList.add("square");
      container.appendChild(square);
      return square;
    };

    const squares = Array.from({ length: gridSize.numRows * gridSize.numCols }, createSquare);

    if (bgImage) {
    squares.forEach((square) => {
      square.style.backgroundImage = `url(data:image/svg+xml;base64,${btoa(
        bgImage
      )})`;
      square.style.backgroundPosition = "center";
      // square.style.backgroundImage = `url(${bgImage.src})`;
      // square.style.backgroundPosition = `${bgImage.width / 2}px ${
      //   bgImage.height / 2
      // }px`;
    });
  }

    function handleMouseMove(e) {
      const containerRect = container.getBoundingClientRect();
      const tileWidth = containerRect.width / gridSize.numCols;
      const tileHeight = containerRect.height / gridSize.numRows;
      const newMouseX = e.clientX - containerRect.width * 0.5 - tileWidth * 0.5;
      const newMouseY =
        e.clientY - containerRect.height * 0.5 - tileHeight * 0.5;

      setMouseX(newMouseX);
      setMouseY(newMouseY);

      squares.forEach((square, index) => {
        const row = Math.floor(index / gridSize.numCols);
        const col = index % gridSize.numCols;
        const xt = map(
          col,
          0,
          gridSize.numCols,
          -containerRect.width / 2,
          containerRect.width / 2
        );
        const yt = map(
          row,
          0,
          gridSize.numRows,
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
        square.style.backgroundSize = `${containerRect.width * multiplier}px ${
          containerRect.height * multiplier
        }px`;
        square.style.transform = `translate(${
          (-tileWidth / 2) * multiplier + tileWidth / 2
        }px, ${(-tileHeight / 2) * multiplier + tileHeight / 2}px)`;
      });
    }


    function handleWindowResize() {
      setGridSize(calculateGridSize());
    }
  
    window.addEventListener("resize", handleWindowResize);

    // Attach the mousemove event to the document object
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Remove the mousemove event listener when component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleWindowResize);

      container.innerHTML = "";
    };
  }, [bgImage]);

  function map(value, fromLow, fromHigh, toLow, toHigh) {
    return (
      ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow
    );
  }

  const textStyle = {
    zIndex: "100",
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

  return (
    <div className="big-container">
     

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
      <div style={textStyle}>
        <DrawerBGChange bgImage={bgImage} setBgImage={setBgImage} />{" "}
      </div>
      <div className="container" id="container"></div>
    </div>
  );
}
