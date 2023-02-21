import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import Axios from "../config/axiosConfig";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid blue",
  boxShadow: 24,
  p: 4,
};

const initialMonthes = {
  december: 0,
  january: 0,
  february: 0,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
};

export default function AddYearModal({ open, setOpen, handleClose, id, indicator, yearInput }: any) {
  const [monthes, setMonthes] = useState(initialMonthes);

  const handleChangeMonthes = (e: any) => {
    setMonthes({ ...monthes, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("here", monthes);
    try {
      await Axios.post(
        "/api/records",
        {
          unitId: id,
          indicatorId: indicator,
          year: yearInput,
          monthes: monthes,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (error: any) {}
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography color={"grey"} pb={2} id="modal-modal-title" variant="h6" component="h2">
            Enter data
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                name="december"
                id="outlined-number"
                label="December"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="january"
                id="outlined-number"
                label="January"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="february"
                id="outlined-number"
                label="February"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="march"
                id="outlined-number"
                label="March"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="april"
                id="outlined-number"
                label="April"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="may"
                id="outlined-number"
                label="May"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="june"
                id="outlined-number"
                label="June"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="july"
                id="outlined-number"
                label="July"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="august"
                id="outlined-number"
                label="August"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="september"
                id="outlined-number"
                label="September"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="october"
                id="outlined-number"
                label="October"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="november"
                id="outlined-number"
                label="November"
                type="number"
                onChange={handleChangeMonthes}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Box marginTop={2} textAlign={"center"}>
            <Button
              onClick={() => {
                handleSubmit();
                handleClose();
                setMonthes(initialMonthes);
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
