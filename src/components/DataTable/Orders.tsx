import React, { useEffect } from "react";
import DataTable from "./DataTable";
import { useOrder } from "../../context/Order/Provider";
import { formatDistance } from "date-fns";
import { useAuth } from "../../context/Auth";
import { vi } from "date-fns/locale";
import SkeletonTable from "./SkeletonTable";

export interface ColumnOrder {
  id:
    | "name"
    | "address"
    | "phoneNumber"
    | "cod"
    | "type"
    | "deliveredBy"
    | "status"
    | "createdBy"
    | "createdAt"
    | "page"
    | "action";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  format?: (value: any) => string;
}

const columns: ColumnOrder[] = [
  { id: "name", label: "Tên khách hàng", minWidth: 150 },
  {
    id: "type",
    label: "VC",
    maxWidth: 100,
    align: "right",
  },
  { id: "address", label: "Địa chỉ", minWidth: 200 },
  {
    id: "phoneNumber",
    label: "Số điện thoại",
    minWidth: 70,
    align: "right",
    // format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "cod",
    label: "Tiền cod",
    maxWidth: 150,
    align: "right",
    format: (value: number) => `${value.toLocaleString("en-US")}vnđ`,
  },
  {
    id: "deliveredBy",
    label: "Người giao",
    maxWidth: 100,
    align: "right",
  },
  {
    id: "status",
    label: "Trạng thái",
    maxWidth: 100,
    align: "right",
  },
  {
    id: "createdBy",
    label: "Người tạo",
    minWidth: 100,
    align: "right",
  },
  {
    id: "createdAt",
    label: "Ngày tạo",
    align: "right",
    format: (value: Date) =>
      `${formatDistance(new Date(), new Date(value), { locale: vi })}`,
  },
  {
    id: "page",
    label: "Page",
    align: "right",
  },
  {
    id: "action",
    label: "Thao tác",
    align: "right",
  },
];

// function createData(
//   name: string,
//   code: string,
//   population: number,
//   size: number
// ): DataOrder {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

const Orders = () => {
  const { orders, getOrdersWithFilter, date, loading } = useOrder();
  const { getShipper } = useAuth();

  useEffect(() => {
    if ("since" in sessionStorage) {
      getOrdersWithFilter({
        filter: "",
        since: sessionStorage.getItem("since"),
        until: sessionStorage.getItem("until"),
      });
    } else {
      getOrdersWithFilter({ filter: "", since: date[0], until: date[1] });
    }

    getShipper();
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonTable />
      ) : (
        <DataTable columns={columns} rows={orders || []} />
      )}
    </>
  );
};

export default Orders;
