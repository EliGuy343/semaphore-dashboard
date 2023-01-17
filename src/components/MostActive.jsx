import { Box, Typography, useTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { tokens } from '../theme';
import LineChart from "./LineChart";

const MostActive = ({gridColumn, gridRow, isDashboard}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [activeUsers, setActiveUsers] = useState({})
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    axios.get("http://localhost:5000/active").then(
      (res) => {
        const activeData = Object.keys(res.data["mostActivePosters"]).map(
          (key, index) => (
            {name: key, posts:res.data["mostActivePosters"][key]}
          )
        );
        setActiveUsers(activeData)
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
        mt="35px"
        p="0 30px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {isDashboard &&  <Box>
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
          >
            Most Active Users
          </Typography>
        </Box>}
      </Box>
      <Box
        height="250px"
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        { !isDashboard
          ? <LineChart width={900} height={250} stats={activeUsers}/>
          : <LineChart width={600} height={220} stats={activeUsers}/>
        }
      </Box>
    </Box>
  )
}

export default MostActive