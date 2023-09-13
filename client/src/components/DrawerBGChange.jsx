import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Artwork from "./Artwork";

export default function DrawerBGChange({ bgImage, setBgImage, open, setOpen }) {
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={toggleDrawer(false)}
        variant="persistent"
      >
        <Box
          sx={{
            width: {
              sm: "400px", // 400px wide on screens wider than 600px (md)
              xs: "100vw", // Fullscreen on small screens
            },
            marginTop: "1.2rem",
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation"
        >
          <Button
            onClick={closeDrawer}
            style={{
              float: "right",
              marginRight: "8px",
              alignSelf: "flex-end",
            }}
          >
            Close
          </Button>
          <Artwork bgImage={bgImage} setBgImage={setBgImage} />
        </Box>
      </Drawer>
    </div>
  );
}
