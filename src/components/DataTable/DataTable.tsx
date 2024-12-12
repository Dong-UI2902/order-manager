import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  IconButton,
} from "@mui/material";
import React from "react";
import { ColumnOrder } from "./Orders";
import { ColumnPage } from "./Page";
import { STATUS, TYPE } from "../../context/Order/Constain";
import { useOrder } from "../../context/Order/Provider";
import { useAuth } from "../../context/Auth";
import EditIcon from "@mui/icons-material/Edit";

const DataTable: React.FC<{
  columns: ColumnOrder[] | ColumnPage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
}> = ({ columns, rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { updateOrder } = useOrder();
  const { shippers } = useAuth();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const HandleValue = (row: any, column: any) => {
    if (column.id == "createdBy") return row[column.id].name;

    if (column.id === "cod" || column.id === "createdAt")
      return column.format(row[column.id]);

    if (column.id === "action")
      return (
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => (window.location.href = `order/${row._id}`)}
        >
          <EditIcon />
        </IconButton>
      );

    if (column.id == "phoneNumber" || column.id == "address")
      return (
        <Tooltip title="Click để copy">
          <div
            className="phone-number"
            onClick={() => navigator.clipboard.writeText(row[column.id])}
          >
            {row[column.id]}
          </div>
        </Tooltip>
      );

    if (column.id === "type")
      return (
        <FormControl variant="standard" sx={{ width: column.maxWidth }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={row["type"]}
            onChange={(event: { target: { value: string } }) => {
              updateOrder({ ...row, type: event.target.value });
            }}
          >
            {TYPE.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    if (column.id === "deliveredBy") {
      return (
        <FormControl variant="standard" sx={{ width: column.maxWidth }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={row["deliveredBy"] ? row["deliveredBy"] : ""}
            onChange={(event: { target: { value: string } }) => {
              updateOrder({ ...row, deliveredBy: event.target.value });
            }}
            disabled={row["type"] !== "SHIPPER"}
          >
            {shippers.map((item) => (
              <MenuItem value={item._id} key={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    if (column.id === "status") {
      return (
        <FormControl variant="standard" sx={{ width: column.maxWidth }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={row["status"]}
            onChange={(event: { target: { value: string } }) => {
              updateOrder({ ...row, status: event.target.value });
            }}
          >
            {STATUS.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return row[column.id];
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    top: 57,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {HandleValue(row, column)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
