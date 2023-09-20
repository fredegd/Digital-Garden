import { Box, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const staggerConfig = {
  animate: {
    // scale: [1,0.5, 1],
    // rotate: [0, 360],
    opacity: [1, 1, 0.5],
  },
  transition: {
    duration: 1,
    ease: "easeIn",
    times: [0, 0.5, 1],
    repeat: Infinity,
  },
};

export default function About() {
  console.log("clicker");

  const [click, setClick] = useState(false);
  const clicker = () => {
    return click ? setClick(false) : setClick(true);
  };
  const controls = useAnimation();
  useEffect(() => {
    controls.start("animate");
  }, [clicker]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
         zIndex: "1000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          style={{ background: "red", width: "100px", height: "100px" }}
          // onClick={clicker}
          // variants={staggerConfig}
          // initial="animate"
          //  animate={controls}
           whileHover={{ scale: 1.1  }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}

          whileTap={{ scale: 0.9 }}
        >About</motion.div>
      </Box>
    </Box>
  );
}
