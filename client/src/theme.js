import { createTheme } from "@mui/material/styles";

export const themeManager = (darkMode) => {
  //console.log(darkMode)
  const darkPalette = {
    mode: "dark",
    background: {
      main: "#121212",
      secondary: "#303030", // You can customize these values
      transparent: "#121212cc",
    },
    text: {
      primary: "#f1f1f1",
      secondary: "#888888",
      highlight: "#ffff00",
    },
    action: {
      active: "#ffcf8c",
    },
    success: {
      main: "#009688",
    },
  };

  const lightPalette = {
    mode: "light",
    background: {
      main: "#f1f1f1",
      secondary: "#f2f2f2", // You can customize these values
      transparent: "#f1f1f1cc",
    },
    text: {
      primary: "#131313",
      secondary: "#888888",
      highlight: "#ff8800", //hex orange color
    },
    action: {
      active: "#ffcf8c",
    },
    success: {
      main: "#009688",
    },
  };

  const theme = createTheme({
    // breakpoints: {
    //   values: {
    //     xs: 0,
    //     sm: 600, // Adjust these values as needed
    //     md: 960, // Adjust these values as needed
    //     lg: 1280, // Adjust these values as needed
    //     xl: 1920, // Adjust these values as needed
    //   },
    // },
    palette: darkMode ? { ...darkPalette } : { ...lightPalette },

    typography: {
      body1: {
        fontSize: "1.2rem",
        fontFamily: "IBM Plex Mono, sans-serif",
      },
      body2: {
        fontSize: "1.2rem",
        fontFamily: "IBM Plex Mono, sans-serif",
      },
      button:{
        fontSize: "1.1rem",
        fontFamily: "IBM Plex Mono, sans-serif",
        fontSize:"1.4rem",
        fontWeight: 400,
        letterSpacing:"0.02857em",
        textTransform:"uppercase",
      },
      h1: {
        fontSize: "4rem",
        fontFamily: "IBM Plex Mono, sans-serif",
        lineHeight: "4.4rem",
      },
      h2: {
        fontSize: "3.5rem",
        fontFamily: "IBM Plex Mono, sans-serif",
        lineHeight: "3.2rem",
      },
      h3: {
        fontSize: "3rem",
        fontFamily: "IBM Plex Mono, sans-serif",
        lineHeight: "2.6rem",
      },
      h4: {
        fontSize: "2.5rem",
        fontFamily: "IBM Plex Mono, sans-serif",
        lineHeight: "2.3rem",
      },
      h5: {
        fontSize: "2rem",
        fontFamily: "IBM Plex Mono, sans-serif",
        lineHeight: "1.7rem",
      },
      h6: {
        fontSize: "1.5rem",
        fontFamily: "IBM Plex Mono, sans-serif",
        lineHeight: "1.6rem",
      },

      subtitle1: {
        fontSize: "1.1rem",
        fontFamily: "IBM Plex Mono, sans-serif",
      },
      subtitle2: {
        fontSize: "1rem",
        fontFamily: "IBM Plex Mono, sans-serif",
      },
    },
  });

  return theme;
};
