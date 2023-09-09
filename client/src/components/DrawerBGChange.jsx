import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Button from "@mui/material/Button";
import Artwork from "./Artwork";

export default function DrawerBGChange({bgImage, setBgImage}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 450,
        zIndex: 1000,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Artwork bgImage={bgImage} setBgImage={setBgImage} />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            change background
          </Button>
          <Drawer
            anchor={"right"}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            variant="persistent"
            onOpen={toggleDrawer(anchor, true)}

          >

            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
