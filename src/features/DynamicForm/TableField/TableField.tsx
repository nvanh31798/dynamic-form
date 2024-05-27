import { useMemo, useState } from "react";
import { TableFieldModel } from "../../../types/dynamic-form/TableField";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  TextField,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import SearchIcon from "@mui/icons-material/Search";
import * as PolicyInfo from "./../../../mocks/PolicyInfo.json";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useAppDispatch } from "../../../redux/hooks";
import { openForm } from "../../../redux/slice/dynamicForm/dynamicFormSlice";
import { fetchDynamicForm } from "../../../redux/thunks/fetchDynamicFormThunk";

interface TableFieldProps {
  field: TableFieldModel;
}

export const TableField = ({ field }: TableFieldProps) => {
  type DataTableType = (typeof PolicyInfo)[0];
  const mockData: DataTableType[] = PolicyInfo;
  const [data, setdata] = useState(mockData);
  const dispatch = useAppDispatch();
  const columns = useMemo<ColumnDef<DataTableType>[]>(
    () =>
      field.headers.map((header) => ({
        header: header.label,
        cell: (info) => info.getValue(),
        accessorKey: header.key,
      })),
    [field.headers]
  );

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { pageSize, pageIndex } = tableInstance.getState().pagination;

  const handleDataSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    const searchField = field?.searchField ?? "";
    if (!value || !searchField) {
      setdata(mockData);
      return;
    }

    const matchedData = Array.from<DataTableType>(mockData).filter((item) => {
      const cloneObj = Object.assign(item);
      const fieldValue = cloneObj[searchField] as string;

      if (!cloneObj[searchField]) {
        return false;
      }
      return fieldValue.toLocaleLowerCase().includes(value.toLocaleLowerCase());
    });

    if (!matchedData) {
      return;
    }
    setdata(matchedData);
  };

  const handleAddNew = () => {
    dispatch(fetchDynamicForm({ id: field?.addNewFormId }));
    dispatch(openForm(true));
  };

  const getTableAction = () => {
    if (!field.addable || !field.searchable) {
      return <></>;
    }
    return (
      <div className="flex gap-5 flex-row-reverse mb-3">
        {field.addable && (
          <Button onClick={handleAddNew} variant="contained">
            Add
          </Button>
        )}
        {field.searchable && (
          <TextField
            onChange={(e) => handleDataSearchChange(e)}
            onBlur={(e) => handleDataSearchChange(e)}
            label="Search"
            variant="outlined"
            InputProps={{
              endAdornment: <SearchIcon fontSize="small" />,
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex-auto">
      {getTableAction()}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {tableInstance.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((column, index) => {
                  return (
                    <>
                      {index === 0 && (
                        <TableCell sx={{ fontWeight: "bold" }} key={index + 1}>
                          No
                        </TableCell>
                      )}
                      <TableCell sx={{ fontWeight: "bold" }} key={column.id}>
                        {flexRender(
                          column.column.columnDef.header,
                          column.getContext()
                        )}
                      </TableCell>
                    </>
                  );
                })
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableInstance.getRowModel().rows.map((row, index) => {
              return (
                <TableRow key={row.id}>
                  <TableCell key={index + 1}>{index + 1}</TableCell>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPage={pageSize}
          page={pageIndex}
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: data.length }]}
          component={"div"}
          count={tableInstance.getFilteredRowModel().rows.length}
          onPageChange={(_, page) => {
            tableInstance.setPageIndex(page);
          }}
          onRowsPerPageChange={(e) => {
            const size = e.target.value ? Number(e.target.value) : 10;
            tableInstance.setPageSize(size);
          }}
          ActionsComponent={TablePaginationActions}
        />
      </TableContainer>
    </div>
  );
};
