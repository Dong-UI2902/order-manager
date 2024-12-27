import React from "react";
import { Box } from "@mui/material";
import Orders from "../components/DataTable/Orders";
import Statistical from "../components/Dashboard/Statistical";
import Filter from "../components/DataTable/Filter";
import SimpleSnackbar from "../components/SimpleSnackbar";

const Dashboard = () => {
  return (
    <div style={{ position: "relative" }}>
      <Filter />
      <Statistical />
      <Box component={"section"} sx={{ position: "absolute", width: "100%" }}>
        <Orders />
      </Box>
      {/* <Box component={"section"}>
        <Page />
      </Box> */}
      <SimpleSnackbar active={true} />
    </div>
  );
};

export default Dashboard;
