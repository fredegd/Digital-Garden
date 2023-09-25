import { createTheme } from "@mui/material/styles";

export const themeManager = (darkMode) => {
  //console.log(darkMode)
  const darkPalette = {
    mode: 'dark',
    background: {
      main: '#121212',
      secondary: '#303030', // You can customize these values
      transparent: '#303030cc',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A8A8A8',
    },
    action: {
      active: '#ffcf8c',
    },
    success: {
      main: '#009688',
    },
  };

  const lightPalette = {
    mode: 'light',
    background: {
      main: '#f1f1f1',
      secondary: '#f2f2f2', // You can customize these values
      transparent: '#f2f2f2cc',

    },
    text: {
      primary: '#131313',
      secondary: '#46505A',
    },
    action: {
      active: '#ffcf8c',
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
