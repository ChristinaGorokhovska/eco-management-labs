import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  Button,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../config/axiosConfig";

interface IIndicator {
  _id: string;
  name: string;
}

export default function UnitsGrid({ factoryUnits }: any) {
  const [indicator, setIndicator] = useState<string>("");
  const [indicators, setIndicators] = useState<[IIndicator]>();
  const [records, setRecords] = useState<any[]>();

  const handleChange = (event: SelectChangeEvent) => {
    setIndicator(event.target.value);
  };

  const handleShow = async () => {
    setRecords([]);
    const unitIds: string[] = [];
    factoryUnits.forEach((element: any) => {
      unitIds.push(element._id);
    });
    const res = await Axios.get(`/api/calculations/${indicator}`, {
      params: { unitIds: unitIds },
    });

    setRecords(res.data.calculations);
    console.log(res.data.calculations);
  };

  useEffect(() => {
    (async () => {
      const res = await Axios.get(`/api/indicators`, { withCredentials: true });
      setIndicators(res.data.indicators);
    })();
  }, []);
  return (
    <>
      <Container>
        <Box justifyContent={"center"}>
          <Typography m={2} variant="h6" textAlign={"center"} color="grey">
            Units
          </Typography>
          <Box>
            <Grid container spacing={12}>
              {factoryUnits ? (
                factoryUnits.map((unit: any, key: any) => {
                  return (
                    <Grid item xs={4} key={key}>
                      <Card
                        color="green"
                        sx={{
                          backgroundImage: "linear-gradient( 135deg, #97ABFF 10%, #123597 100%)",
                          borderRadius: 4,
                        }}
                      >
                        <Link to={`/units/${unit.name}/${unit._id}`} style={{ textDecoration: "none" }}>
                          <CardActionArea>
                            <CardContent>
                              <Typography color={"white"} variant="h5" py={2} textAlign={"center"}>
                                {unit.name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Link>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <Grid xs={12} item>
                  <Typography variant="body2" textAlign={"center"}>
                    You do not have units
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>

          <Box display={"flex"} justifyContent="center">
            <Box marginTop={16}>
              {indicators ? (
                <>
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Indicator</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={indicator}
                          onChange={handleChange}
                          autoWidth
                          label="Indicator"
                        >
                          {indicators &&
                            indicators.map((indicator, i) => {
                              return (
                                <MenuItem key={i} value={indicator._id}>
                                  {indicator.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                      <Button size="medium" color="primary" onClick={handleShow}>
                        Show
                      </Button>
                    </Box>
                  </Box>
                </>
              ) : (
                <Typography color={"grey"} textAlign={"center"}>
                  There are not indicators
                </Typography>
              )}
            </Box>
          </Box>

          <Box marginTop={16}>
            {records ? (
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Year</TableCell>
                      <TableCell align="right">December</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">January</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">February</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">March</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">April</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">May</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">June</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">July</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">August</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">September</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">October</TableCell>
                      <TableCell align="right">DailyAvg</TableCell>
                      <TableCell align="right">November</TableCell>
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
                        <TableCell align="right">{row.monthes.december.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.january.value}</TableCell>
                        <TableCell align="right">{row.monthes.january.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.february.value}</TableCell>
                        <TableCell align="right">{row.monthes.february.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.march.value}</TableCell>
                        <TableCell align="right">{row.monthes.march.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.april.value}</TableCell>
                        <TableCell align="right">{row.monthes.april.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.may.value}</TableCell>
                        <TableCell align="right">{row.monthes.may.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.june.value}</TableCell>
                        <TableCell align="right">{row.monthes.june.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.july.value}</TableCell>
                        <TableCell align="right">{row.monthes.july.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.august.value}</TableCell>
                        <TableCell align="right">{row.monthes.august.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.september.value}</TableCell>
                        <TableCell align="right">{row.monthes.september.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.october.value}</TableCell>
                        <TableCell align="right">{row.monthes.october.dailyAvg}</TableCell>
                        <TableCell align="right">{row.monthes.november.value}</TableCell>
                        <TableCell align="right">{row.monthes.november.dailyAvg}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : null}
          </Box>
        </Box>
      </Container>
    </>
  );
}
