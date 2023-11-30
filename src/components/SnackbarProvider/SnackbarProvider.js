// SnackbarContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

import { Snackbar, Alert, LinearProgress } from "@mui/material";

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export default function SnackbarProvider({ children }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [progress, setProgress] = useState(100);

  const showSnackbar = (response) => {
    setSnackbarMessage(response?.message);
    setSnackbarOpen(true);
    setAlertType(response?.successFlag === true ? "success" : "error");
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
    setProgress(100);
  };

  useEffect(() => {
    let timer;

    if (snackbarOpen) {
      timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress <= 0 ? 0 : prevProgress - 4
        );
      }, 100);
    }

    return () => {
      clearInterval(timer);
    };
  }, [snackbarOpen]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      {snackbarOpen && (
        // Use MUI Snackbar component here
        // You can customize the appearance and behavior of the Snackbar

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000} // Adjust the duration as needed
          onClose={hideSnackbar}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <Alert
            sx={{ paddingBottom: "0px" }}
            onClose={hideSnackbar}
            variant="filled"
            severity={alertType}
          >
            {snackbarMessage}
            <LinearProgress
              sx={{ marginTop: "10px" }}
              variant="determinate"
              color={alertType}
              value={progress}
            />
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
}
