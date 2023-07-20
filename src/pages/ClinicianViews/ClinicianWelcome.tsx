import { Box, Typography } from "@mui/material";
import * as React from "react";

const ClinicianWelcome: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexFlow: "column nowrap",
        margin: "4em",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to MyMCNY!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you can request payment for sessions which are outside our normal
        billing period and inform school hours or other extra work which needs
        to be compensated.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Reminder: Our billing period goes from Saturday to Friday and payments
        are made weekly on Tuesdays.
      </Typography>
    </Box>
  );
};

export default ClinicianWelcome;
