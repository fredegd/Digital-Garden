import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
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
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { navItems } from "../navItems";
import { cols } from "../colorSchema";

// const drawerWidth = 240;

export default function Navbar({ window, setOpen }) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDrawerBgChange = () => {
    setOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" ,  width: {
      sm: "400px", // 400px wide on screens wider than 600px (md)
      xs: "100vw", // Fullscreen on small screens
    },}}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Fred Egidi
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Link href={item.linkTo} underline="hover">
              <Button key={item.id} sx={{ color: "#111111" }}>
                {item.name}
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
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ backgroundColor: cols.main, display:"flex",flexDirection:"row", justifyContent:"space-between" }}>
         
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            fontFamily={"IBM Plex Mono"}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Fred Egidi
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link key={item.id} href={item.linkTo} underline="hover">
                <Button sx={{ color: "#f1f1f1" }}>{item.name}</Button>
              </Link>
            ))}
          </Box>

          <div onClick={handleDrawerBgChange}>
            <WallpaperIcon />
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
