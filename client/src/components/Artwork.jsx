import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import axios from "axios";
function Artwork({ bgImage, setBgImage }) {
  const canvasRef = useRef(null);
  const p5CanvasRef = useRef(null); // Declare p5CanvasRef here
  const [firstRender, setFirstRender] = useState(true);
  const [svgImage, setSvgImage] = useState(null); // Store SVG image object

  useEffect(() => {
    const sketch = (p) => {
      const svgWidth = 400;
      const svgHeight = 400;

      p.setup = () => {
        p.createCanvas(svgWidth, svgHeight).parent(canvasRef.current);
        p.noLoop();
        
        if (!svgImage || !firstRender) {
          // If svgImage is not available or it's the first render, generate and display the artwork
          drawArtwork(p);
        } else {
          // Draw the SVG image onto the canvas
          p.image(svgImage, 0, 0, svgWidth, svgHeight);
        }
      };
      

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

      const drawArtwork = (p) => {
        let svgString = ""; // Initialize an empty SVG string

        svgString += `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;
        p.clear();
        // Your drawing code here, but use SVG primitives like line
        const gridSize = 4;
        const numStrokes = 7;
        const numPoints = gridSize ** 2;
        const pointSize = p.width / gridSize;

        for (let i = 0; i < 2; i++) {
          const [color1, color2] = getRandomHexColors();
          const col = i % 2 === 0 ? color1 : color2; // Alternating colors

          let startIndex = Math.floor(p.random(numPoints));
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
                (currentIndex + Math.floor(p.random(numPoints - 2)) + 1) %
                numPoints;
            } while (visitedPoints.has(nextIndex));

            const endX = (nextIndex % gridSize) * pointSize + pointSize / 2;
            const endY =
              Math.floor(nextIndex / gridSize) * pointSize + pointSize / 2;
            let sw = p.random(5) + 5;
            p.stroke(col);
            p.strokeWeight(sw);
            p.strokeCap(p.ROUND); // Set stroke cap to round

            p.line(startX, startY, endX, endY);

            currentIndex = nextIndex;

            // Create SVG lines based on the p5.js lines
            svgString += `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`;
          }
        }
        svgString += "</svg>";

        saveSVGLocally(svgString);
        setBgImage(svgString);
        // Send SVG data to the server or save it as a file
        // saveSVGOnServer(svgString);
      };

      const exportCanvasAsSVG = () => {
        // Call drawArtwork to render lines on the canvas
        drawArtwork(p);

        // // Create an SVG element for saving or displaying
        // const svg = document.createElementNS(
        //   "http://www.w3.org/2000/svg",
        //   "svg"
        // );
        // svg.setAttribute("width", p.width);
        // svg.setAttribute("height", p.height);

        // // Clone the canvas element and append it to the SVG
        // const canvasClone = canvasRef.current.children[0].cloneNode(true);
        // svg.appendChild(canvasClone);

        // // Serialize the SVG to a string
        // const serializer = new XMLSerializer();
        // const svgString = serializer.serializeToString(svg);
      };

      p.exportSVG = exportCanvasAsSVG;
    };

    const p5Canvas = new p5(sketch, canvasRef.current);
    p5CanvasRef.current = p5Canvas;

    return () => {
      p5Canvas.remove();
    };
  }, []);

  const saveSVGLocally = (svgData) => {
    try {
      // Store the SVG data in localStorage
      localStorage.setItem("svgData", svgData);
      console.log("SVG data saved locally.");
    } catch (error) {
      console.error("Error while saving SVG data locally:", error);
    }
  };

  const handleExportSVG = () => {
    if (p5CanvasRef.current) {
      p5CanvasRef.current.exportSVG();
    }
    // firstRender && setFirstRender(false);
  };
  console.log(firstRender);
  return (
    <div>
    
      <div ref={canvasRef} onClick={handleExportSVG}></div>
      {/* <object
        type="image/svg+xml"
        data={`data:image/svg+xml;base64,${btoa(bgImage)}`}
        width="400"
        height="400"
      >
        Your browser does not support SVG.
      </object> */}
    </div>
  );
}

export default Artwork;
