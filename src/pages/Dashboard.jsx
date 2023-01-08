
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockTransactions } from "../data/mockdata";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../components/Header";
import LineChart from "../components/LineChart";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import BarChart from "../components/BarChart";
import StatBox from "../components/StatBox";
import ProgressCircle from "../components/ProgressCircle";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalUsers, setTotalUsers] = useState(0);
  const [mostActiveUser, setMostActiveUser] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    axios.get('http://semaphore-analysis.herokuapp.com/total').then(
      (res) => {
        const totalData = res.data;
        setTotalUsers(totalData['total_users'])
        setMostActiveUser(totalData['max_posts'])
        setTotalPosts(totalData['total_users'])
        setLoading(false);
        setRefresh(false);
      }
    ).catch((err) => console.log(err))
  }, [])

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        align-items="center"
      >
        <Header title="DASHBOARD"  subtitle="welcome to your dashboard"/>
        <Box mt="20px">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize:"14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr:"10px"}} />
            Refersh Data
          </Button>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        >
      {!loading &&
        <>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={totalPosts}
              subtitle="Total Posts"
              progress="0.75"
              increase="+14%"
              icon={
                <MessageRoundedIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                    mr:'10px',
                    ml:'10px'
                  }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection='column'
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={{
                fontSize:'14px',
                fontWeight:'bold',
                mb:'4px'
              }}
            >
              Most Active User
            </Typography>
            <StatBox
              subtitle={mostActiveUser.user}
              title={'Posts: ' + mostActiveUser.max_posts}
              progress="0.50"
              increase="+21%"
              icon={
                <PersonRoundedIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                    mr:'10px',
                    ml:'10px'
                  }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={totalUsers}
              subtitle="New Clients"
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                  mr:'10px',
                  ml:'10px'
                }}
                />
              }
            />
          </Box>
        </>
      }
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
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
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard