import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import axios, { AxiosHeaders } from "axios";
import { useEffect, useState } from "react"
import { tokens } from "../theme";
import BarChart from "./BarChart";

const Trending = (gridColumn, gridRow, isDashboard) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [trending, setTrending] = useState([]);
  const [keys, setKeys]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    axios.get("http://semaphore-analysis.herokuapp.com/trending/top5").then(
      (res) => {
        setTrending(res.data.map((arr) => ({
          "trending": arr[0],
          "count": arr[1],
          "countColor": "hsl(290, 70%, 50%)"
        })))
        setKeys(["count"])
        setLoading(false);

      }
    ).catch((err) => console.log(err))
  }, [])
  if(loading) {
    return (
      <Box>
        <Typography variant="h4" fontWeight={600} sx={{ padding: "30px 30px 0 30px" }}>
          Loading...
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      gridColumn={gridColumn}
      gridRow={gridRow}
      backgroundColor={colors.primary[400]}
    >
      <Typography
        variant="h5"
        fontWeight="600"
        sx={{ padding: "30px 30px 0 30px" }}
      >
        Top 5 trending words
      </Typography>
      <Box height="250px" mt="-20px">
        <BarChart stats={trending} keys={keys}/>
      </Box>
  </Box>
  )
}

export default Trending