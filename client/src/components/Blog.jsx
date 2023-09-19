import React from "react";
import BlogList from "./BlogList";
import { Box } from "@mui/material";
export default function Blog() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "scroll",
        // zIndex: "1000",
        background: "transparent",

      }}
    >
      <BlogList />
    </Box>
  );
}
