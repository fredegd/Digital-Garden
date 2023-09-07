import React, { useEffect, useState } from 'react';

function Artwork() {
    const [shouldRedraw, setShouldRedraw] = useState(false);

    useEffect(() => {
        const canvas = document.getElementById('artCanvas');
        const ctx = canvas.getContext('2d');
        const gridSize = 7;
        const numPoints = 49;
        const numStrokes = 3;
        const pointSize = canvas.width / gridSize;
      
        function randomStrokes(col) {
          let startIndex = Math.floor(Math.random() * (gridSize * gridSize));
          let currentIndex = startIndex;
          let nextIndex = (currentIndex + 1) % numPoints;
      
          for (let i = 0; i < numStrokes; i++) {
            const fil = col; // Use the provided color directly
      
            const startX = (currentIndex % gridSize) * pointSize + pointSize / 2;
            const startY = Math.floor(currentIndex / gridSize) * pointSize + pointSize / 2;
      
            const endX = (nextIndex % gridSize) * pointSize + pointSize / 2;
            const endY = Math.floor(nextIndex / gridSize) * pointSize + pointSize / 2;
      
            ctx.lineWidth = Math.random() * 20 + 20; // Random stroke weight
            ctx.strokeStyle = fil;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
      
            startIndex = nextIndex;
            nextIndex = (currentIndex + Math.floor(Math.random() * (numPoints - 2)) + 1) % numPoints;
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          randomStrokes('#00ff00'); // Green
          randomStrokes('#aff000'); // Yellow-green

        }
        function handleKeyPress(event) {
            if (event.key === 'r' || event.key === 'R') {
              setShouldRedraw(true);
            }
          }
        
          window.addEventListener('keydown', handleKeyPress);

          if (shouldRedraw) {
            randomStrokes('#00ff00'); // Green
            randomStrokes('#aff000'); // Yellow-green
            setShouldRedraw(false);
          }
      
          return () => {
            window.removeEventListener('keydown', handleKeyPress);
          };

      }, [shouldRedraw]);
      
  return (
    <canvas id="artCanvas" width={800} height={800}></canvas>
  );
}

export default Artwork;
