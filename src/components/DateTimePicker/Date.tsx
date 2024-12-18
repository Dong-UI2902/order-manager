import React, { useEffect } from "react";
import {
  LocalizationProvider,
  DateRangePicker,
  SingleInputDateRangeField,
  DateRange,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { useOrder } from "../../context/Order/Provider";
// const MyComponent = styled(DatePicker)({
//   input: {
//     padding: "7.5px 14px",
//   },
// });
import dayjs, { Dayjs } from "dayjs";
import { Button } from "@mui/material";

const Date = () => {
  const { date, setDate, getOrdersWithFilter } = useOrder();

  const handleClick = () => {
    console.log(date);

    sessionStorage.setItem("since", date[0] ? date[0].toString() : "");
    sessionStorage.setItem("until", date[1] ? date[1].toString() : "");
    getOrdersWithFilter({ filter: "", since: date[0], until: date[1] });
  };

  useEffect(() => {
    if ("since" in sessionStorage) {
      setDate([
        dayjs(sessionStorage.getItem("since")),
        dayjs(sessionStorage.getItem("until")),
      ]);
    }
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          sx={{ width: 220 }}
          value={date}
          slots={{ field: SingleInputDateRangeField }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          slotProps={{ field: { size: "small" } as any }}
          label="Khoản thời gian"
          onChange={(newValue) =>
            setDate([
              newValue[0]
                ? newValue[0].set("hour", 0).set("minute", 0).set("second", 0)
                : dayjs(),
              newValue[1]
                ? newValue[1]
                    .set("hour", 23)
                    .set("minute", 59)
                    .set("second", 59)
                : dayjs(),
            ])
          }
        />
      </LocalizationProvider>
      <Button variant="contained" onClick={handleClick}>
        Áp dụng
      </Button>
    </>
  );
};

export default Date;
