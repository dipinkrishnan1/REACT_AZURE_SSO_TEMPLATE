import { useMsal } from "@azure/msal-react";
import { Helmet } from "react-helmet-async";
import { Grid, Container, Typography, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import Iconify from "src/components/iconify";
import { MoveToRight } from "src/animated";
import { AppEdit } from "src/sections/@dashboard/app";
import { CERTIFICATION } from "src/constants/NewElement";
import addCertification from "src/api/addCertification";
import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";
import { useLoaderContext } from "src/context/LoaderContext";
import { useEffect, useState } from "react";

export default function AddCertification() {
  const { accounts } = useMsal();
  const { showLoader, hideLoader } = useLoaderContext();

  const [newElement, setNewElement] = useState();

  const user = accounts[0];
  const account = {
    displayName: user?.name,
    email: user?.username,
  };
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const onUpdate = async (data) => {
    //  console.log(data);
  };

  const handleNew = async () => {
    let newElementValue = CERTIFICATION;
    try {
      newElementValue.list[0].value = null;
    } catch (error) {}
    setNewElement(newElementValue);
  };

  useEffect(() => {
    handleNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAdd = async (data) => {
    showLoader();
    const response = await addCertification(data, account.email);
    hideLoader();
    // if (response.successFlag === "false") {
    //   navigate("/error");
    // }
    showSnackbar(response);
    if (response.successFlag) {
      navigate(-1);
      //navigate("/dashboard/profile?target=mit-web-certification");
    }
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Helmet>
        <title>OneClick | Add Certification</title>
      </Helmet>

      <Container sx={{ minHeight: "calc(100vh - 185px)" }} maxWidth="99%">
        {/* <Button
            onClick={() =>
              navigate("/dashboard/profile?target=mit-web-certification")
            }
            size="large"
            color="primary"
            startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
          >
            Back
          </Button> */}
        <MoveToRight>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Add Certification
          </Typography>
        </MoveToRight>

        <Grid container spacing={3}>
          {newElement && (
            <Grid item xs={12} md={12} lg={12}>
              <AppEdit
                onUpdate={onUpdate}
                onAdd={onAdd}
                newFlag={newElement.newFlag}
                title={newElement.title}
                items={newElement.list}
                layout={10}
              />
              <Divider sx={{ height: "50px", border: "none" }} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
