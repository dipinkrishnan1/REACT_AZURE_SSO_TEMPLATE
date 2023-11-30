import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardHeader,
  Button,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import UserView from "src/pages/UserView";
import SearchBar from "src/components/searchbar/SearchBar";
import searchEmployees from "src/api/searchEmployees";
import searchSkills from "src/api/searchSkills";
import searchCertifications from "src/api/searchCertifications";
import { CardLaunch, Opacity } from "src/animated";
import { useLoaderContext } from "src/context/LoaderContext";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import secureAPIDownload from "src/api/secureAPI/secureAPIDownload";
import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";
import CircularProgress from "@mui/material/CircularProgress";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function SearchEmployee() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [txnState, settxnState] = useState(null);
  const { showLoader, hideLoader, isLoading } = useLoaderContext();
  const { showSnackbar } = useSnackbar();
  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };
  const theme = useTheme();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };
  const exportData = async () => {
    showLoader();

    const idList = rows?.map((row) => row.employeeID).join(",");
    const response = await secureAPIDownload(
      process.env.REACT_APP_EXPORT_BY_RESULT + idList,
      "L&D_Export.xlsx"
    );

    showSnackbar(response);
    hideLoader();
  };
  const onSearch = async (obj) => {
    showLoader();
    setRows([]);
    settxnState("WAIT");
    let response = null;
    let dataTemp = [];
    if (obj.type === 1) {
      response = await searchSkills(obj?.query);
    } else if (obj.type === 2) {
      response = await searchEmployees(obj?.query);
    } else if (obj.type === 3) {
      response = await searchCertifications(obj?.query);
    }

    const employees = response?.data?.employees;
    if (employees) {
      dataTemp = employees.map((employee, index) => {
        return {
          id: `${index}`,
          employeeID: `${employee.employeeId}`,
          name: employee.employeeName,
          skills: `Skills : ${employee.skillMatrix?.length}`,
          certification: `Certifications : ${employee.certification?.length}`,
          training: `Trainings : ${employee.training?.length}`,
        };
      });
    }

    settxnState(
      dataTemp.length > 0
        ? `${dataTemp.length} Record(s) found.`
        : "No Record Found"
    );
    setRows(dataTemp);
    hideLoader();
  };

  return (
    <>
      <CardLaunch>
      <Card sx={{ padding: "1rem", paddingTop: "0px", overflow: "visible" }}>
          <Box
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-between"}
            marginBottom={"1rem"}
            flexDirection={"column"}
          >
            <CardHeader
              sx={{
                color: theme.palette.primary.main,
                marginBottom: "1rem",
                marginLeft: "-1rem",
              }}
              title={`Search`}
              subheader={""}
            />

            <SearchBar onSearch={onSearch} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pr: "0.5rem",
                pt: "1rem",
              }}
            >
              {txnState === "WAIT" ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    ml: "0.5rem",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Opacity>
                  <Typography
                    sx={{ ml: "1rem", mt: "1rem", mb: "1.2rem" }}
                    color={rows.length > 0 ? `green` : "red"}
                  >
                    {txnState}
                  </Typography>
                </Opacity>
              )}
              {rows?.length > 0 && (
                <Button
                  disabled={isLoading}
                  onClick={exportData}
                  variant="outlined"
                  startIcon={<FileDownloadIcon />}
                >
                  Export
                </Button>
              )}
            </Box>

            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell
                        sx={{ borderBottomColor: "#0000000f" }}
                        component="th"
                        scope="row"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        style={{ width: 160, borderBottomColor: "#0000000f" }}
                        align="right"
                      >
                        {row.skills}
                      </TableCell>
                      <TableCell
                        style={{ width: 160, borderBottomColor: "#0000000f" }}
                        align="right"
                      >
                        {row.certification}
                      </TableCell>
                      <TableCell
                        style={{ width: 160, borderBottomColor: "#0000000f" }}
                        align="right"
                      >
                        {row.training}
                      </TableCell>
                      <TableCell
                        style={{ width: 160, borderBottomColor: "#0000000f" }}
                        align="right"
                      >
                        <IconButton
                          color="primary"
                          onClick={() => handleViewClick(row)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {rows?.length > 0 && (
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        style={{ borderBottomColor: "transparent" }}
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={6}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </TableContainer>

            <Modal
              open={modalOpen}
              onClose={handleCloseModal}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              BackdropProps={{
                sx: {
                  backdropFilter: "blur(4px)", // Adjust the blur amount as needed
                  backgroundColor: "rgb(0 0 0 / 71%)", // Adjust the background color and opacity as needed
                },
              }}
            >
              <>
                <Box
                  sx={{
                    display: "flex",
                    paddingTop: "2rem",
                    justifyContent: "space-between",
                    ml: "9%",
                    mr: "9%",
                  }}
                >
                  <Typography
                    color="Menu"
                    variant="h6"
                    sx={{ maxWidth: "80%", overflowWrap: "break-word" }}
                  >
                    {selectedItem?.name}
                  </Typography>
                  <CloseIcon
                    sx={{
                      cursor: "pointer",
                      border: "3px solid",
                      borderRadius: "27px",
                    }}
                    color="error"
                    fontSize="large"
                    onClick={handleCloseModal}
                  />
                </Box>

                <Box
                  sx={{
                    ml: "6%",
                    mr: "6%",
                    mt: "2%",
                    pb: "5rem",
                    height: "96%",
                    overflow: "scroll",
                    scrollBehavior: "smooth",
                  }}
                >
                  <UserView email={selectedItem?.name} />
                  {selectedItem && (
                    <div>
                      {/* <h2 id="modal-title">Item Details</h2>
               <p id="modal-description">Name: {selectedItem.name}</p> */}
                      {/* Add more details here */}
                    </div>
                  )}
                </Box>
              </>
            </Modal>
          </Box>
        </Card>
      </CardLaunch>
    </>
  );
}
