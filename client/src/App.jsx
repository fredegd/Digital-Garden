import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import About from "./components/About";
import Blog from "./components/Blog";
import "./App.css";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600, // Adjust these values as needed
      md: 960, // Adjust these values as needed
      lg: 1280, // Adjust these values as needed
      xl: 1920, // Adjust these values as needed
    },
  },
});
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/" element={<Landing />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
