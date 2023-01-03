import { Box } from '@mui/system'
import React from 'react'
import Header from '../components/Header'

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        align-items="center"
      >
        <Header title="DASHBOARD"  subtitle="welcome to your dashboard"/>
      </Box>
    </Box>
  )
}

export default Dashboard