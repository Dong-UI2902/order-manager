import React, { useEffect } from "react";
import Date from "../DateTimePicker/Date";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  PropTypes,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useOrder } from "../../context/Order/Provider";
import { useAuth } from "../../context/Auth";
import { STATUS2, TYPE } from "../../context/Order/Constain";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const FILTER = {
  deliveredBy: "",
  status: "",
  type: "",
};

const Filter = () => {
  const { date, getOrdersWithFilter, findByPhoneNumber } = useOrder();
  const { shippers, user } = useAuth();
  const [filter, setFilter] = React.useState(FILTER);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [searching, setSearching] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value as string });
  };

  const handleClick = () => {
    if (phoneNumber) {
      setFilter(FILTER);
      return findByPhoneNumber(phoneNumber);
    }

    sessionStorage.setItem("since", date[0] ? date[0].toDate().toString() : "");
    sessionStorage.setItem("until", date[1] ? date[1].toDate().toString() : "");
    const condition = { filter, since: date[0], until: date[1] };
    if (user?.role === "SHIPPER") condition.filter.deliveredBy = user._id;
    getOrdersWithFilter(condition);
  };

  useEffect(() => {
    if (phoneNumber) return setSearching(true);

    return setSearching(false);
  }, [phoneNumber]);

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Bộ lọc</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl sx={{ minWidth: 300 }} size="small" variant="outlined">
            <InputLabel htmlFor="outlined-adornment">Tìm kiếm</InputLabel>
            <OutlinedInput
              id="outlined-adornment"
              type={"text"}
              endAdornment={
                <InputAdornment position="end">
                  <ManageSearchIcon />
                </InputAdornment>
              }
              label="search"
              onChange={(event: { target: { value: string } }) => {
                setPhoneNumber(event.target.value);
              }}
            />
          </FormControl>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Date />
          </Box>
          <Box mt={1}>
            <FormControl sx={{ minWidth: 140 }} size="small">
              <InputLabel id="status">Trạng thái</InputLabel>
              <Select
                labelId="status"
                id="demo-simple-select"
                value={filter.status}
                label="status"
                name="status"
                onChange={handleChange}
                disabled={searching}
              >
                <MenuItem value="">
                  <em>Tất cả</em>
                </MenuItem>
                {STATUS2.map((item) => {
                  const color = item.color as Exclude<
                    PropTypes.Color,
                    "inherit"
                  >;

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
                <FormControl sx={{ minWidth: 140 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Vận chuyển
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={filter.type}
                    label="type"
                    name="type"
                    onChange={handleChange}
                    disabled={searching}
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
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">Shipper</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter.deliveredBy}
                    label="deliveredBy"
                    name="deliveredBy"
                    onChange={handleChange}
                    disabled={searching}
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
              </>
            )}
          </Box>
        </AccordionDetails>
        <AccordionActions>
          <Button
            variant="outlined"
            onClick={() => setFilter(FILTER)}
            color="error"
          >
            Xoá
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Áp dụng
          </Button>
        </AccordionActions>
      </Accordion>
    </>
  );
};

export default Filter;
