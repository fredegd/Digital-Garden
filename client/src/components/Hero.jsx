import Typewriter from "typewriter-effect";
import { Box } from "@mui/system";
import { keyframes } from "@mui/system";
import { motion, useAnimation } from "framer-motion";

const slideIn0 = keyframes`
  0% {
    transform: translateY(25%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const slideIn1 = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const slideIn2 = keyframes`
  0% {
    transform: translateY(200%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export default function Hero() {
  return (
    <Box
      sx={{
        fontFamily: "IBM Plex Mono, sans-serif",
        fontSize: {
          xs: "1.2rem",
          sm: "1.5rem",
          md: "1.8rem",
          lg: "2.1rem",
          xl: "2.5rem",
        },
        // position: "relative",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" },
        overflow: "scroll",
        // animation: `${slideIn} 0.7s ease-out 0s 1  `,
        transition: "all 0.9s ease-in-out",
        zIndex: "100",
        // animation: `${slideIn0} 0.7s ease-out 0s 1  `,
      }}
    >
      <Box sx={{animation: `${slideIn1} .7s ease-out 0s 1`}}>
      <h1>FRED EGIDI</h1>

      </Box>
      <Box sx={{animation: `${slideIn2} 1.7s ease-out 0s 1`}}>
        <h2>
          <Typewriter
            options={{
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Full Stack Web developer  ")

                .pauseFor(2500)
                .deleteAll()
                .typeString("Creative Coder ")
                .pauseFor(1200)
                .deleteChars(7)
                .typeString(" Human  Being ")

                .pauseFor(250)
                .deleteChars(22)
                .typeString("Based in Berlin Germany ")
                .pauseFor(2500)
                .start();
            }}
          />
        </h2>
      </Box>
    </Box>
  );
}
