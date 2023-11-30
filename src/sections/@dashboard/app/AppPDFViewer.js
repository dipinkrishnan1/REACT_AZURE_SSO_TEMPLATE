import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import secureAPIGetFile from "src/api/secureAPI/secureAPIGetFile";
import CircularProgress from "@mui/material/CircularProgress";
import useResponsive from "src/hooks/useResponsive";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const AppPDFViewer = ({ endpoint, user }) => {
  const [pdfData, setPdfData] = useState(null);
  const [error, setError] = useState("");
  const [pageLoadStatus, setPageLoadStatus] = useState(Array(10).fill(true)); // Initialize load status for 10 pages
  const isDesktop = useResponsive("up", "lg");
  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await secureAPIGetFile(endpoint, user);

        if (!response.successFlag) {
          setError(response.message);
        } else {
          const url = URL.createObjectURL(response.file);
          setPdfData(url);
        }
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPDF();
  }, [endpoint, user]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {!pdfData && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}

      <Typography fontWeight="bold" color="white">
        {error}
      </Typography>
      {pdfData && (
        <Document file={pdfData}>
          {pageLoadStatus.map(
            (loadStatus, index) =>
              loadStatus && (
                <Box pb={"20px"}>
                  <Page
                    width={isDesktop ? "900" : "400"}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    onLoadError={(error) => {
                      console.error(`Error loading page ${index + 1}:`, error);
                      setPageLoadStatus((prevStatus) => {
                        const newStatus = [...prevStatus];
                        newStatus[index] = false;
                        return newStatus;
                      });
                    }}
                  />
                </Box>
              )
          )}
        </Document>
      )}
    </Box>
  );
};

export default AppPDFViewer;
