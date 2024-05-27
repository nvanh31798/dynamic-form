import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface SummaryTableProps {
  creationDate: string;
  fee: number;
}

export const SummaryTable = ({ creationDate, fee }: SummaryTableProps) => {
  return (
    <TableContainer sx={{ minWidth: 250 }} className="h-fit w-full hidden md:block" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <span className="font-bold text-xl">Summary</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Creation Date:</TableCell>
            <TableCell>{creationDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fee:</TableCell>
            <TableCell>{fee}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
