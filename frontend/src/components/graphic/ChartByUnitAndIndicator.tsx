import { Box, Typography } from "@mui/material";
import React from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
export interface IRecord {
  year: number;
  monthes: {
    december: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    january: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    february: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    march: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    april: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    may: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    june: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    july: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    august: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    september: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    october: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    november: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
  };
}

export default function ChartByUnitAndIndicator({ records }: { records: IRecord[] | undefined }) {
  const chartsData: any = [];

  console.log(records);
  records?.forEach((record) => {
    const data: any = [];
    Object.entries(record.monthes).forEach((month) => data.push({ month: month[0], value: month[1].dailyAvg }));

    chartsData.push({
      year: record.year,
      data: data,
    });
  });

  const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"];

  return (
    <Box my={3} p={2} display={"flex"} alignItems="center" flexDirection={"column"}>
      <Typography variant="h5" color={"primary"}>
        Daily Average by every month
      </Typography>
      <LineChart width={900} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        {chartsData.map((chart: any, i: number) => (
          <Line
            type="monotone"
            dataKey="value"
            data={chart.data}
            name={chart.year + ""}
            key={chart.name}
            fill={barColors[i % 20]}
            stroke={barColors[i % 20]}
          />
        ))}
      </LineChart>
    </Box>
  );
}
