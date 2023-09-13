const express = require("express");
require("dotenv").config();

const path = require("path");
const cors = require("cors"); // Import the cors middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const authRouter = require("./routes/auth");
const authorRouter = require("./routes/authors");
const blogsRouter = require("./routes/blogEntries");
const app = express();


app.use(express.static(path.join(__dirname, "client", "dist")));
require("./db");

const { errorHandler } = require("./middlewares/errorHandler");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/authors", authorRouter);

app.use("/api/blog", blogsRouter);

app.get("*", (req, res)=>{
  res.sendFile(path.join(__dirname, "client", "dist", "index.html" ))
})

app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
