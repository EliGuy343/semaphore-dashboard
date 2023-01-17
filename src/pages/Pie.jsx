import { useTheme } from "@emotion/react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PieChart from "../components/PieChart";
import { tokens } from "../theme";
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const SentimentAnalysis = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/sentiment?search=Biden").then(
      (res) => {
        console.log(res.data)
      }
    ).catch((err) => console.log(err))
  }, [])

  return (
    <Box m="20px">
      <Box display="flex" flexDirection="column"  alignItems="center">
        <Header title="Sentiment Analysis" subtitle="Analyize sentiment of User base" />
        <TextField
          id="outlined-basic"
          label="Query Sentiment..."
          variant="outlined"
          sx={{
            width: "40%",
            backgroundColor:colors.primary[400]
          }}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
        <Box mt="20px">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize:"14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => {
              setSearchQuery(searchString);
            }}
          >
            <QueryStatsIcon/>
            query
          </Button>
        </Box>
      </Box>
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default SentimentAnalysis;