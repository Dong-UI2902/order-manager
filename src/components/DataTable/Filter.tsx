import React from "react";
import Date from "../DateTimePicker/Date";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  PropTypes,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useOrder } from "../../context/Order/Provider";
import { useAuth } from "../../context/Auth";
import { STATUS2, TYPE } from "../../context/Order/Constain";

const FILTER = {
  deliveredBy: "",
  status: "",
  type: "",
};

const Filter = () => {
  const { date, getOrdersWithFilter } = useOrder();
  const { shippers, user } = useAuth();
  const [filter, setFilter] = React.useState(FILTER);

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value as string });
  };

  const handleClick = () => {
    sessionStorage.setItem("since", date[0] ? date[0].toDate().toString() : "");
    sessionStorage.setItem("until", date[1] ? date[1].toDate().toString() : "");
    const condition = { filter, since: date[0], until: date[1] };
    if (user?.role === "SHIPPER") condition.filter.deliveredBy = user._id;
    getOrdersWithFilter(condition);
  };

  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 1 }}
        direction="row"
        sx={{ flexWrap: "wrap" }}
      >
        <Date />
        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
          <InputLabel id="status">Trạng thái</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select"
            value={filter.status}
            label="status"
            name="status"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            {STATUS2.map((item) => {
              const color = item.color as Exclude<PropTypes.Color, "inherit">;

              return (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {user?.role !== "SHIPPER" && (
          <>
            <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
              <InputLabel id="demo-select-small-label">Vận chuyển</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filter.type}
                label="type"
                name="type"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Tất cả</em>
                </MenuItem>
                {TYPE.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">Shipper</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter.deliveredBy}
                label="deliveredBy"
                name="deliveredBy"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Tất cả</em>
                </MenuItem>
                {shippers.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={() => setFilter(FILTER)}
              color="error"
            >
              Xoá
            </Button>
          </>
        )}
        <Button variant="contained" onClick={handleClick}>
          Áp dụng
        </Button>
      </Stack>
    </>
  );
};

export default Filter;
