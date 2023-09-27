import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import About from "./components/About";
import Blog from "./components/Blog";
import BlogItem from "./components/BlogItem";
import Contact from "./components/Contact";
import Login from "./components/Login";
import LogoutMessage from "./components/LogoutMessage";
import DrawerBGChange from "./components//DrawerBGChange";
import Kaleidoscope from "./components/Kaleidoscope";

import Protected from "./components/Protected";
import CreateBlogEntry from "./components/CreateBlogEntry";
import Dashboard from "./components/Dashboard";
import "./App.css";

import DarkModeProvider from "./context/DarkModeContext";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import  {themeManager}  from "./theme";
import { useDarkMode } from "./context/DarkModeContext.jsx";
import { get } from "lodash";
import { color } from "framer-motion";

export default function App() {
  const { dk } = useDarkMode();
  const theme = themeManager(dk);
   console.log(theme)
  const [open, setOpen] = useState(false);//a state to control the drawer

  const [bgImage, setBgImage] = useState(localStorage.getItem("svgData")?localStorage.getItem("svgData"):null);


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
const [color1, setColor1] = useState(localStorage.getItem("col1")?localStorage.getItem("col1"):getRandomHexColor("col1"));
const [color2, setColor2] = useState(localStorage.getItem("col2")?localStorage.getItem("col2"):getRandomHexColor("col2"));

useEffect(() => {
  // console.log("something changed")
  // console.log(color1, color2)
}, [color1, color2  ]);

return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Navbar setOpen={setOpen} />
          <DrawerBGChange
            bgImage={bgImage}
            setBgImage={setBgImage}
            open={open}
            setOpen={setOpen}
            color1={color1} color2={color2} setColor1={setColor1} setColor2={setColor2}
          />{" "}
          <Kaleidoscope bgImage={bgImage} />
          <Routes>
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/read/:blogItemid" element={<BlogItem />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutMessage />} />

            <Route path="/" element={<Landing />} />

            <Route path="/:userid" element={<Protected />}>
              <Route path="create-blog" element={<CreateBlogEntry />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}
