import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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
import { ThemeProvider } from "@mui/material/styles";
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
  // palette:{
  //   background: {
  //     paper: '#f1f1f1',
  //     dark: '#262626',
  //   },
  //   text: {
  //     primary: '#173A5E',
  //     secondary: '#46505A',
  //   },
  //   action: {
  //     active: '#001E3C',
  //   },
  //   success: {
  //     dark: '#009688',
  //   },
  // }
});

export default function App() {
  const [open, setOpen] = useState(false);

  const [bgImage, setBgImage] = useState();

  return (
    <>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
}
