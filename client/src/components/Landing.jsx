import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

import "./Landing-styles.css";
// import DrawerBGChange from "./DrawerBGChange";

export default function Landing({ open, setOpen, bgImage}) {
  // State variables to store mouse positions
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [gridSize, setGridSize] = useState({ numRows: 11, numCols: 7 });

  const calculateGridSize = () => {
    const newNumRows = window.innerHeight > window.innerWidth ? 11 : 7;
    const newNumCols = window.innerHeight > window.innerWidth ? 7 : 11;
    console.log(newNumRows, newNumCols);
    return { numRows: newNumRows, numCols: newNumCols };
  };
  const maxScale = 1.0;
  //State variables to store the background image and the SVG data

  // const [bgImage, setBgImage] = useState();

  // useEffect(() => {
  //   const svgData = localStorage.getItem("svgData");
  //   if (svgData) {
  //     setBgImage(svgData);
  //   }
  // }, []);

  // State variable to store the fill color

  useEffect(() => {
    setGridSize(calculateGridSize());

    const gridContainer = document.getElementById("gridContainer");

    gridContainer.style.setProperty("--num-rows", gridSize.numRows);
    gridContainer.style.setProperty("--num-cols", gridSize.numCols);
    gridContainer.style.setProperty(
      "grid-template-columns",
      `repeat(${gridSize.numCols},1fr )`
    );
    gridContainer.style.setProperty(
      "grid-template-rows",
      `repeat(${gridSize.numRows},1fr )`
    );

    // Create the squares
    const createSquare = () => {
      const square = document.createElement("div");
      square.classList.add("square");
      gridContainer.appendChild(square);
      return square;
    };

    const squares = Array.from(
      { length: gridSize.numRows * gridSize.numCols },
      createSquare
    );

    if (bgImage) {
      squares.forEach((square) => {
        square.style.backgroundImage = `url(data:image/svg+xml;base64,${btoa(
          bgImage
        )})`;
        square.style.backgroundPosition = "center";
      });
    }

    function handleMouseMove(e) {
      const gridContainerRect = gridContainer.getBoundingClientRect();
      const tileWidth = gridContainerRect.width / gridSize.numCols;
      const tileHeight = gridContainerRect.height / gridSize.numRows;
      const newMouseX =
        e.clientX - gridContainerRect.width * 0.5 - tileWidth * 0.5;
      const newMouseY =
        e.clientY - gridContainerRect.height * 0.5 - tileHeight * 0.5;

      setMouseX(newMouseX);
      setMouseY(newMouseY);

      squares.forEach((square, index) => {
        const row = Math.floor(index / gridSize.numCols);
        const col = index % gridSize.numCols;
        const xt = map(
          col,
          0,
          gridSize.numCols,
          -gridContainerRect.width / 2,
          gridContainerRect.width / 2
        );
        const yt = map(
          row,
          0,
          gridSize.numRows,
          -gridContainerRect.height / 2,
          gridContainerRect.height / 2
        );
        const distance = Math.sqrt(
          (newMouseX - xt) ** 2 + (newMouseY - yt) ** 2
        );
        const multiplier = Math.min(
          maxScale,
          maxScale *
            Math.abs(
              map(distance, 0, gridContainerRect.width / 2, 3 / Math.sqrt(2), 0)
            )
        );

        square.style.width = `${tileWidth * 1}px`; // instead of 1, use multiplier
        square.style.height = `${tileHeight * 1}px`; // instead of 1, use multiplier
        square.style.opacity = `${map(
          distance,
          0,
          gridContainerRect.width / 2,
          1.5,
          0.1
        )}`;

        // Calculate background position based on the square's position
        const bgX = gridContainerRect.width / 2 - xt;
        const bgY = gridContainerRect.height / 2 - yt;
        square.style.backgroundPosition = `${bgX}px ${bgY}px`;
        square.style.backgroundSize = `${
          gridContainerRect.width * multiplier
        }px ${gridContainerRect.height * multiplier}px`;
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

      gridContainer.innerHTML = "";
    };
  }, [bgImage]);

  // a function to map a value from one range to another range
  function map(value, fromLow, fromHigh, toLow, toHigh) {
    return (
      ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow
    );
  }


  return (
    <div className="big-container">
      <div className="intro">
        <h1 style={{ zIndex: "100" }}>Fred Egidi</h1>
        <h2 style={{ zIndex: "100" }}>
          <Typewriter
            options={{
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Full Stack Web developer  ")
                // .callFunction(() => {
                //   console.log("String typed out!");
                // })
                .pauseFor(2500)
                .deleteAll()
                .typeString("Creative Human  Being ")

                .pauseFor(250)
                .deleteChars(22)
                .typeString("Based in Berlin Germany ")
                .pauseFor(2500)
                .start();
              // .callFunction(() => {
              //   console.log("All strings were deleted");
              // })
              //.start();
            }}
          />
        </h2>
      </div>

      {/* <div style={{ zIndex: "1000" }}>
        <DrawerBGChange
          bgImage={bgImage}
          setBgImage={setBgImage}
          open={open}
          setOpen={setOpen}
        />{" "}
      </div> */}
      <div className="gridContainer" id="gridContainer"></div>
    </div>
  );
}
