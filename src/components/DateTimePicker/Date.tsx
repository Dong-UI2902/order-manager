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

const Date = () => {
  const { date, setDate } = useOrder();

  useEffect(() => {
    if ("since" in sessionStorage) {
      setDate([
        dayjs(sessionStorage.getItem("since")),
        dayjs(sessionStorage.getItem("until")),
      ]);
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        sx={{ width: 220 }}
        value={date}
        slots={{ field: SingleInputDateRangeField }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        slotProps={{ field: { size: "small" } as any }}
        label="Khoản thời gian"
        onChange={(newValue) => {
          sessionStorage.setItem(
            "since",
            newValue[0] ? newValue[0].toString() : ""
          );
          sessionStorage.setItem(
            "until",
            newValue[1] ? newValue[1].toString() : ""
          );
          setDate(newValue);
        }}
      />
    </LocalizationProvider>
  );
};

export default Date;
