import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div">
          Youtube Share
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
