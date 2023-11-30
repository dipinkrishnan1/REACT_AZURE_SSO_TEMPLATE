import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Modal,
  Snackbar,
  Alert,
  Card,
  CardHeader,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { CardLaunch, MoveToTopDelayed } from "src/animated";
// import LaunchIcon from "@mui/icons-material/Launch";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";

import AppPDFViewer from "./AppPDFViewer";

import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";
import secureAPIDownload from "src/api/secureAPI/secureAPIDownload";
import secureAPI from "src/api/secureAPI/secureAPI";
import { useLoaderContext } from "src/context/LoaderContext";
// import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import useResponsive from "src/hooks/useResponsive";

export default function AppFileUploader({
  email,
  isResumeUploaded = false,
  refresh,
  viewOnly = false,
}) {
  const [state, setState] = useState({
    files: [],
    rejected: [],
    openPopup: false,
    isTxnCompleted: false,
    successFlag: false,
    errorAlert: false,
    errorMessage: "",
    rejectReasonList: [],
    modalOpen: false,
  });

  const [confOpen, setconfOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { showLoader, hideLoader, isLoading } = useLoaderContext();
  const { files, rejected, errorAlert, modalOpen } = state;
  const isDesktop = useResponsive("up", "lg");
  const download = async () => {
    showLoader();
    const response = await secureAPIDownload(
      process.env.REACT_APP_GET_RESUME + email,
      `${email}_resume_export.pdf`
    );
    hideLoader();
    showSnackbar(response);
  };

  const deleteResume = async () => {
    showLoader();
    const response = await secureAPI(
      "DELETE",
      process.env.REACT_APP_DELETE_RESUME + email
    );
    hideLoader();
    showSnackbar(response);
    refresh();
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length > 1 || rejectedFiles?.length > 1) {
      setState({ ...state, errorAlert: true });
      return;
    }

    setState({
      ...state,
      files: acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
      rejected: rejectedFiles,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    maxFiles: 1,
    maxSize: 1024 * 2000,
    onDrop,
  });

  const theme = useTheme();

  const handleViewClick = () => {
    setState({ ...state, modalOpen: true });
  };

  const handleCloseModal = () => {
    setState({ ...state, modalOpen: false });
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeItem = (name, isFile) => {
    if (isFile) {
      setState({ ...state, files: files.filter((file) => file.name !== name) });
    } else {
      setState({
        ...state,
        rejected: rejected.filter(({ file }) => file.name !== name),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setState({
      ...state,
      openPopup: true,
      isTxnCompleted: false,
      successFlag: false,
    });

    const formData = new FormData();
    formData.append("fileName", files[0]);
    const URL = process.env.REACT_APP_ADD_RESUME + email; // protectedResources.apiCreateList.getImportRequest();
    try {
      showLoader();
      const response = await secureAPI("POST", URL, formData);
      hideLoader();
      showSnackbar(response);
      refresh();
      setState({ ...state, files: [] });
    } catch (error) {}
  };

  // const onPopupClose = () => {
  //   setState({ ...state, openPopup: false });
  // };

  return (
    <>
      <CardLaunch>
        <Card sx={{ padding: "1rem", paddingTop: "0px" }}>
          <Box>
            <CardHeader
              sx={{ color: theme.palette.primary.main, paddingLeft: "0.6rem " }}
              title={`Resume`}
              subheader={""}
            />

            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Box
                component={Button}
                onClick={handleViewClick}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Tooltip title="Open Resume">
                  <LaunchIcon sx={{ fontSize: "1.7rem" }} />
                </Tooltip>
              </Box>

              <Box
                component={Button}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: "2px",
                  color: theme.palette.success.main,
                }}
                onClick={download}
              >
                <Tooltip title="Download Resume">
                  <DownloadIcon sx={{ fontSize: "1.8rem" }} />
                </Tooltip>
              </Box>

              {!viewOnly && (
                <Box
                  component={Button}
                  onClick={() => setconfOpen(true)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: theme.palette.error.main,
                  }}
                >
                  <Tooltip title="Delete Resume">
                    <DeleteIcon sx={{ fontSize: "1.6rem" }} />
                  </Tooltip>
                </Box>
              )}
            </Box> */}
          </Box>
          {isResumeUploaded ? (
            <MoveToTopDelayed>
              <Box
                sx={{
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0px 0px 4px #6f6f6f30",
                  padding: "1rem",
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box display={"flex"}>
                  <InsertDriveFileOutlinedIcon color={`info`} />
                  <Typography marginLeft={"0.5rem"}>Resume.pdf</Typography>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Box
                    component={Button}
                    onClick={handleViewClick}
                    color={theme.palette.info.light}
                  >
                    <OpenInNewIcon />
                  </Box>
                  <Box
                    component={Button}
                    onClick={download}
                    sx={{ paddingTop: "7px", scale: "1.1" }}
                    color={theme.palette.info.light}
                  >
                    <DownloadIcon />
                  </Box>

                  {!viewOnly && (
                    <Box
                      component={Button}
                      onClick={() => setconfOpen(true)}
                      color={theme.palette.error.light}
                    >
                      <DeleteIcon />
                    </Box>
                  )}
                </Box>
              </Box>
            </MoveToTopDelayed>
          ) : (
            <Typography
              margin={"1rem"}
              ml={"0.6rem"}
              color={theme.palette.error.light}
            >
              No Resume Found!
            </Typography>
          )}
          {!viewOnly && (
            <form onSubmit={handleSubmit}>
              <div
                {...getRootProps({
                  className: "draganddrop",
                })}
              >
                <input {...getInputProps()} />
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    justifyContent: "center",
                    borderRadius: " 11px",
                    border: "2px dotted #0054ff52",
                    marginTop: "2rem",
                  }}
                >
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "2rem",
                      }}
                      className="draganddropContent"
                    >
                      <Box className="uploadIcon">
                        <UploadFileIcon />
                      </Box>
                      <Box display="flex">
                        <Typography
                          sx={{ color: "#3894e6", textDecoration: "underline" }}
                        >
                          Click to upload
                        </Typography>
                        <Typography sx={{ marginLeft: "3px" }}>
                          or drag and drop
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </div>
              <Box sx={{ margin: "0.2rem" }}>
                <Typography fontSize="0.9rem">Supported format: pdf</Typography>
                <Typography fontSize="0.9rem">Max size: 2 MB </Typography>
              </Box>

              {/* Preview */}
              <MoveToTopDelayed>
                <section className="fileListContainer">
                  <ul style={{ listStyleType: "none" }} className="">
                    {files.map((file) => (
                      <li key={file.name} className="fileList">
                        <FileListItem file={file} removeItem={removeItem} />
                      </li>
                    ))}
                    {rejected.map(({ file, errors }) => (
                      <li key={file.name} className="fileList">
                        <RejectedListItem
                          file={file}
                          errors={errors}
                          removeItem={removeItem}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              </MoveToTopDelayed>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  mt: "1rem",
                }}
              >
                <Button
                  startIcon={<UploadIcon />}
                  disabled={!files.length || isLoading}
                  type="submit"
                  variant="contained"
                  size="medium"
                >
                  Upload
                </Button>
              </Box>
            </form>
          )}

          <Snackbar
            open={errorAlert}
            onClose={() => setState({ ...state, errorAlert: false })}
            autoHideDuration={500000}
          >
            <Alert
              onClose={() => setState({ ...state, errorAlert: false })}
              variant="filled"
              severity="error"
              sx={{ width: "100%" }}
            >
              Multiple file selection is not allowed.
            </Alert>
          </Snackbar>
        </Card>
      </CardLaunch>

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
              justifyContent: "end",
              ml: "8%",
              mr: "1%",
            }}
          >
            <DownloadIcon
              sx={{
                cursor: "pointer",
                border: "3px solid",
                borderRadius: "27px",
                mr: "1rem",
              }}
              color="info"
              fontSize="large"
              onClick={download}
            />
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
              marginTop: "1rem",
              height: "99%",
              width: "99%",
              overflowX: "scroll",
            }}
          >
            <AppPDFViewer
              endpoint={process.env.REACT_APP_GET_RESUME}
              user={email}
            />
          </Box>
        </>
      </Modal>

      <Modal
        open={confOpen}
        onClose={() => {
          setconfOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${isDesktop ? "40%" : "95%"}`,
            min: "300",
            bgcolor: "background.paper",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
            pb: 2,
            pr: 3,
            "&:focus-visible": {
              outline: "none", // Remove the outline on focus
            },
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            paddingBottom={2}
          >
            Are you sure you want to delete ?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setconfOpen(false)}>CANCEL</Button>
            <Button
              size="large"
              color="error"
              onClick={() => {
                deleteResume();
                setconfOpen(false);
              }}
            >
              YES
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

const FileListItem = ({ file, removeItem }) => (
  <List
    sx={{
      bgcolor: "background.paper",
      marginLeft: "1rem",
      marginTop: "0.8rem",
      marginBottom: "0.5rem",
      width: "80%",
      border: "1px solid #fff7f7",
      padding: "0.5rem",
      borderRadius: "16px",
      boxShadow: "1px 1px 4px  #dedede",
    }}
  >
    <ListItem
      sx={{
        paddingLeft: "0px",
        paddingRight: "0px",
        overflowWrap: "break-word",
        color: "#1976d2",
      }}
    >
      <ListItemAvatar>
        <Box className="uploadIcon">
          <UploadFileIcon />
        </Box>
      </ListItemAvatar>
      <ListItemText
        primary={file.name}
        primaryTypographyProps={{ fontWeight: "500" }}
        secondaryTypographyProps={{ color: "black" }}
      />
      <CloseIcon
        sx={{ cursor: "pointer" }}
        onClick={() => removeItem(file.name, true)}
      />
    </ListItem>
    <Box
      sx={{
        width: "100%",
        paddingLeft: "56px",
        paddingRight: "20px",
      }}
    >
      {/* <LinearProgressAnimated /> */}
    </Box>
  </List>
);

const RejectedListItem = ({ file, errors, removeItem }) => (
  <List
    sx={{
      bgcolor: "background.paper",
      marginLeft: "1rem",
      marginTop: "0.8rem",
      marginBottom: "0.5rem",
      width: "80%",
      border: "1px solid #fff7f7",
      padding: "0.5rem",
      borderRadius: "16px",
      boxShadow: "1px 1px 4px  #dedede",
    }}
  >
    <ListItem
      sx={{
        paddingLeft: "0px",
        paddingRight: "0px",
        overflowWrap: "break-word",
        color: "red",
      }}
    >
      <ListItemAvatar>
        <Box className="uploadIcon">
          <UploadFileIcon />
        </Box>
      </ListItemAvatar>
      <ListItemText
        primary={`${file.name} (Failed)`}
        primaryTypographyProps={{ fontWeight: "500" }}
        secondaryTypographyProps={{ color: "black" }}
        secondary={
          <Typography component="div">
            {errors.map((error) => (
              <div key={error.code}>
                <span>
                  {error.message.replace(
                    "File is larger than 2048000 bytes",
                    "File size is larger than 2MB."
                  )}
                </span>
              </div>
            ))}
          </Typography>
        }
      />

      <CloseIcon
        sx={{ cursor: "pointer" }}
        onClick={() => removeItem(file.name, false)}
      />
    </ListItem>

    <Box
      sx={{
        width: "100%",
        paddingLeft: "56px",
        paddingRight: "20px",
      }}
    >
      {/* <LinearProgress sx={{ color: '#8b8585' }} color="error" variant="determinate" value={100} /> */}
    </Box>
  </List>
);
