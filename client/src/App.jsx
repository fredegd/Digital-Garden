import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import About from "./components/About";
import Blog from "./components/Blog";
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

import { themeManager } from "./theme";
import { useDarkMode } from "./context/DarkModeContext.jsx";

export default function App() {
  const { dk } = useDarkMode();
  const theme = themeManager(dk);
  const [open, setOpen] = useState(false);

  const [bgImage, setBgImage] = useState(localStorage.getItem("svgData")&&localStorage.getItem("svgData"));

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
          />{" "}
          <Kaleidoscope bgImage={bgImage} />
          <Routes>
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
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
