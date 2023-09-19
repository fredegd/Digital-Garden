import { createTheme } from "@mui/material/styles";

export const themeManager = (darkMode) => {
  console.log(darkMode)
  const darkPalette = {
    mode: 'dark',
    background: {
      main: '#121212',
      secondary: '#000000', // You can customize these values
      transparent: '#303030cc',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A8A8A8',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      main: '#009688',
    },
  };

  const lightPalette = {
    mode: 'light',
    background: {
      main: '#f1f1f1',
      secondary: '#FFFFFF', // You can customize these values
      transparent: '#f2f2f2cc',

    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      main: '#009688',
    },
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600, // Adjust these values as needed
        md: 960, // Adjust these values as needed
        lg: 1280, // Adjust these values as needed
        xl: 1920, // Adjust these values as needed
      },
    },
    palette: darkMode ? { ...darkPalette } : { ...lightPalette },
  });

  return theme;
};
