import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects"
import About from "./components/About"
import Blog from "./components/Blog"
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
