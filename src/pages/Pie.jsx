import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PieChart from "../components/PieChart";

const SentimentAnalysis = () => {
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
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default SentimentAnalysis;