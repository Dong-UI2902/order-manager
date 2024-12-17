import { CardContent, Typography, Box } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";

const CardDashboard: React.FC<{
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

export default CardDashboard;
