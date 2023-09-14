import Hero from "./Hero";

import { Box } from "@mui/material";
import BlogPreview from "./BlogPreview";
export default function Landing() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        height: "auto",
        overflow: "scroll",
        background: "transparent",

      }}
    >
      <Hero />
      <BlogPreview/>
    </Box>
  );
}
