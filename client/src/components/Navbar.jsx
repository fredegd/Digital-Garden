import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDarkMode } from "../context/DarkModeContext";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";

import MenuIcon from "@mui/icons-material/Menu";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { navItems } from "../navItems";
import { cols } from "../colorSchema";
import { MicNone } from "@mui/icons-material";

// const drawerWidth = 240;

export default function Navbar({ window, setOpen }) {
  const { dk, toggleDarkMode } = useDarkMode();
  const theme = useTheme();

  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  console.log(activeMenuItem);
  useEffect(() => {
    // Iterate through the navItems to find the active one
    for (const item of navItems) {
      console.log(location.pathname)
      console.log(location.pathname.startsWith(item.linkTo))

      if (location.pathname === item.linkTo) {
        setActiveMenuItem(item.id);
        return; // Exit the loop early when found
      }
      if (location.pathname.startsWith(item.linkTo)) {

        setActiveMenuItem(item.id);
        console.log(item.linkTo)
        return;
      }
    }
    // If no match is found, set activeMenuItem to null
    setActiveMenuItem(null);
  }, [location.pathname]);

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDrawerBgChange = () => {
    setOpen((prevState) => !prevState);
  };

  const handleDarkChange = () => {
    toggleDarkMode();
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        width: {
          sm: "400px", // 400px wide on screens wider than 600px (md)
          xs: "100vw", // Fullscreen on small screens
        },
        height: "100vh",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: theme.palette.text.highlight, my: 2, maxHeight: "5vh" }}
      >
        Fred Egidi
      </Typography>
      <Divider />
      <List
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {navItems.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Link href={item.linkTo} underline="hover">
              <Button
                key={item.id}
                sx={{
                  color:
                    activeMenuItem === item.id
                      ? theme.palette.text.highlightAlt // Active color
                      : theme.palette.text.primary, // Inactive color
                  backgroundColor:
                    activeMenuItem === item.id
                      ? theme.palette.text.primary
                      : "transparent",

                  width: "100vw",
                }}
              >
                <Typography variant="h4" sx={{ my: 2, maxHeight: "5vh" }}>
                  {item.name}{" "}
                </Typography>
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar
          sx={{
            backgroundColor: theme.palette.background.main,
            height: "5rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: theme.palette.text.primary,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            color={theme.palette.text.primary}
            fontFamily={"IBM Plex Mono"}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: theme.palette.text.highlight,
            }}
            textAlign="left"
          >
            Fred Egidi
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link key={item.id} href={item.linkTo} underline="hover">
                <Button
                  sx={{
                    color:
                      activeMenuItem === item.id
                        ? theme.palette.text.highlightAlt // Active color
                        : theme.palette.text.primary, // Inactive color
                    backgroundColor:
                      activeMenuItem === item.id
                        ? theme.palette.text.primary
                        : "transparent",
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>

          <div
            onClick={handleDrawerBgChange}
            style={{ color: theme.palette.text.highlight }}
          >
            <WallpaperIcon />
          </div>

          <div
            onClick={handleDarkChange}
            style={{ color: theme.palette.text.primary }}
          >
            {dk ? <DarkModeIcon /> : <LightModeIcon />}
          </div>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
