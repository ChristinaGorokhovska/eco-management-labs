import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddYearModal from "../components/AddYearModal";
import Footer from "../components/Footer";
import AnnualChartByUnitAndIndicator, { IAnnualCosts } from "../components/graphic/AnnualChartByUnitAndIndicator";
import AnnualPieChart from "../components/graphic/AnnualPieChart";
import ChartByUnitAndIndicator, { IRecord } from "../components/graphic/ChartByUnitAndIndicator";
import Header from "../components/Header";
import IndicatorTable from "../components/IndicatorTable";
import Axios from "../config/axiosConfig";
import { useAuthContext } from "../context/AuthProvider";

interface IIndicator {
  _id: string;
  name: string;
}

export interface IAnnualCostsPie {
  name: string;
  annual: number;
}

export default function Unit() {
  const { unitName, id } = useParams();
  const [indicator, setIndicator] = useState<string>("");
  const [indicators, setIndicators] = useState<[IIndicator]>();
  const [records, setRecords] = useState<IRecord[] | undefined>();
  const [avg, setAvg] = useState<any[]>();
  const [annualCosts, setAnnualCosts] = useState<IAnnualCosts[]>();
  const [annualCostsPie, setAnnualCostsPie] = useState<IAnnualCostsPie[]>();
  const [yearInput, setYearInput] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { auth } = useAuthContext();
  const handleChange = (event: SelectChangeEvent) => {
    setIndicator(event.target.value);
  };

  const handleShow = async () => {
    setRecords([]);
    const res = await Axios.get(`/api/units/${id}/records/${indicator}`, { withCredentials: true });
    setRecords(res.data.records);
    setAvg(res.data.avg);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearInput(e.target.value);
  };

  const randomNumber = (num: number) => {
    return +(Math.random() * num).toFixed(2);
  };

  const randomWorkDays = (num: number) => {
    return +Math.floor(Math.random() * num);
  };

  const generateData = async () => {
    try {
      await Axios.post(
        "/api/records",
        {
          unitId: id,
          indicatorId: indicator,
          year: yearInput,
          monthes: {
            december: { value: randomNumber(10), workDays: randomWorkDays(24) },
            january: { value: randomNumber(10), workDays: randomWorkDays(24) },
            february: { value: randomNumber(10), workDays: randomWorkDays(24) },
            march: { value: randomNumber(10), workDays: randomWorkDays(24) },
            april: { value: randomNumber(10), workDays: randomWorkDays(24) },
            may: { value: randomNumber(10), workDays: randomWorkDays(24) },
            june: { value: randomNumber(10), workDays: randomWorkDays(24) },
            july: { value: randomNumber(10), workDays: randomWorkDays(24) },
            august: { value: randomNumber(10), workDays: randomWorkDays(24) },
            september: { value: randomNumber(10), workDays: randomWorkDays(24) },
            october: { value: randomNumber(10), workDays: randomWorkDays(24) },
            november: { value: randomNumber(10), workDays: randomWorkDays(24) },
          },
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (error: any) {}
  };

  const handleCostsChart = async () => {
    try {
      const res = await Axios.get(`/api/costs/${id}/${indicator}`, { withCredentials: true });
      setAnnualCosts(res.data.costs);
    } catch (error) {}
  };

  const handleAnnualCostsByUnit = async () => {
    try {
      const res = await Axios.get(`/api/costs/${id}/annual/${yearInput}`, { withCredentials: true });
      setAnnualCostsPie(res.data.costs);
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      const res = await Axios.get(`/api/units/${id}`, { withCredentials: true });

      setIndicators(res.data.indicators);
    })();
  }, []);
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header unit={unitName || ""}></Header>
      <Container>
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

                {auth.roles.includes(2002) ? (
                  <Box display={"flex"} alignItems={"center"}>
                    <FormControl variant="standard">
                      <InputLabel htmlFor="component-simple">Year</InputLabel>
                      <Input id="component-simple" onChange={handleInput} />
                    </FormControl>
                    <Button onClick={generateData}> Generate</Button>
                    <Button onClick={handleOpen}>Add</Button>
                    <Button onClick={handleAnnualCostsByUnit}>Costs</Button>
                  </Box>
                ) : null}
              </Box>
            </>
          ) : (
            <Typography color={"grey"} textAlign={"center"}>
              There are not indicators
            </Typography>
          )}
        </Box>

        {annualCostsPie && <AnnualPieChart records={annualCostsPie} year={yearInput} />}

        {records?.length ? <ChartByUnitAndIndicator records={records} /> : null}

        {avg && (
          <Box my={5} display={"flex"} justifyContent="center">
            <Button variant="outlined" onClick={handleCostsChart}>
              Costs chart
            </Button>
          </Box>
        )}
        {annualCosts && <AnnualChartByUnitAndIndicator records={annualCosts} />}

        <IndicatorTable records={records} avg={avg}></IndicatorTable>

        <AddYearModal
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          id={id}
          indicator={indicator}
          yearInput={yearInput}
        />
      </Container>
      <Footer />
    </Box>
  );
}
