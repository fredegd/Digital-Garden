import React, { useEffect, useState, useRef } from 'react';

function randomStrokes(ctx, numPoints, gridSize, pointSize, col, numStrokes) {
  const pointCoords = Array.from({ length: numPoints }, (_, index) => ({
    x: (index % gridSize) * pointSize + pointSize / 2,
    y: Math.floor(index / gridSize) * pointSize + pointSize / 2,
  }));

  let startIndex = Math.floor(Math.random() * (gridSize * gridSize));
  let currentIndex = startIndex;
  const visitedPoints = new Set(); // Track visited points

  for (let i = 0; i < numStrokes; i++) {
    const fil = col; // Use the provided color directly

    const startX = pointCoords[currentIndex].x;
    const startY = pointCoords[currentIndex].y;

    visitedPoints.add(currentIndex); // Mark the current point as visited

    // Find the next unvisited point
    let nextIndex;
    do {
      nextIndex = (currentIndex + Math.floor(Math.random() * (numPoints - 2)) + 1) % numPoints;
    } while (visitedPoints.has(nextIndex));

    const endX = pointCoords[nextIndex].x;
    const endY = pointCoords[nextIndex].y;

    ctx.lineWidth = Math.random() * 20 + 20; // Random stroke weight
    ctx.strokeStyle = fil;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.lineCap = 'round';

    currentIndex = nextIndex;
  }
}

function Artwork() {
  const [shouldRedraw, setShouldRedraw] = useState(true);
  const gridSize = 4;
  const numStrokes = 4;

  const numPoints = gridSize ** 2;

  const canvasRef = useRef(null);


  useEffect(() => {
    const canvas = document.getElementById('artCanvas');
    const ctx = canvas.getContext('2d');
    function handleKeyPress(event) {
      if (event.key === 'r' || event.key === 'R') {
        setShouldRedraw(true);
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (shouldRedraw) {
      const canvas = document.getElementById('artCanvas');
      const ctx = canvas.getContext('2d');

      const pointSize = canvas.width / gridSize;
      // Clear and redraw the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      randomStrokes(ctx, numPoints, gridSize, pointSize, '#00ff00', numStrokes); // Green
      randomStrokes(ctx, numPoints, gridSize, pointSize, '#aff000', numStrokes); // Yellow-green

      // Reset shouldRedraw
      setShouldRedraw(false);

       // Generate SVG data from canvas content
    const svgData = getSVGFromCanvas(canvas); // Call getSVGFromCanvas here

    // Send SVG data to the server to save it
    saveSVGOnServer(svgData); // Call saveSVGOnServer here
    }
  }, [shouldRedraw]);

 
  const getSVGFromCanvas = (canvas) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', canvas.width);
    svg.setAttribute('height', canvas.height);

    // Copy canvas content to SVG
    const image = new Image();
    image.src = canvas.toDataURL();

    const svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    svgImage.setAttribute('width', canvas.width);
    svgImage.setAttribute('height', canvas.height);
    svgImage.setAttribute('x', '0');
    svgImage.setAttribute('y', '0');
    svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', image.src);
    svg.appendChild(svgImage);

    return new XMLSerializer().serializeToString(svg);
  };

  const saveSVGOnServer = (svgData) => {
    fetch('http://localhost:3001/save-svg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ svgData }),
    })
      .then((response) => {
        console.log('Response from server:', response);
        if (response.status === 200) {
          console.log('SVG saved successfully on the server.');
        } else {
          console.error('Failed to save SVG on the server.');
        }
      })
      .catch((error) => {
        console.error('Error while saving SVG:', error);
      });
  };

  return (
    <div>
      <canvas ref={canvasRef} id="artCanvas" width={800} height={800}></canvas>
      <button onClick={() => setShouldRedraw(true)}>Redraw and Save as SVG</button>
    </div>
  );
}

export default Artwork;