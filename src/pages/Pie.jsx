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
  const [sentiment, setSentiment] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if(searchQuery && refresh) {
      axios.get(`http://localhost:5000/sentiment?search=${searchQuery}`).then(
        (res) => {
          const sentimentArr = [
            {
              id:"neutral",
              label:"neutral",
              value:0,
              color:"hsl(291, 70%, 50%)"
            },
            {
              id:"negative",
              label:"negative",
              value:0,
              color:"hsl(104, 70%, 50%)"
            },
            {
              id:"positive",
              label:"positive",
              value:0,
              color:"hsl(50, 70%, 30%)"
            },
          ]
          for(let result of res.data) {
            sentimentArr[0].value += result.neu
            sentimentArr[1].value += result.neg
            sentimentArr[2].value += result.pos
          }
          setSentiment(sentimentArr);
          setRefresh(false);
        }
      ).catch((err) => console.log(err))
    }
  }, [refresh])

  return (
    <Box m="20px">
      <Box display="flex" flexDirection="column"  alignItems="center">
        <Header title="Sentiment Analysis" subtitle="Analyize sentiment of user base about a topic" />
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
              setRefresh(true);
            }}
          >
            <QueryStatsIcon/>
            query
          </Button>
        </Box>
      </Box>
     {sentiment && <Box height="75vh">
        <PieChart data={sentiment} />
      </Box>}
    </Box>
  );
};

export default SentimentAnalysis;