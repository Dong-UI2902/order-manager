import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Chip,
  FormControl,
  MenuItem,
  Select,
  PropTypes,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useOrder } from "../context/Order/Provider";
import Date from "../components/DateTimePicker/Date";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { STATUS2 } from "../context/Order/Constain";
import Grid from "@mui/material/Grid2";

const Shipping = () => {
  const { date, orders, getOrdersWithFilter, loading, updateOrder } =
    useOrder();
  const { user } = useAuth();

  useEffect(() => {
    if ("since" in sessionStorage) {
      getOrdersWithFilter({
        filter: {
          deliveredBy: user ? user._id : "",
        },
      });
    } else {
      getOrdersWithFilter({
        filter: {
          deliveredBy: user ? user._id : "",
        },
        since: date[0],
        until: date[1],
      });
    }
  }, []);

  return (
    <div className="shopping">
      <Date />
      <div className="shopping__section">
        <div className="shopping__title">Tất cả các đơn hàng của bạn</div>
        {orders?.length > 0 ? (
          <div>
            {orders.map((item) => (
              <div key={item._id} className="cart">
                <div className="cart__bill">
                  <div className="cart__bill-name">{item.name}</div>
                  <div
                    className="cart__bill-phoneNumber"
                    onClick={() =>
                      navigator.clipboard.writeText(item.phoneNumber)
                    }
                  >
                    <Chip
                      sx={{ height: "25px" }}
                      color="default"
                      label={item.phoneNumber}
                    />
                  </div>
                </div>
                <div className="cart__bill-address">{item.address}</div>
                <Accordion className="cart__accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ padding: "5px", margin: 0 }}
                  >
                    <Typography>Thông tin đặt hàng</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 6, md: 6 }}>
                        <TextField
                          id="cod"
                          label="Cod"
                          variant="standard"
                          InputProps={{
                            readOnly: true,
                          }}
                          value={item.cod.total.toLocaleString("en-US")}
                          color="success"
                        />
                      </Grid>
                      <Grid size={{ xs: 6, md: 6 }}>
                        <TextField
                          id="transCost"
                          label="Phí ship"
                          variant="standard"
                          InputProps={{
                            readOnly: true,
                          }}
                          value={item.cod.transCost.toLocaleString("en-US")}
                          color="error"
                        />
                      </Grid>
                      <Grid
                        size={{ xs: 12, md: 12 }}
                        justifyContent="end"
                        display="flex"
                      >
                        <TextField
                          id="total"
                          label="Tiền trả lại shop"
                          variant="standard"
                          color="info"
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ width: "145px" }}
                          value={(
                            item.cod.total - item.cod.transCost
                          ).toLocaleString("en-US")}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <TextField
                          id="standard-basic"
                          label="Sản phẩm"
                          InputProps={{
                            readOnly: true,
                          }}
                          multiline
                          rows={3}
                          value={item.products}
                          fullWidth
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <div>Ghi chú: {item.desc}</div>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Box display={"flex"} justifyContent={"end"}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={item.status}
                      onChange={(event: { target: { value: string } }) => {
                        updateOrder({ ...item, status: event.target.value });
                      }}
                      disableUnderline
                    >
                      {STATUS2.map((item, index) => {
                        const color = item.color as Exclude<
                          PropTypes.Color,
                          "inherit"
                        >;

                        if (item.id !== "TO SHIP")
                          return (
                            <MenuItem value={item.id} key={item.id}>
                              <Chip
                                label={item.name}
                                variant="filled"
                                color={color}
                                sx={{ width: "100%" }}
                              />
                            </MenuItem>
                          );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: "50px" }}>
            <center>Bạn chưa có đơn giao nào</center>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipping;
