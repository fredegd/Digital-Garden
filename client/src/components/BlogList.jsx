import React from "react";
import BlogItem from "./BlogItem";
import { Box } from "@mui/material";
export default function BlogList() {
  
  return (
    <Box sx={{ zIndex: "100" ,  maxWidth:" 800px"  }}>
      <BlogItem />
    </Box>
  );
}
