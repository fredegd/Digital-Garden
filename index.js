const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/save-svg', (req, res) => {
  const svgData = req.body.svgData; // Assuming the SVG data is sent in the request body

  // Save the SVG data to the assets folder
  const outputPath = path.join(__dirname, 'client', 'src', 'assets', 'saved-artwork.svg');
  
  fs.writeFileSync(outputPath, svgData);

  res.status(200).json({ message: 'SVG saved successfully' });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
