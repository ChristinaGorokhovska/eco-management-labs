import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, Sector } from "recharts";
import { IAnnualCostsPie } from "../../pages/Unit";

const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 1} y={ey} textAnchor={textAnchor} fill="#333">{`${value.toFixed(
        2
      )} UAH `}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 1} y={ey} dy={25} textAnchor={textAnchor} fill="#999">
        {` ${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};
export default function AnnualPieChart({ records, year }: { records: IAnnualCostsPie[] | undefined; year: string }) {
  const [activeIndex, setActiveIndex] = useState<number>();

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <Box my={3} p={2} display={"flex"} alignItems="center" flexDirection={"column"}>
      <Typography variant="h5" color={"primary"}>
        Energy balance for {year} year
      </Typography>
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={records}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="annual"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </Box>
  );
}
