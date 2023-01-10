import { CartesianGrid, Legend, Line, LineChart as LineChartGraph, XAxis, YAxis } from "recharts";
import { Tooltip, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockdata";

const LineChart = ({stats,width, height, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(stats)
  return (
    <LineChartGraph
      width={width}
      height={height}
      data={stats}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke={colors.primary[100]} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="posts" stroke={colors.greenAccent[500]} />
    </LineChartGraph>
  );
};

export default LineChart;