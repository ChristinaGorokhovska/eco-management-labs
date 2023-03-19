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

type MonthType = { [key: string]: { value: number; workDays: number } };

const initialMonthes = {
  december: { value: 0, workDays: 0 },
  january: { value: 0, workDays: 0 },
  february: { value: 0, workDays: 0 },
  march: { value: 0, workDays: 0 },
  april: { value: 0, workDays: 0 },
  may: { value: 0, workDays: 0 },
  june: { value: 0, workDays: 0 },
  july: { value: 0, workDays: 0 },
  august: { value: 0, workDays: 0 },
  september: { value: 0, workDays: 0 },
  october: { value: 0, workDays: 0 },
  november: { value: 0, workDays: 0 },
};

export default function AddYearModal({ open, setOpen, handleClose, id, indicator, yearInput }: any) {
  const [monthes, setMonthes] = useState<MonthType>(initialMonthes);

  const handleChangeValue = (e: any) => {
    setMonthes({ ...monthes, [e.target.name]: { value: e.target.value, workDays: monthes[e.target.name].workDays } });
  };

  const handleChangeWorkDays = (e: any) => {
    setMonthes({ ...monthes, [e.target.name]: { value: monthes[e.target.name].value, workDays: e.target.value } });
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

  function RenderInputs() {
    return (
      <Grid container spacing={2}>
        {Object.keys(initialMonthes).map((key, i) => (
          <>
            <Grid item xs={3}>
              <TextField
                name="december"
                id="outlined-number"
                label="December"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="december"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </>
        ))}
      </Grid>
    );
  }

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

          {/* <RenderInputs /> */}
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                name="december"
                id="outlined-number"
                label="December"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="december"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="january"
                id="outlined-number"
                label="january"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="january"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="february"
                id="outlined-number"
                label="february"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="february"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="march"
                id="outlined-number"
                label="march"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="march"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="april"
                id="outlined-number"
                label="april"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="april"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="may"
                id="outlined-number"
                label="may"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="may"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="june"
                id="outlined-number"
                label="june"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="june"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="july"
                id="outlined-number"
                label="july"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="july"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="august"
                id="outlined-number"
                label="august"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="august"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="september"
                id="outlined-number"
                label="september"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="september"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="october"
                id="outlined-number"
                label="october"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="october"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="november"
                id="outlined-number"
                label="november"
                type="number"
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="november"
                id="outlined-number"
                label="days"
                type="number"
                onChange={handleChangeWorkDays}
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
