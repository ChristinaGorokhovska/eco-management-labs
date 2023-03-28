import { Box } from "@mui/material";
import React from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Label } from "recharts";
export interface IAnnualCosts {
  year: number;
  annual: number;
}

export default function AnnualChartByUnitAndIndicator({ records }: { records: IAnnualCosts[] | undefined }) {
  return (
    <Box my={3} p={2} display={"flex"} justifyContent="center">
      <LineChart
        width={900}
        height={300}
        data={records}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis dataKey={"annual"}>
          {" "}
          <Label
            dx={-20}
            offset={5}
            style={{
              textAnchor: "middle",
            }}
            angle={270}
            value={"UAH"}
          />
        </YAxis>

        <Legend />
        {records?.map((chart: any, i: number) => (
          <Line type="monotone" dataKey="annual" name={chart.year + ""} key={chart.year} />
        ))}
      </LineChart>
    </Box>
  );
}
