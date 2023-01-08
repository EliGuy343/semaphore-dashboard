import { Box } from '@mui/material'
import BarChart from '../components/BarChart'
import Header from "../components/Header"
import Trending from '../components/Trending'


const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Current Top 5 Trending words" subtitle="In Posts" />
      <Trending/>
    </Box>
  )
}

export default Bar