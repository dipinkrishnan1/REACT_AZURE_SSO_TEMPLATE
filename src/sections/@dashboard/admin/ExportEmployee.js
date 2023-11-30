import {Typography, Box, Button, CardHeader, Paper} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import secureAPIDownload from "src/api/secureAPI/secureAPIDownload";
import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";
// import { CardLaunch } from "src/animated";
import { useTheme } from "@mui/material";
import { useLoaderContext } from "src/context/LoaderContext";

export default function ExportEmployee() {
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const { showLoader, hideLoader, isLoading } = useLoaderContext();
  const download = async () => {
    showLoader();
    const response = await secureAPIDownload(
      process.env.REACT_APP_EXPORT,
      "L&D_Export_All_Employees.xlsx"
    );
    hideLoader();
    showSnackbar(response);
  };
  return (
    <>
      <>
        <Paper sx={{ padding: "1rem", paddingTop: "0px",zIndex:5 ,boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',borderRadius: '12px'}}>
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
              title={`Export Data`}
              subheader={""}
            />

            <Typography
              marginLeft={"0.5rem"}
              marginBottom={"1rem"}
              fontWeight={"600"}
            >
              Dowload all employee details, including skills, training, and
              certifications.
            </Typography>

            <Box
              disabled={isLoading}
              component={Button}
              onClick={download}
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.5rem",
                pb: "0.5rem",
                border: "3px dotted #00000024",
                borderRadius: "8px",
                  zIndex:5
              }}
            >
              <Typography fontSize={"15px"}>Download</Typography>

              <CloudDownloadIcon sx={{ fontSize: "3.4rem" }} />
            </Box>
          </Box>
        </Paper>
      </>
    </>
  );
}