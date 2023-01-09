import { Box, Typography, useTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { tokens } from '../theme';
import LineChart from "./LineChart";

const MostActive = ({gridColumn, gridRow, isDashboard}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [activeUsers, setActiveUsers] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    axios.get("http://semaphore-analysis.herokuapp.com/active").then(
      (res) => {
        console.log(res.data);
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
      height='215%'
    >
      <Box
        mt="25px"
        p="0 30px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
          >
            All Recent Activity
          </Typography>
        </Box>
      </Box>
      <Box height="250px" m="-20px 0 0 0">
        <LineChart/>
      </Box>
    </Box>
  )
}

export default MostActive