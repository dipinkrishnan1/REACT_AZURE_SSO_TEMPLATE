import { useMsal } from "@azure/msal-react";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Container,
  Typography,
  Box,
  Card,
  CardHeader,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
//
import { useEffect, useState } from "react";

import { CardLaunch, MoveToRight } from "src/animated";

import getEmployee from "src/api/getEmployeeDetails";

import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";
import { useLoaderContext } from "src/context/LoaderContext";

import StyledTextAreaEdit from "src/theme/overrides/StyledTextAreaEdit";
import updateEmployee from "src/api/updateEmployee";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function UpdateEmployee() {
  const [about, setAbout] = useState();
  const [apiCallFlag, setApiCallFlag] = useState(false);
  const { showLoader, hideLoader } = useLoaderContext();
  const { accounts } = useMsal();
  const navigate = useNavigate();
  const theme = useTheme();
  const user = accounts[0];
  const account = {
    displayName: user?.name,
    email: user?.username,
  };
  // const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const updateEmployeeFn = async (aboutLocal) => {
    showLoader();
    const response = await updateEmployee(aboutLocal, account.email);
    showSnackbar(response);
    if (response.successFlag) navigate(-1);
    hideLoader();
  };

  const fetchSkillData = async () => {
    try {
      showLoader();
      const data = await getEmployee("View", account.email);
      setAbout(data.about);
      setApiCallFlag(true);
      // setLoading(false);
      hideLoader();
    } catch (error) {}
  };

  useEffect(() => {
    fetchSkillData();
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Helmet>
        <title>OneClick | Update Employee</title>
      </Helmet>

      <Container sx={{ minHeight: "calc(100vh - 185px)" }} maxWidth="99%">
        <MoveToRight>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Update Employee
          </Typography>
        </MoveToRight>

        <Grid container spacing={3}></Grid>
        {apiCallFlag && (
          <CardLaunch>
            <Card>
              <CardHeader
                sx={{ color: theme.palette.primary.main }}
                title="About"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  margin: "1rem",
                }}
              >
                <StyledTextAreaEdit
                  value={about}
                  onChange={(event) => {
                    setAbout(event.target.value);
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  margin: "1rem",
                }}
              >
                <Button
                  onClick={() => {
                    updateEmployeeFn(about);
                  }}
                >
                  SAVE
                </Button>
              </Box>
            </Card>
          </CardLaunch>
        )}
      </Container>
    </Box>
  );
}
