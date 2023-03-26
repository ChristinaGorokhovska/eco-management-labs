import React from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
export interface IAnnualCosts {
  year: number;
  annual: number;
}

export default function AnnualChartByUnitAndIndicator({ records }: { records: IAnnualCosts[] | undefined }) {
  const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"];

  console.log("rec", records);

  return (
    <LineChart width={900} height={300} data={records}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      {records?.map((chart: any, i: number) => (
        <Line type="monotone" dataKey="annual" name={chart.year + ""} key={i} />
      ))}
    </LineChart>
  );
}
