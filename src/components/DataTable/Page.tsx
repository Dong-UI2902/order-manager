import React from "react";
import DataTable from "./DataTable";

export interface ColumnPage {
  id: "name" | "orders" | "value" | "delivered" | "shipped" | "cancel";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: ColumnPage[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "orders", label: "Đơn chốt", minWidth: 100 },
  {
    id: "value",
    label: "Tổng tiền",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "delivered",
    label: "Đã giao",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "shipped",
    label: "Đang giao",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "cancel",
    label: "Đã huỷ",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

export interface DataPage {
  name: string;
  orders: number;
  value: number;
  delivered: number;
  shipped: number;
  cancel: number;
}

function createData(
  name: string,
  orders: number,
  value: number,
  delivered: number,
  shipped: number,
  cancel: number
): DataPage {
  return { name, orders, value, delivered, shipped, cancel };
}

const rows = [
  createData("Page 1", 123, 3287263, 1324171354, 3287263, 1231),
  createData("Page 2", 123, 3287263, 1403500365, 9596961, 1234),
];

const Page = () => {
  return (
    <>
      <DataTable columns={columns} rows={rows} />
    </>
  );
};

export default Page;
