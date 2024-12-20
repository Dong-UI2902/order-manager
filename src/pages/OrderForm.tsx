import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { ORDER, PAGE, TYPE } from "../context/Order/Constain";
import { useOrder } from "../context/Order/Provider";
import { useAuth } from "../context/Auth";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";

const OrderForm = () => {
  const {
    order,
    setOrder,
    stringToArr,
    addNewOrder,
    findById,
    updateOrder,
    loading,
    error,
  } = useOrder();
  const { user, shippers, getShipper } = useAuth();
  const { id } = useParams();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleQuickForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      const arr = value.split("\n");

      return setOrder({
        ...order,
        name: arr[0],
        phoneNumber: arr[1],
        address: arr[2],
        cod: {
          ...order.cod,
          total: Number(arr[3]?.replace(/[^0-9]/g, "")),
        },
      });
    }

    return setOrder(ORDER);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newOrder = {
      ...order,
      cod: {
        ...order.cod,
        total: Number(order.cod.total.toLocaleString().replace(/\D/g, "")),
      },
      createdBy: user,
    };

    if (id) return updateOrder(newOrder);

    return addNewOrder(newOrder);
  };

  useEffect(() => {
    getShipper();
    if (!user) window.location.href = "/signin";

    if (id) {
      return findById(id);
    }

    return setOrder(ORDER);
  }, []);

  return (
    <div className="Order">
      <Box
        component={"section"}
        sx={{ flexGrow: 1 }}
        className="order__container"
      >
        <h2>{id ? "Cập nhật đơn hàng" : "Tạo mới đơn hàng"}</h2>

        <form onSubmit={handleSubmit} id="myForm">
          <Grid container spacing={1}>
            <Grid size={{ xs: 6, md: 6 }}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Tên"
                  name="name"
                  onChange={handleChange}
                  variant="outlined"
                  value={order.name}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={order.phoneNumber}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Địa chỉ"
                  variant="outlined"
                  name="address"
                  onChange={handleChange}
                  value={order.address}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <FormControl fullWidth>
                <TextField
                  id="standard-basic"
                  label="Ghi chú"
                  variant="outlined"
                  name="desc"
                  onChange={handleChange}
                  value={order.desc}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="cod"
                  variant="outlined"
                  name="cod"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="start">vnđ</InputAdornment>
                      ),
                    },
                  }}
                  onChange={(event: any) => {
                    setOrder({
                      ...order,
                      cod: { ...order.cod, total: event.target.value },
                    });
                  }}
                  value={order.cod.total.toLocaleString("en-US")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Đã thanh toán"
                  checked={order.cod.paid}
                  sx={{ mt: 1 }}
                  onChange={(event: any) => {
                    setOrder({
                      ...order,
                      cod: { ...order.cod, paid: event.target.checked },
                    });
                  }}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <FormControl fullWidth>
                <TextField
                  id="standard-basic"
                  label="Tiền cọc"
                  variant="outlined"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="start">vnđ</InputAdornment>
                      ),
                    },
                  }}
                  value={order.cod.deposit.toLocaleString("en-US")}
                  onChange={(event: any) => {
                    setOrder({
                      ...order,
                      cod: { ...order.cod, deposit: event.target.value },
                    });
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="standard-basic"
                  label="Phí ship"
                  variant="standard"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="start">vnđ</InputAdornment>
                      ),
                    },
                  }}
                  value={order.cod.transCost.toLocaleString("en-US")}
                  onChange={(event: any) => {
                    setOrder({
                      ...order,
                      cod: { ...order.cod, transCost: event.target.value },
                    });
                  }}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4, md: 4 }}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-filled-label">
                  Vận chuyển
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={order.type}
                  name="type"
                  onChange={(event: { target: { value: string } }) => {
                    setOrder({ ...order, type: event.target.value });
                  }}
                >
                  {TYPE.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4, md: 4 }}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-filled-label">
                  Người giao
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={order.deliveredBy ? order.deliveredBy : ""}
                  onChange={(event: { target: { value: string } }) => {
                    if (event.target.value)
                      setOrder({
                        ...order,
                        deliveredBy: event.target.value,
                      });
                  }}
                  disabled={order.type !== "SHIPPER"}
                >
                  {shippers?.map((item) => (
                    <MenuItem value={item._id} key={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4, md: 4 }}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-filled-label">
                  Fanpage
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={order.page ? order.page : ""}
                  onChange={(event: { target: { value: string } }) => {
                    if (event.target.value)
                      setOrder({ ...order, page: event.target.value });
                  }}
                >
                  {PAGE.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <FormControl variant="filled" fullWidth>
                <TextField
                  id="outlined-multiline-static"
                  // label="Sản phẩm"
                  multiline
                  rows={4}
                  defaultValue={order.products}
                  onChange={(event: { target: { value: string } }) => {
                    setOrder({
                      ...order,
                      products: stringToArr(event.target.value),
                    });
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Typography color="error" variant="subtitle1" gutterBottom>
            {error}
          </Typography>
          <div>
            <FormControl
              variant="filled"
              sx={{ ml: 1, mt: 1.5, mb: 1, width: "25ch" }}
            >
              <Button variant="contained" type="submit" disabled={loading}>
                {id ? "Cập nhật đơn hàng" : "Tạo mới đơn hàng"}
              </Button>
            </FormControl>
          </div>
          <Box
            component={"section"}
            sx={{ flexGrow: 1 }}
            className="order__container"
          >
            <h2>Bản nháp</h2>
            <FormControl variant="filled" fullWidth>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={8}
                defaultValue={""}
                onChange={handleQuickForm}
              />
            </FormControl>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default OrderForm;
