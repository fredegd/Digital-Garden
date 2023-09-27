import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDarkMode } from "../context/DarkModeContext.jsx";
import { useTheme } from "@mui/material/styles";
//
//a function to generate Hex colors
const getRandomHexColor = (colName) => {
  console.log("a new color was generated");
  const hexChars = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexChars.length);
    color += hexChars[randomIndex];
  }
  localStorage.setItem(colName, color);
  return color;
};

const svgWidth = 250;
const svgHeight = 250;
const startString = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;
const endString = "</svg>";

function Artwork({ bgImage, setBgImage, color1, color2, setColor1, setColor2 }) {
  const theme = useTheme();
  const dk = useDarkMode();

  //bg color according to the theme dark or light
  const [bgColor, setBgColor] = useState(theme.palette.background.main);
  //
  const [bgString, setBgString] = useState(
    `<rect width="${svgWidth}" height="${svgHeight}" fill="${bgColor}"/>`
  );

  // Initial gridSize
  const [gridSize, setGridSize] = useState(
    localStorage.getItem("gridSize")
      ? parseInt(localStorage.getItem("gridSize"))
      : 4
  );
  // Initial segmentsAmount
  const [segmentsAmount, setSegmentAmount] = useState(
    localStorage.getItem("segmentsAmount")
      ? parseInt(localStorage.getItem("segmentsAmount"))
      : 7
  );

  const [maxSegmentAmount, setMaxSegmentAmount] = useState(
    gridSize > 2 ? Math.floor(gridSize * gridSize * 0.5) + gridSize : 2
  );

  // const [color1, setColor1] = useState(
  //   localStorage.getItem("col1")
  //     ? localStorage.getItem("col1")
  //     : getRandomHexColor("col1")
  // );
  // const [color2, setColor2] = useState(
  //   localStorage.getItem("col2")
  //     ? localStorage.getItem("col2")
  //     : getRandomHexColor("col2")
  // );



  const extractStrokesFromSVG = () => {
    const regex = /<line [^>]*\/>/g;
    if (bgImage) {
      // console.log("bgImage passed to extractStrokesFromSVG");
      const matches = bgImage.match(regex);
      if (matches) {
        const strokes = matches.join("");
        // console.log("match!");
        return strokes;
      }
    } else {
      console.log("no bgImage");
    }
  };

  //if no bgImage in local storage, draw once and store on local storage

  const drawStrokes = () => {
    const pointSize = svgWidth / gridSize;

    let tempString = "";
    for (let i = 0; i < 2; i++) {
      const col = i % 2 === 0 ? color1 : color2;

      let startIndex = Math.floor(Math.random() * gridSize ** 2);
      let currentIndex = startIndex;
      const visitedPoints = new Set();

      for (let j = 0; j < segmentsAmount; j++) {
        const startX = (currentIndex % gridSize) * pointSize + pointSize / 2;
        const startY =
          Math.floor(currentIndex / gridSize) * pointSize + pointSize / 2;

        visitedPoints.add(currentIndex);

        let nextIndex;
        do {
          nextIndex =
            (currentIndex +
              Math.floor(Math.random() * (gridSize ** 2 - 2)) +
              1) %
            gridSize ** 2;
        } while (visitedPoints.has(nextIndex));

        const endX = (nextIndex % gridSize) * pointSize + pointSize / 2;
        const endY =
          Math.floor(nextIndex / gridSize) * pointSize + pointSize / 2;
        let sw = Math.random() * 5 + 5;

        currentIndex = nextIndex;

        tempString += `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`;
      }
    }

    console.log("new strokesString");
    return tempString;
  };
  const svgData = localStorage.getItem("svgData");

  const [strokesString, setStrokesString] = useState(
    bgImage ? extractStrokesFromSVG() : drawStrokes()
  );

  useEffect(() => {
    const svgDataString =
      startString +
      `<rect width="${svgWidth}" height="${svgHeight}" fill="${theme.palette.background.main}"/>` +
      strokesString +
      endString;

    localStorage.setItem("bgColor", theme.palette.background.main); // Save bgColor
    setBgColor(theme.palette.background.main);

    setBgString(
      `<rect width="${svgWidth}" height="${svgHeight}" fill="${theme.palette.background.main}"/>`
    );

    if (svgDataString) {
      // console.log("done");
      localStorage.setItem("svgData", svgDataString);
      setBgImage(svgDataString);
    }
  }, [dk, gridSize, segmentsAmount, color1, color2, strokesString]);

  //this function checks if there is a bgImage in local storage, if not, it draws one and stores it
  useEffect(() => {
    const svgData = localStorage.getItem("svgData");

    if (svgData) {
      setBgImage(svgData);
      // console.log("svgData was read from LS", svgData);
    }
  }, [bgImage, color1, color2]);

  const saveDataLocally = (svgData) => {
    try {
      // Store the SVG data in localStorage
      localStorage.setItem("bgColor", bgColor); // Save bgColor
      localStorage.setItem("col1", color1); // Save col1
      localStorage.setItem("col2", color2); // Save col2
      localStorage.setItem("gridSize", gridSize); // Save gridSize
      localStorage.setItem("segmentsAmount", segmentsAmount); // Save segmentsAmount
      localStorage.setItem("svgData", svgData);
      console.log("SVG data saved locally.");
    } catch (error) {
      console.error("Error while saving SVG data locally:", error);
    }
  };

  const handleDrawAndStore = () => {
    console.log("getting a call", bgString);
    let svgString = startString + bgString + drawStrokes() + endString;
    saveDataLocally(svgString);
    setBgImage(svgString);
  };

  const handleColorChange = (colorKey, setter) => {
    const newColor = getRandomHexColor(colorKey);
    console.log(newColor);
    setter(newColor);
    localStorage.setItem(colorKey, newColor);
  };

  const handleGridSizeChange = (event, newValue) => {
    setGridSize(newValue);
    localStorage.setItem("gridSize", newValue); // Save gridSize

    setMaxSegmentAmount(
      newValue > 2 ? Math.floor(newValue * newValue * 0.5 + newValue) : 2
    );
    const newAmountOfStrokes = Math.min(
      newValue > 2 ? Math.floor(newValue * newValue * 0.5 + newValue) : 2,
      segmentsAmount
    );
    // console.log(newAmountOfStrokes);

    setSegmentAmount(newAmountOfStrokes);
    localStorage.setItem("segmentsAmount", newAmountOfStrokes); // Save segmentsAmount
  };

  const handleNumStrokesChange = (event, newValue) => {
    setSegmentAmount(newValue);
    localStorage.setItem("segmentsAmount", newValue); // Save segmentsAmount
  };

  const handleHardSave = () => {
    if (p5CanvasRef.current) {
      const svgData = localStorage.getItem("svgData");
      if (!svgData) {
        console.error("SVG data not found in local storage.");
        return;
      }

      // Create a Blob from the local stored SVG data
      const blob = new Blob([svgData], { type: "image/svg+xml" });

      // Create a download link
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);

      // Set the file name for the download
      a.download = "stored_artwork.svg";

      // Programmatically trigger the download
      a.click();
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <Box sx={{ width: 300 }}>
          {/* <div ref={canvasRef} onClick={handleDrawAndStore} className="canvas"> */}
          <div onClick={handleDrawAndStore} className="canvas">
            <Typography variant="p" align="right">
              {" "}
              Tap to Generate a new Pattern
            </Typography>
            {/* an element displaying the content of bgImage */}
            <div
              dangerouslySetInnerHTML={{ __html: bgImage }}
              style={{ width: "125px" }}
            ></div>
          </div>
        </Box>
        <Box sx={{ width: 250 }}>
          <Typography>
            Matrix Grid Size: {gridSize}x{gridSize}
          </Typography>
          <Slider
            aria-label="gridSize"
            value={gridSize}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={2}
            max={6}
            onChange={handleGridSizeChange}
          />
        </Box>

        <Box sx={{ width: 250 }}>
          <Typography>Segment Amount: {segmentsAmount}</Typography>
          <Slider
            aria-label="segmentsAmount"
            value={segmentsAmount}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={2}
            max={maxSegmentAmount}
            onChange={handleNumStrokesChange}
          />
        </Box>

        <Box sx={{ width: 300, mt: "2rem" }}>
          <Button
            onClick={() => handleColorChange("col1", setColor1)}
            style={{ background: `${color1}`, width: "125px" }}
          >
            Color 1
          </Button>

          <Button
            onClick={() => handleColorChange("col2", setColor2)}
            style={{ background: `${color2}`, width: "125px" }}
          >
            Color 2
          </Button>
        </Box>

        <Box sx={{ width: 300, mt: "2rem" }}>
          <Button onClick={handleHardSave} style={{ width: "125px" }}>
            save SVG
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Artwork;
