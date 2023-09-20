import { motion, useScroll } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@mui/material/styles";
import { axiosClient } from "../axiosClient";
import { Box } from "@mui/material";
import createPalette from "@mui/material/styles/createPalette";

export default function BlogItem() {
  const theme = useTheme();

  const [blogItemDetail, setBlogItemDetail] = useState({});
  const { blogItemid } = useParams();
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    axiosClient
      .get(`/blog/read/${blogItemid}`)
      .then((response) => {
        console.log(response.data);
        setBlogItemDetail(response.data);
      })
      .catch((err) => console.error(err, "url not found"));
  }, []);
  console.log(blogItemDetail.title);
  return (
    <Box
      sx={{
        marginTop: "5rem",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <motion.div
        className="progress-bar"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: "5rem",
          left: 0,
          right: 0,
          height: "1rem",
          transformOrigin: "0%",
        }}
      />
      <Box
        sx={{
          zIndex: "1000",
          background:  
          `linear-gradient(90deg, ${theme.palette.background.transparent} 0%, ${theme.palette.background.secondary} 50%, ${theme.palette.background.transparent} 100%)`
          // theme.palette.background.transparent ,

        }}
      >
        <ReactMarkdown style={{ zIndex: "100" }}>
          {blogItemDetail.title}
        </ReactMarkdown>
        <ReactMarkdown style={{ zIndex: "100" }}>
          {blogItemDetail.subtitle}
        </ReactMarkdown>
        <ReactMarkdown style={{ zIndex: "100" }}>
          {blogItemDetail.content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}
