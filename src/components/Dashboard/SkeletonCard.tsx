import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonCard = () => {
  return (
    <div>
      <Skeleton variant="rounded" width={275} height={142} />
    </div>
  );
};

export default SkeletonCard;
