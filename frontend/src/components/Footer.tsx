import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box mt={"auto"}>
      <AppBar position="static" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <Typography>All rights reserved.</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
