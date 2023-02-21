import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import Axios from "../config/axiosConfig";

export default function AddUnit({ factoryId }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [newUnit, setNewUnit] = useState<string>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUnit(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await Axios.post(
        `/api/factories/${factoryId}/units`,
        { factoryId: factoryId, name: newUnit },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (error: any) {}
  };

  return (
    <Box marginTop={16} textAlign={"center"}>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Add Unit
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box padding={5}>
          <Typography sx={{ p: 2 }} color={"primary"} textAlign="center">
            Enter name of Unit
          </Typography>
          <Box display={"flex"} justifyContent="center" alignItems={"center"}>
            <TextField onChange={handleUnit}></TextField>
            <Button
              sx={{ marginLeft: 2 }}
              variant="outlined"
              onClick={() => {
                handleSubmit();
                handleClose();
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
