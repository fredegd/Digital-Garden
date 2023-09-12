import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Artwork from "./Artwork";

export default function DrawerBGChange({ bgImage, setBgImage }) {
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown") {
      if (event.key === "Tab" || event.key === "Shift") {
        return;
      } else if (event.key === "Escape") {
        console.log("esc pressed");
        setState(false);
      }
    }

    setState(open);
  };

  const closeDrawer = () => {
    setState(false);
  };

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        sx={{ position: "absolute", top: "5rem", right: "0" }}
      >
        change background
      </Button>
      <Drawer
        anchor={"right"}
        open={state}
        onClose={toggleDrawer(false)}
        variant="persistent"
      >
        <Box
          sx={{
            width: 400,
            zIndex: 1000,
            marginTop: "4.5rem",
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation"
        >
          <Button
            onClick={closeDrawer}
            style={{ float: "right", margin: "8px", alignSelf: "flex-end" }}
          >
            Close
          </Button>
          <Artwork bgImage={bgImage} setBgImage={setBgImage} />
        </Box>
      </Drawer>
    </div>
  );
}
