import React from "react";
import { Tooltip } from "@mui/material";

const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const isDev = () => {
  return development;
};

const HandlePhoneOrAddress = (row: any, column: any) => {
  return (
    <>
      <Tooltip title="Click để copy">
        <div
          className="phone-number"
          onClick={() => navigator.clipboard.writeText(row[column.id])}
        >
          {row[column.id]}
        </div>
      </Tooltip>
    </>
  );
};
const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

export { isDev, HandlePhoneOrAddress, isMobile };
