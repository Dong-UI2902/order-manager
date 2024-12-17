import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { useOrder } from "../../context/Order/Provider";

const MyCard: React.FC<{
  title: string;
  revenue: string;
  count: number;
  colorText: string;
}> = ({ title, revenue, count, colorText }) => {
  return (
    <React.Fragment>
      <CardContent>
        {/* <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Box>
          <Grid container spacing={1}>
            <Grid size={8}>
              <Typography sx={{ color: "text.secondary", mb: 1 }}>
                Tổng tiền
              </Typography>
              <Typography
                color={colorText}
                sx={{ fontSize: 20, fontWeight: 600 }}
                variant="body2"
              >
                {revenue}
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography sx={{ color: "text.secondary", mb: 1 }}>
                Tổng đơn
              </Typography>
              <Typography
                sx={{ fontSize: 20, fontWeight: 600 }}
                variant="body2"
              >
                {count}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </React.Fragment>
  );
};

const Statistical = () => {
  const { orders } = useOrder();

  const totalCodByStatus = (type?: string) => {
    let total = 0;
    let filtered = orders;
    if (type) filtered = orders.filter((item) => item.status === type);

    filtered.forEach((item) => {
      total = total + item.cod.total;
    });

    return { revenue: total.toLocaleString(), count: filtered.length };
  };

  return (
    <Box component={"section"} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <MyCard
                {...{
                  title: "Tổng hàng đã chốt",
                  ...totalCodByStatus(),
                  colorText: "success",
                }}
              />
            </Card>
          </Box>
        </Grid>
        <Grid size={3}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <MyCard
                {...{
                  title: "Tổng hàng đã giao",
                  colorText: "success",
                  ...totalCodByStatus("SHIPPED"),
                }}
              />
            </Card>
          </Box>
        </Grid>
        <Grid size={3}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <MyCard
                {...{
                  title: "Tổng hàng đang giao",
                  ...totalCodByStatus("SHIPPING"),
                  colorText: "warning",
                }}
              />
            </Card>
          </Box>
        </Grid>
        <Grid size={3}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <MyCard
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
