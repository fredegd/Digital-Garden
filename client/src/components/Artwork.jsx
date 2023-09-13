import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Artwork-styles.css"

function Artwork({ bgImage, setBgImage }) {
  const canvasRef = useRef(null);
  const p5CanvasRef = useRef(null); // Declare p5CanvasRef here

  const getRandomHexColor = () => {
    const hexChars = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * hexChars.length);
      color += hexChars[randomIndex];
    }
    return color;
  };

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

const[ maxSegmentAmount, setMaxSegmentAmount]= useState(Math.floor(gridSize*gridSize*0.5))



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

  useEffect(() => {
    const sketch = (p) => {
      const svgWidth = 300;
      const svgHeight = 300;
      p.setup = () => {
        p.createCanvas(svgWidth, svgHeight).parent(canvasRef.current);

        // Load and parse the SVG string
        const svgElement = new DOMParser().parseFromString(
          bgImage,
          "image/svg+xml"
        );
        const svgLines = svgElement.querySelectorAll("line");
        // Loop through each line in the SVG and draw it onto the canvas
        svgLines.forEach((line) => {
          const x1 = parseFloat(line.getAttribute("x1"));
          const y1 = parseFloat(line.getAttribute("y1"));
          const x2 = parseFloat(line.getAttribute("x2"));
          const y2 = parseFloat(line.getAttribute("y2"));
          const stroke = line.getAttribute("stroke");
          const strokeWidth = parseFloat(line.getAttribute("stroke-width"));

          p.stroke(stroke);
          p.strokeWeight(strokeWidth);
          p.strokeCap(p.ROUND);
          p.line(x1, y1, x2, y2);
        });
      };

      const drawArtwork = (p) => {
        let svgString = "";
        svgString += `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;
        p.clear();

        const pointSize = p.width / gridSize;

        for (let i = 0; i < 2; i++) {
          const col = i % 2 === 0 ? color1 : color2;

          let startIndex = Math.floor(p.random(gridSize ** 2));
          let currentIndex = startIndex;
          const visitedPoints = new Set();

          for (let j = 0; j < segmentsAmount; j++) {
            const startX =
              (currentIndex % gridSize) * pointSize + pointSize / 2;
            const startY =
              Math.floor(currentIndex / gridSize) * pointSize + pointSize / 2;

            visitedPoints.add(currentIndex);

            let nextIndex;
            do {
              nextIndex =
                (currentIndex + Math.floor(p.random(gridSize ** 2 - 2)) + 1) %
                gridSize ** 2;
            } while (visitedPoints.has(nextIndex));

            const endX = (nextIndex % gridSize) * pointSize + pointSize / 2;
            const endY =
              Math.floor(nextIndex / gridSize) * pointSize + pointSize / 2;
            let sw = p.random(5) + 5;
            p.stroke(col);
            p.strokeWeight(sw);
            p.strokeCap(p.ROUND);

            p.line(startX, startY, endX, endY);

            currentIndex = nextIndex;

            svgString += `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`;
          }
        }
        p5CanvasRef;
        svgString += "</svg>";

        saveSVGLocally(svgString);
        setBgImage(svgString);
      };

      p.drawAndStoreLocal = () => {
        drawArtwork(p);
      };
    };

    const p5Canvas = new p5(sketch, canvasRef.current);
    p5CanvasRef.current = p5Canvas;

    return () => {
      p5Canvas.remove();
    };
  }, [gridSize, segmentsAmount, bgImage, color1, color2]);

  //if no bgImage in local storage, draw once and store on local storage
  useEffect(() => {
    const svgData = localStorage.getItem("svgData");

    if (svgData) {
      setBgImage(svgData);
    } else {
      handleDrawAndStore();
      console.log("no svgData");
    }
  }, []);

  const handleColor1Change = () => {
    const newColor = getRandomHexColor();
    setColor1(newColor);
    localStorage.setItem("col1", newColor); // Save col1
  };

  const handleColor2Change = () => {
    const newColor = getRandomHexColor();
    setColor2(newColor);
    localStorage.setItem("col2", newColor); // Save col2
  };

  const saveSVGLocally = (svgData) => {
    try {
      // Store the SVG data in localStorage
      localStorage.setItem("svgData", svgData);
      localStorage.setItem("gridSize", gridSize); // Save gridSize
      localStorage.setItem("segmentsAmount", segmentsAmount); // Save segmentsAmount
      localStorage.setItem("col1", color1); // Save col1
      localStorage.setItem("col2", color2); // Save col2
      console.log("SVG data saved locally.");
    } catch (error) {
      console.error("Error while saving SVG data locally:", error);
    }
  };

  const handleDrawAndStore = () => {
    p5CanvasRef.current.drawAndStoreLocal();
    // if (p5CanvasRef.current) {
    //   p5CanvasRef.current.drawAndStoreLocal();
    // }
  };

  const handleGridSizeChange = (event, newValue) => {

    setGridSize(newValue);
    localStorage.setItem("gridSize", newValue); // Save gridSize
    
    setMaxSegmentAmount(newValue>2? Math.floor(newValue*newValue*0.5+newValue):2)
    setNumStrokes(Math.floor(newValue*newValue*0.5));
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

      // Create a Blob from the stored SVG data
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
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ width: 300}}>

          <div ref={canvasRef} onClick={handleDrawAndStore} className="canvas">
          <Typography variant="p" align="right" > Tap to Generate a new Pattern</Typography>

          </div>
        </Box>
        <Box sx={{ width: 300 }}>
          <Typography>Matrix Grid Size: {gridSize}x{gridSize}</Typography>
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

        <Box sx={{ width: 300 }}>
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
            onClick={handleColor1Change}
            style={{ background: `${color1}`, width: "300px" }}
          >
            Color 1
          </Button>

          <Button
            onClick={handleColor2Change}
            style={{ background: `${color2}`, width: "300px" }}
          >
            Color 2
          </Button>
        </Box>

        <Box sx={{ width: 300, mt: "2rem" }}>
          <Button onClick={handleDrawAndStore} style={{ width: "300px" }}>
            Generate
          </Button>
          <Button onClick={handleHardSave} style={{ width: "300px" }}>
            save SVG
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Artwork;
