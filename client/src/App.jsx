import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects"
import About from "./components/About"
import Blog from "./components/Blog"
import "./App.css";
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/projects" element={<Projects />}>   </Route>
        <Route path="/blog" element={<Blog />} ></Route>
        <Route path="/about" element={<About />} ></Route>
        <Route path="/" element={<Landing />} ></Route>
      </Routes>
    </>
  );
}
ss
export default App;
