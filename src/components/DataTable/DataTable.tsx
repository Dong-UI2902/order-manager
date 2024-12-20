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
  Chip,
  Badge,
  Link,
  PropTypes,
} from "@mui/material";
import React from "react";
import { ColumnOrder } from "./Orders";
import { ColumnPage } from "./Page";
import { STATUS2, TYPE } from "../../context/Order/Constain";
import { useOrder } from "../../context/Order/Provider";
import { useAuth } from "../../context/Auth";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { HandlePhoneOrAddress, isMobile } from "../../config/helper";

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
    switch (column.id) {
      case "createdBy":
        return row[column.id].name;

      case "name":
        return (
          <Badge color="secondary" variant="dot" invisible={row["desc"] === ""}>
            <Tooltip title={row["desc"]} arrow>
              <span>{row[column.id]}</span>
            </Tooltip>
          </Badge>
        );

      case "cod":
        return (
          <Tooltip
            title={row[column.id].deposit.toLocaleString("en-US")}
            arrow
            sx={{ maxWidth: column.maxWidth }}
          >
            <Chip
              label={column.format(
                row[column.id].total +
                  row[column.id].deposit -
                  row[column.id].transCost
              )}
              icon={
                row[column.id].paid ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <></>
                )
              }
              variant="outlined"
              color={row[column.id].deposit > 0 ? "warning" : "default"}
            />
          </Tooltip>
        );
      case "createdAt":
        return column.format(row[column.id]);

      case "action":
        return (
          <Link target="_blank" href={`/order/${row._id}`}>
            <IconButton aria-label="delete" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
        );

      case "type":
        return (
          <FormControl variant="standard" sx={{ width: column.maxWidth }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={row["type"]}
              onChange={(event: { target: { value: string } }) => {
                updateOrder({ ...row, type: event.target.value });
              }}
              disableUnderline
            >
              {TYPE.map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "deliveredBy":
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

      case "status":
        return (
          <FormControl variant="standard" sx={{ width: column.maxWidth }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={row["status"]}
              onChange={(event: { target: { value: string } }) => {
                updateOrder({ ...row, status: event.target.value });
              }}
              disableUnderline
            >
              {STATUS2.map((item) => {
                const color = item.color as Exclude<PropTypes.Color, "inherit">;

                return (
                  <MenuItem value={item.id} key={item.id}>
                    <Chip label={item.name} variant="filled" color={color} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );

      case "phoneNumber":
        return HandlePhoneOrAddress(row, column);

      case "address":
        return HandlePhoneOrAddress(row, column);

      default:
        return row[column.id];
    }
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
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row._id}
                    // sx={{
                    //   backgroundColor: `${row.status === "SHIPPED" && "rgb(237, 247, 237)!important"}`,
                    // }}
                  >
                    {columns.map((column) => {
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
