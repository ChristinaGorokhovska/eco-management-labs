import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import React, { useEffect } from "react";

export default function IndicatorTable({ records }: any) {
  console.log(records);
  return records?.length ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell align="right">December</TableCell>
            <TableCell align="right">January</TableCell>
            <TableCell align="right">February</TableCell>
            <TableCell align="right">March</TableCell>
            <TableCell align="right">April</TableCell>
            <TableCell align="right">May</TableCell>
            <TableCell align="right">June</TableCell>
            <TableCell align="right">July</TableCell>
            <TableCell align="right">August</TableCell>
            <TableCell align="right">September</TableCell>
            <TableCell align="right">October</TableCell>
            <TableCell align="right">November</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row: any) => (
            <TableRow key={row.yaer} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.year}
              </TableCell>
              <TableCell align="right">{row.monthes.december}</TableCell>
              <TableCell align="right">{row.monthes.january}</TableCell>
              <TableCell align="right">{row.monthes.february}</TableCell>
              <TableCell align="right">{row.monthes.march}</TableCell>
              <TableCell align="right">{row.monthes.april}</TableCell>
              <TableCell align="right">{row.monthes.may}</TableCell>
              <TableCell align="right">{row.monthes.june}</TableCell>
              <TableCell align="right">{row.monthes.july}</TableCell>
              <TableCell align="right">{row.monthes.august}</TableCell>
              <TableCell align="right">{row.monthes.september}</TableCell>
              <TableCell align="right">{row.monthes.october}</TableCell>
              <TableCell align="right">{row.monthes.november}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography marginTop={16} color={"grey"} variant="h6" textAlign={"center"}>
      There are not data
    </Typography>
  );
}
