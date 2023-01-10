import { Box } from "@mui/material";
import Header from "../components/Header";
import MostActive from "../components/MostActive";
const Line = () => {
  return (
    <Box m="20px">
      <Header title="Most Active Users" subtitle="The Users who post the most" />
      <MostActive/>
    </Box>
  );
};

export default Line;