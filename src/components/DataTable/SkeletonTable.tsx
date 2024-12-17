import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonTable = () => {
  return (
    <div>
      <Skeleton variant="rounded" width={"100%"} height={300} />
    </div>
  );
};

export default SkeletonTable;
