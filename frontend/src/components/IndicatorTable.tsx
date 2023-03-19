import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";

export default function IndicatorTable({ records, avg }: any) {
  console.log(records);
  return records?.length ? (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell align="right">December</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">January</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">February</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">March</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">April</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">May</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">June</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">July</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">August</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">September</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">October</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
              <TableCell align="right">November</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">DailyAvg</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row: any) => (
              <TableRow key={row.yaer} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.year}
                </TableCell>
                <TableCell align="right">{row.monthes.december.value}</TableCell>
                <TableCell align="right">{row.monthes.december.workDays}</TableCell>
                <TableCell align="right">{row.monthes.december.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.january.value}</TableCell>
                <TableCell align="right">{row.monthes.january.workDays}</TableCell>
                <TableCell align="right">{row.monthes.january.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.february.value}</TableCell>
                <TableCell align="right">{row.monthes.february.workDays}</TableCell>
                <TableCell align="right">{row.monthes.february.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.march.value}</TableCell>
                <TableCell align="right">{row.monthes.march.workDays}</TableCell>
                <TableCell align="right">{row.monthes.march.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.april.value}</TableCell>
                <TableCell align="right">{row.monthes.april.workDays}</TableCell>
                <TableCell align="right">{row.monthes.april.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.may.value}</TableCell>
                <TableCell align="right">{row.monthes.may.workDays}</TableCell>
                <TableCell align="right">{row.monthes.may.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.june.value}</TableCell>
                <TableCell align="right">{row.monthes.june.workDays}</TableCell>
                <TableCell align="right">{row.monthes.june.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.july.value}</TableCell>
                <TableCell align="right">{row.monthes.july.workDays}</TableCell>
                <TableCell align="right">{row.monthes.july.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.august.value}</TableCell>
                <TableCell align="right">{row.monthes.august.workDays}</TableCell>
                <TableCell align="right">{row.monthes.august.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.september.value}</TableCell>
                <TableCell align="right">{row.monthes.september.workDays}</TableCell>
                <TableCell align="right">{row.monthes.september.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.october.value}</TableCell>
                <TableCell align="right">{row.monthes.october.workDays}</TableCell>
                <TableCell align="right">{row.monthes.october.dailyAvg}</TableCell>
                <TableCell align="right">{row.monthes.november.value}</TableCell>
                <TableCell align="right">{row.monthes.november.workDays}</TableCell>
                <TableCell align="right">{row.monthes.november.dailyAvg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box marginTop={8}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell align="right">Average annual</TableCell>

                <TableCell align="right">Month</TableCell>
                <TableCell align="right">Max</TableCell>
                <TableCell align="right">Month</TableCell>
                <TableCell align="right">Min</TableCell>

                <TableCell align="right">Сoefficient of unevenness</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {avg.map((row: any) => (
                <TableRow key={row.yaer} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.year}
                  </TableCell>

                  <TableCell align="right">{row.avgAnnual?.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.max[0]}</TableCell>
                  <TableCell align="right">{row.max[1].value?.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.min[0]}</TableCell>
                  <TableCell align="right">{row.min[1].value?.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.koef?.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  ) : (
    <Typography marginTop={16} color={"grey"} variant="h6" textAlign={"center"}>
      There are not data
    </Typography>
  );
}
