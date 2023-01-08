import { Box } from '@mui/material'
import BarChart from '../components/BarChart'
import Header from "../components/Header"
import Trending from '../components/Trending'


const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Trending/>
    </Box>
  )
}

export default Bar