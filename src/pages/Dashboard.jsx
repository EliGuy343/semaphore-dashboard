
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../components/Header";

import StatBox from "../components/StatBox";
import { useEffect, useState } from "react";
import axios from "axios";
import Trending from "../components/Trending";
import MostActive from "../components/MostActive";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if(refresh) {
      setLoading(true);
      axios.get('http://localhost:5000/total').then(
        (res) => {
          setTotalUsers(res.data.TotalUsers)
          setTotalPosts(res.data.totalPosts)
          setRefresh(false);
          setLoading(false);
        }
      ).catch((err) => console.log(err))
    }
  }, [refresh])

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
            onClick={() => setRefresh(true)}
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
              gridColumn="span 6"
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
              gridColumn="span 6"
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
        <MostActive gridColumn="span 6" girdRow="span 2" isDashboard={true}/>
        <Trending
          gridColumn="span 6"
          gridRow="span 2"
          isDashboard={true}
        />
      </Box>
    </Box>
  )
}

export default Dashboard