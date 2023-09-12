import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

function Artwork({ bgImage, setBgImage }) {
  const canvasRef = useRef(null);
  const p5CanvasRef = useRef(null); // Declare p5CanvasRef here
  // Initial gridSize
  const [gridSize, setGridSize] = useState(
    localStorage.getItem("gridSize")
      ? parseInt(localStorage.getItem("gridSize"))
      : 4
  );
  // Initial numStrokes
  const [numStrokes, setNumStrokes] = useState(
    localStorage.getItem("numStrokes")
      ? parseInt(localStorage.getItem("numStrokes"))
      : 7
  );

  useEffect(() => {
    const sketch = (p) => {
      const svgWidth = 400;
      const svgHeight = 400;
      p.setup = () => {
        p.createCanvas(svgWidth, svgHeight).parent(canvasRef.current);

        // Load and parse the SVG string
        const svgElement = new DOMParser().parseFromString(
          bgImage,
          "image/svg+xml"
        );
        const svgLines = svgElement.querySelectorAll("line");
        console.log(svgLines);
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
          const [color1, color2] = getRandomHexColors();
          const col = i % 2 === 0 ? color1 : color2;

          let startIndex = Math.floor(p.random(gridSize ** 2));
          let currentIndex = startIndex;
          const visitedPoints = new Set();

          for (let j = 0; j < numStrokes; j++) {
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
  }, [gridSize, numStrokes, bgImage]);

  //if no bgImage in local storage, draw once and store on local storage
  useEffect(() => {
    const svgData = localStorage.getItem("svgData");
    console.log(svgData);

    if (svgData) {
      setBgImage(svgData);
    } else {
      handleDrawAndStore();
      console.log("no svgData");
    }
  }, []);

  const getRandomHexColors = () => {
    const hexChars = "0123456789abcdef";
    const getRandomHexColor = () => {
      let color = "#";
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexChars.length);
        color += hexChars[randomIndex];
      }
      return color;
    };

    let color1, color2;

    do {
      color1 = getRandomHexColor();
      color2 = getRandomHexColor();
    } while (color1 === color2); // Ensure color2 is different from color1

    return [color1, color2];
  };

  const saveSVGLocally = (svgData) => {
    try {
      // Store the SVG data in localStorage
      localStorage.setItem("svgData", svgData);
      localStorage.setItem("gridSize", gridSize); // Save gridSize
      localStorage.setItem("numStrokes", numStrokes); // Save numStrokes
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
    console.log(event);
    localStorage.setItem("gridSize", newValue); // Save gridSize

    setGridSize(newValue);
  };

  const handleNumStrokesChange = (event, newValue) => {
    console.log(event);
    localStorage.setItem("numStrokes", newValue); // Save numStrokes

    setNumStrokes(newValue);
  };

  const handleHardSave = () => {
    if (p5CanvasRef.current) {
      const svgData = localStorage.getItem('svgData');
      if (!svgData) {
        console.error('SVG data not found in local storage.');
        return;
      }
  
      // Create a Blob from the stored SVG data
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
  
      // Create a download link
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
  
      // Set the file name for the download
      a.download = 'stored_artwork.svg';
  
      // Programmatically trigger the download
      a.click();
    }
  };
  
  

  return (
    <div >

      <div>
        <label>Number of Strokes</label>
        <input
          type="range"
          min="2"
          max="8"
          step="1"
          value={numStrokes}
          onChange={(e) => handleNumStrokesChange(e, e.target.value)}
        />
        {numStrokes}
      </div>
      <div>
        <label>Matrix Grid Size</label>
        <input
          type="range"
          min="4"
          max="10"
          step="1"
          value={gridSize}
          onChange={(e) => handleGridSizeChange(e, e.target.value)}
        />
        {gridSize}
      </div>
      <button onClick={handleDrawAndStore}>Generate</button>
      <button onClick={handleHardSave}>save SVG</button>
      <h4>Tap to Generate a new Pattern</h4>
      <div ref={canvasRef} onClick={handleDrawAndStore}></div>
    </div>
  );
}

export default Artwork;
