import React from "react";
import Date from "../components/DateTimePicker/Date";
import { Box, Stack } from "@mui/material";
import Orders from "../components/DataTable/Orders";
import Statistical from "../components/Dashboard/Statistical";

const Dashboard = () => {
  return (
    <div style={{ position: "relative" }}>
      <Stack direction="row" spacing={2}>
        <Date />
      </Stack>
      <Statistical />
      <Box component={"section"} sx={{ position: "absolute", width: "100%" }}>
        <Orders />
      </Box>
      {/* <Box component={"section"}>
        <Page />
      </Box> */}
    </div>
  );
};

export default Dashboard;