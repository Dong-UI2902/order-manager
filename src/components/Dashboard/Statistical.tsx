import { Box, Card } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { useOrder } from "../../context/Order/Provider";
import CardDashboard from "./CardDashboard";

const Statistical = () => {
  const { orders } = useOrder();

  const totalCodByStatus = (type?: string) => {
    let total = 0;
    let filtered = orders;
    if (type) filtered = orders.filter((item) => item.status === type);

    filtered.forEach((item) => {
      total = total + item.cod.total + item.cod.deposit - item.cod.transCost;
    });

    return { revenue: total.toLocaleString(), count: filtered.length };
  };

  return (
    <Box component={"section"} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <CardDashboard
                {...{
                  title: "Tổng hàng đã chốt",
                  ...totalCodByStatus(),
                  colorText: "success",
                }}
              />
            </Card>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <CardDashboard
                {...{
                  title: "Tổng hàng đã giao",
                  colorText: "success",
                  ...totalCodByStatus("SHIPPED"),
                }}
              />
            </Card>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <CardDashboard
                {...{
                  title: "Tổng hàng đang giao",
                  ...totalCodByStatus("SHIPPING"),
                  colorText: "warning",
                }}
              />
            </Card>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <CardDashboard
                {...{
                  title: "Tổng hàng đã huỷ",
                  ...totalCodByStatus("CANCEL"),
                  colorText: "error",
                }}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistical;
