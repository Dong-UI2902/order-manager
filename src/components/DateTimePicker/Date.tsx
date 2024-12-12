import React from "react";
import {
  LocalizationProvider,
  DateRangePicker,
  SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// const MyComponent = styled(DatePicker)({
//   input: {
//     padding: "7.5px 14px",
//   },
// });

const Date = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        sx={{ width: 220 }}
        defaultValue={[dayjs().subtract(7, "day"), dayjs()]}
        slots={{ field: SingleInputDateRangeField }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        slotProps={{ field: { size: "small" } as any }}
        label="Khoản thời gian"
      />
    </LocalizationProvider>
  );
};

export default Date;
