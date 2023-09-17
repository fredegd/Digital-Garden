import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Artwork-styles.css";
import { themeManager } from "../theme";
import { useDarkMode } from "../context/DarkModeContext.jsx";

// console.log(theme);

const getRandomHexColor = () => {
  const hexChars = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexChars.length);
    color += hexChars[randomIndex];
  }
  return color;
};

const svgWidth = 250;
const svgHeight = 250;
const startString = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;
const endString = "</svg>";

function Artwork({ bgImage, setBgImage }) {
  const { dk } = useDarkMode();

  const theme = themeManager(dk);
  const canvasRef = useRef(null);
  const p5CanvasRef = useRef(null); // Declare p5CanvasRef here

  const [strokesString, setStrokesString] = useState();

  // const strStringValue = () => {

  //   const extractStrokesFromSVG = () => {

  //     const regex = /<line [^>]*\/>/g;

  //     if (!bgImage) return;
  //     const matches = bgImage.match(regex);

  //     if (matches) {
  //       const matchesString = matches.join("");
  //       setStrokesString(matchesString);
  //       console.log("matchesString", matchesString);

  //     }else return
  //   };

  //   return extractStrokesFromSVG();
  // }
  // console.log(strStringValue);

  // useEffect(() => {
  //   const extractStrokesFromSVG = () => {
  //     const pg = bgImage;

  //     console.log("bg Image is already here",bgImage)
  //     const regex = /<line [^>]*\/>/g;

  //     const matches = pg.match(regex);

  //     if (matches) {
  //       const matchesString = matches.join("");
  //       setStrokesString(matchesString);
  //       console.log("matchesString", matchesString);

  //     }
  //   };

  //   bgImage && extractStrokesFromSVG();
  // }, [dk, bgImage]);

  //bg color according to the theme dark or light
  const [bgColor, setBgColor] = useState(theme.palette.background.default);
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
  const [segmentsAmount, setNumStrokes] = useState(
    localStorage.getItem("segmentsAmount")
      ? parseInt(localStorage.getItem("segmentsAmount"))
      : 7
  );

  const [maxSegmentAmount, setMaxSegmentAmount] = useState(
    Math.floor(gridSize * gridSize * 0.5)
  );

  const [color1, setColor1] = useState(
    localStorage.getItem("col1")
      ? localStorage.getItem("col1")
      : getRandomHexColor()
  );
  const [color2, setColor2] = useState(
    localStorage.getItem("col2")
      ? localStorage.getItem("col2")
      : getRandomHexColor()
  );

  //
  //

  useEffect(() => {
    setBgColor(theme.palette.background.default);
    localStorage.setItem("bgColor", theme.palette.background.default); // Save bgColor
    setBgString(
      `<rect width="${svgWidth}" height="${svgHeight}" fill="${theme.palette.background.default}"/>`
    );
    console.log(strokesString);
    setBgImage(startString + bgString + strokesString + endString);

    // localStorage.setItem("svgData",  startString + bgString + strokesString + endString
    // );//temporarily commented out

    console.log("new setBgImage, including", strokesString);
  }, [dk, theme.palette.background.default]);

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
    setStrokesString(tempString);
    return tempString;
  };

  // useEffect(() => {
  //   const sketch = (p) => {
  //     p.setup = () => {
  //       p.createCanvas(svgWidth, svgHeight).parent(canvasRef.current);

  //       // Load and parse the SVG string
  //       const svgElement = new DOMParser().parseFromString(
  //         bgImage,
  //         "image/svg+xml"
  //       );
  //       // Get all the lines from the SVG
  //       const svgLines = svgElement.querySelectorAll("line");

  //       p.background(bgColor); // here we call the background function whereas the svg data contains a rect element with a fill attribute

  //       // Loop through each line in the SVG and draw it onto the canvas
  //       svgLines.forEach((line) => {
  //         const x1 = parseFloat(line.getAttribute("x1"));
  //         const y1 = parseFloat(line.getAttribute("y1"));
  //         const x2 = parseFloat(line.getAttribute("x2"));
  //         const y2 = parseFloat(line.getAttribute("y2"));
  //         const stroke = line.getAttribute("stroke");
  //         const strokeWidth = parseFloat(line.getAttribute("stroke-width"));
  //         p.stroke(stroke);
  //         p.strokeWeight(strokeWidth);
  //         p.strokeCap(p.ROUND);
  //         p.line(x1, y1, x2, y2);
  //       });
  //     };

  //     // const drawArtwork = () => {
  //     //   console.log(bgString);
  //     //   let svgString = startString + bgString + drawStrokes() + endString;
  //     //   console.log("RATATA", svgString);
  //     //   saveSVGLocally(svgString);
  //     //   setBgImage(svgString);
  //     //   // p.setup();
  //     // };

  //     // p.drawAndStoreLocal = () => {
  //     //   drawArtwork(p);
  //     // };
  //   };

  //   const p5Canvas = new p5(sketch, canvasRef.current);
  //   p5CanvasRef.current = p5Canvas;

  //   return () => {
  //     p5Canvas.remove();
  //   };
  // }, [gridSize, segmentsAmount, color1, color2, bgColor, bgImage, dk]);

  useEffect(() => {
    const svgData = localStorage.getItem("svgData");

    if (svgData) {
      setBgImage(svgData);
      console.log("svgData was setfrom LS", svgData);
    } else {
      console.log("no svgData");
      handleDrawAndStore();
    }
  }, []);

  const handleColorChange = (setColor, colorKey) => {
    const newColor = getRandomHexColor();
    setColor(newColor);
    localStorage.setItem(colorKey, newColor);
  };

  const saveSVGLocally = (svgData) => {
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

  const drawArtwork = () => {
    console.log(bgString);
    let svgString = startString + bgString + drawStrokes() + endString;
    console.log("RATATA", svgString);
    saveSVGLocally(svgString);
    setBgImage(svgString);
    // p.setup();
  };

  const handleDrawAndStore = () => {
    drawArtwork();
    // p5CanvasRef.current.drawAndStoreLocal();
  };

  const handleGridSizeChange = (event, newValue) => {
    setGridSize(newValue);
    localStorage.setItem("gridSize", newValue); // Save gridSize

    setMaxSegmentAmount(
      newValue > 2 ? Math.floor(newValue * newValue * 0.5 + newValue) : 2
    );
    setNumStrokes(Math.floor(newValue * newValue * 0.5));
    localStorage.setItem("segmentsAmount", newValue); // Save segmentsAmount
  };

  const handleNumStrokesChange = (event, newValue) => {
    localStorage.setItem("segmentsAmount", newValue); // Save segmentsAmount

    setNumStrokes(newValue);
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
          <div ref={canvasRef} onClick={handleDrawAndStore} className="canvas">
            <Typography variant="p" align="right">
              {" "}
              Tap to Generate a new Pattern
            </Typography>
          </div>
        </Box>
        <Box sx={{ width: 250 }}>
          <Typography>
            Matrix Grid Size: {gridSize}x{gridSize}
          </Typography>
          <Slider
            aria-label="gridSize"
            defaultValue={gridSize}
            valueLabelDisplay="off"
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
            defaultValue={segmentsAmount}
            valueLabelDisplay="off"
            step={1}
            marks
            min={2}
            max={maxSegmentAmount}
            onChange={handleNumStrokesChange}
          />
        </Box>

        <Box sx={{ width: 300, mt: "2rem" }}>
          <Button
            onClick={() => handleColorChange(setColor1, "col1")}
            style={{ background: `${color1}`, width: "125px" }}
          >
            Color 1
          </Button>

          <Button
            onClick={() => handleColorChange(setColor2, "col2")}
            style={{ background: `${color2}`, width: "125px" }}
          >
            Color 2
          </Button>
        </Box>

        <Box sx={{ width: 300, mt: "2rem" }}>
          <Button onClick={handleHardSave} style={{ width: "125px" }}>
            save SVG
          </Button>
          {/* an element displaying the content of bgImage */}
          {/* <div
            dangerouslySetInnerHTML={{ __html: bgImage }}
            style={{ width: "125px" }}
          ></div> */}
        </Box>
      </Box>
    </div>
  );
}

export default Artwork;
