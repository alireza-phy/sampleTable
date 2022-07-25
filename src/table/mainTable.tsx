import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CostomizedTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
    borderRadius: "24px" ,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    borderRadius: "24px" ,
  },
}));

interface Data {
  id: number;
  GivenName: string;
  FamilyName: string;
  Email: string;
  Sites: string[];
  Access: string[];
  LastLoggedIn: string;
}

function createData(
  id: number,
  GivenName: string,
  FamilyName: string,
  Email: string,
  Sites: string[],
  Access: string[],
  LastLoggedIn: string,
): Data {
  return {
    id,
    GivenName,
    FamilyName,
    Email,
    Sites,
    Access,
    LastLoggedIn,
  };
}

const rows = [
  createData(1, 'ali', 'abasi', 'alireza@gmail.com', ["alireza.com", "ali.com"], ["Administrator", "Developer", "Laundromat Owner"], "15 min ago"),
  createData(2, 'mamad', 'ahmadi', 'alireza@gmail.com', ["alireza.com", "ali.com", "mamad.com"], ["Administrator", "Developer", "Laundromat Owner"], "15 min ago"),
  createData(3, 'reza', 'sahebi', 'alireza@gmail.com', ["alireza.com"], ["Administrator", "Developer", "Laundromat Owner"], "15 min ago"),
  createData(4, 'peyman', 'hasani', 'alireza@gmail.com', ["alireza.com"], ["Administrator", "Developer", "Laundromat Owner"], "15 min ago"),
  createData(5, 'zari', 'hashemi', 'alireza@gmail.com', ["alireza.com"], ["Administrator", "Developer", "Laundromat Owner"], "15 min ago"),
  createData(6, 'mojde', 'safari', 'alireza@gmail.com', ["alireza.com"], ["Administrator", "Developer", "Laundromat Owner"], "15 min ago"),
  createData(7, 'mina', 'zamani', 'alireza@gmail.com', ["alireza.com"], ["Administrator", "Developer", "Laundromat Owner"], "15 min ago"),
  createData(8, 'maryam', 'ghorbani', 'alireza@gmail.com', ["alireza.com"], ["Administrator", "Developer", "Laundromat Owner"], "15 min ago"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: any },
    b: { [key in Key]: any },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  id: keyof Data;
  label: string;
  // numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'GivenName',
    label: 'Given Name',
  },
  {
    id: 'FamilyName',
    label: 'Family Name',
  },
  {
    id: 'Email',
    label: 'Email',
  },
  {
    id: 'Sites',
    label: 'Site(s)',
  },
  {
    id: 'Access',
    label: 'Access/Status',
  },
  {
    id: 'LastLoggedIn',
    label: 'Last Logged In',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {(headCell.id === "Sites" || headCell.id === "Access") ?
              <div>  {headCell.label} </div> :
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            }

          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.slice().sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell align="center">{row.GivenName}</TableCell>
                      <TableCell align="center">{row.FamilyName}</TableCell>
                      <TableCell align="center">{row.Email}</TableCell>
                      <TableCell align="center">
                        {row.Sites.map(item => {
                          return (
                            <div>
                              {item}
                            </div>
                          )
                        })
                        }
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", gap: 2 , justifyContent:"center" }}>
                          {row.Access.map(item => {
                            return (
                              <>
                                {item === "Administrator" &&
                                <CostomizedTooltip title="Administrator">
                                  <Box>
                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M14.502 5.76758C14.6191 6.03125 14.5312 6.29492 14.3262 6.5L13.0664 7.64258C13.0957 7.87695 13.125 8.14062 13.125 8.375C13.125 8.63867 13.0957 8.90234 13.0664 9.13672L14.3262 10.2793C14.5312 10.4844 14.6191 10.748 14.502 11.0117C14.3848 11.3633 14.2383 11.6855 14.0625 12.0078L13.916 12.2422C13.7109 12.5645 13.5059 12.8867 13.2715 13.1797C13.0957 13.3848 12.8027 13.4434 12.5391 13.3555L10.9277 12.8574C10.5176 13.1504 10.0781 13.3848 9.63867 13.5898L9.25781 15.2598C9.19922 15.5234 8.99414 15.7285 8.73047 15.7871C8.32031 15.8457 7.91016 15.875 7.4707 15.875C7.06055 15.875 6.65039 15.8457 6.24023 15.7871C5.97656 15.7285 5.77148 15.5234 5.71289 15.2598L5.33203 13.5898C4.89258 13.3848 4.45312 13.1504 4.04297 12.8574L2.43164 13.3555C2.16797 13.4434 1.875 13.3848 1.69922 13.1797C1.46484 12.8867 1.25977 12.5645 1.05469 12.2422L0.908203 12.0078C0.732422 11.6855 0.585938 11.3633 0.46875 11.0117C0.351562 10.748 0.439453 10.4844 0.644531 10.2793L1.9043 9.13672C1.875 8.90234 1.875 8.63867 1.875 8.375C1.875 8.14062 1.875 7.87695 1.9043 7.64258L0.644531 6.5C0.439453 6.29492 0.351562 6.03125 0.46875 5.76758C0.585938 5.41602 0.732422 5.09375 0.908203 4.77148L1.05469 4.53711C1.25977 4.21484 1.46484 3.89258 1.69922 3.59961C1.875 3.39453 2.16797 3.33594 2.43164 3.42383L4.04297 3.92188C4.45312 3.62891 4.89258 3.36523 5.33203 3.18945L5.71289 1.51953C5.77148 1.25586 5.97656 1.05078 6.24023 0.992188C6.65039 0.933594 7.06055 0.875 7.5 0.875C7.91016 0.875 8.32031 0.933594 8.73047 0.992188C8.99414 1.05078 9.19922 1.25586 9.25781 1.51953L9.63867 3.18945C10.0781 3.36523 10.5176 3.62891 10.9277 3.92188L12.5391 3.42383C12.8027 3.33594 13.0957 3.39453 13.2715 3.59961C13.5059 3.89258 13.7109 4.21484 13.916 4.53711L14.0625 4.77148C14.2383 5.09375 14.3848 5.41602 14.502 5.76758ZM7.5 10.7188C8.78906 10.7188 9.84375 9.69336 9.84375 8.375C9.84375 7.08594 8.78906 6.03125 7.5 6.03125C6.18164 6.03125 5.15625 7.08594 5.15625 8.375C5.15625 9.69336 6.18164 10.7188 7.5 10.7188Z" fill="#00A3FF" />
                                    </svg>
                                  </Box>
                              </CostomizedTooltip>
                                
                                }
                                {item === "Laundromat Owner" &&
                                   <CostomizedTooltip title="Laundromat Owner">
                                  <Box>
                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4.6875 11.1875H10.3125V5.5625H4.6875V11.1875ZM13.125 6.03125H14.5312C14.7656 6.03125 15 5.82617 15 5.5625C15 5.32812 14.7656 5.09375 14.5312 5.09375H13.125V4.625C13.125 3.59961 12.2754 2.75 11.25 2.75H10.7812V1.34375C10.7812 1.10938 10.5469 0.875 10.3125 0.875C10.0488 0.875 9.84375 1.10938 9.84375 1.34375V2.75H7.96875V1.34375C7.96875 1.10938 7.73438 0.875 7.5 0.875C7.23633 0.875 7.03125 1.10938 7.03125 1.34375V2.75H5.15625V1.34375C5.15625 1.10938 4.92188 0.875 4.6875 0.875C4.42383 0.875 4.21875 1.10938 4.21875 1.34375V2.75H3.75C2.69531 2.75 1.875 3.59961 1.875 4.625V5.09375H0.46875C0.205078 5.09375 0 5.32812 0 5.5625C0 5.82617 0.205078 6.03125 0.46875 6.03125H1.875V7.90625H0.46875C0.205078 7.90625 0 8.14062 0 8.375C0 8.63867 0.205078 8.84375 0.46875 8.84375H1.875V10.7188H0.46875C0.205078 10.7188 0 10.9531 0 11.1875C0 11.4512 0.205078 11.6562 0.46875 11.6562H1.875V12.125C1.875 13.1797 2.69531 14 3.75 14H4.21875V15.4062C4.21875 15.6699 4.42383 15.875 4.6875 15.875C4.92188 15.875 5.15625 15.6699 5.15625 15.4062V14H7.03125V15.4062C7.03125 15.6699 7.23633 15.875 7.5 15.875C7.73438 15.875 7.96875 15.6699 7.96875 15.4062V14H9.84375V15.4062C9.84375 15.6699 10.0488 15.875 10.3125 15.875C10.5469 15.875 10.7812 15.6699 10.7812 15.4062V14H11.25C12.2754 14 13.125 13.1797 13.125 12.125V11.6562H14.5312C14.7656 11.6562 15 11.4512 15 11.1875C15 10.9531 14.7656 10.7188 14.5312 10.7188H13.125V8.84375H14.5312C14.7656 8.84375 15 8.63867 15 8.375C15 8.14062 14.7656 7.90625 14.5312 7.90625H13.125V6.03125ZM11.25 11.6562C11.25 11.9199 11.0156 12.125 10.7812 12.125H4.21875C3.95508 12.125 3.75 11.9199 3.75 11.6562V5.09375C3.75 4.85938 3.95508 4.625 4.21875 4.625H10.7812C11.0156 4.625 11.25 4.85938 11.25 5.09375V11.6562Z" fill="#DB00FF" />
                                    </svg>
                                  </Box>
                                  </CostomizedTooltip>
                                }
                                {item === "Developer" &&
                                 <CostomizedTooltip title="Developer">
                                  <Box>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M15.502 7.4375C15.3848 7.4375 15.2676 7.4375 15.1504 7.4375C14.3887 7.4375 13.7148 7.11523 13.2461 6.58789C12.7773 7.11523 12.1035 7.4375 11.3418 7.4375C10.5801 7.4375 9.87695 7.11523 9.4082 6.58789C8.96875 7.11523 8.26562 7.4375 7.50391 7.4375C6.74219 7.4375 6.06836 7.11523 5.59961 6.58789C5.13086 7.11523 4.45703 7.4375 3.69531 7.4375C3.57812 7.4375 3.46094 7.4375 3.34375 7.4375C1.70312 7.20312 0.941406 5.29883 1.82031 3.92188L3.49023 1.28516C3.63672 1.02148 3.90039 0.875 4.19336 0.875H14.6523C14.9453 0.875 15.209 1.02148 15.3555 1.28516L17.0254 3.92188C17.9043 5.29883 17.1426 7.20312 15.502 7.4375ZM15.6191 8.3457C15.7363 8.3457 15.8828 8.31641 16 8.28711V14C16 15.0547 15.1504 15.875 14.125 15.875H4.75C3.69531 15.875 2.875 15.0547 2.875 14V8.28711C2.96289 8.31641 3.08008 8.3457 3.19727 8.3457H3.22656C3.37305 8.375 3.51953 8.375 3.69531 8.375C4.04688 8.375 4.39844 8.3457 4.75 8.22852V12.125H14.125V8.22852C14.4473 8.3457 14.7988 8.375 15.1504 8.375C15.3262 8.375 15.4727 8.375 15.6191 8.3457Z" fill="#FF5C00" />
                                    </svg>
                                  </Box>
                                  </CostomizedTooltip>
                                }
                              </>
                            )
                          })
                          }
                        </Box>
                      </TableCell>
                      <TableCell align="center">{row.LastLoggedIn}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
