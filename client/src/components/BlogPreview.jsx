import { Box } from "@mui/system";
import useTheme from "@mui/material/styles/useTheme";
import { motion, useAnimation } from "framer-motion";

import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function BlogPreview() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        fontFamily: "IBM Plex Mono, sans-serif",
        fontSize: {
          xs: "1.2rem",
          sm: "1.5rem",
          md: "1.8rem",
          lg: "2.1rem",
          xl: "2.4rem",
        },
        // position: "relative",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" },
        overflow: "scroll",
        transition: "all 0.9s ease-in-out",
        zIndex: "100",
        }}
    >
      <motion.div
        // onClick={clicker}
        // variants={staggerConfig}
        // initial="animate"
        //  animate={controls}
        style={{backgroundColor:theme.palette.background.transparent,  margin:"5rem", borderRadius:"1rem" }}
        whileHover={{ scale: 1.1, border: "1px solid red" }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to={"/blog"}
          style={{
            textDecoration: "none",
            color: theme.palette.text.primary,
            transition: "all 0.9s ease-in-out",
          }}
        >
          <h1>Latest from the Blog:</h1>
        </Link>
      </motion.div>
    </Box>
  );
}
