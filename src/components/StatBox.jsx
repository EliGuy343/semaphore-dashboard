import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems='start'>
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' ml={1}>
          {icon}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: colors.grey[100]
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={0.5}>
            <Typography
              variant="h5"
              sx={{
                color: colors.greenAccent[500]
              }}
            >
              {subtitle}
            </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default StatBox;