import { useTheme } from "@emotion/react";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PieChart from "../components/PieChart";
import { tokens } from "../theme";

const SentimentAnalysis = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    axios.get("https://semaphore-analysis.herokuapp.com/sentiment?search=Biden").then(
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
        />

      </Box>
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default SentimentAnalysis;