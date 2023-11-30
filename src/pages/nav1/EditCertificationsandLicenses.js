import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Container,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useMsal } from "@azure/msal-react";
import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";
// import Iconify from "src/components/iconify";
import { MoveToRight } from "src/animated";
import { AppEdit } from "src/sections/@dashboard/app";
import getEmployee from "src/api/getEmployeeDetails";
import { CERTIFICATION } from "src/constants/NewElement";
import addCertification from "src/api/addCertification";
import deleteCertification from "src/api/deleteCertification";
import { useLoaderContext } from "src/context/LoaderContext";

function scrollToBottom() {
  const element = document.getElementById("HRMSbottomElement"); // You can also use document.body
  element.scrollIntoView({
    behavior: "smooth",
  });
}

function EditCertifications() {
  const [editList, setEditList] = useState();
  const { accounts } = useMsal();
  const { showLoader, hideLoader } = useLoaderContext();
  const user = accounts[0];
  const account = {
    displayName: user?.name,
    email: user?.username,
  };
  // const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const fetchSkillData = async () => {
    try {
      showLoader();
      const data = await getEmployee("Edit", account.email);
      setEditList([...data.certificationMatrix]);
      hideLoader();
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchSkillData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdate = async (data) => {
    // Update logic goes here
    fetchSkillData();
  };

  const onAdd = async (data) => {
    showLoader();
    const response = await addCertification(data, account.email);
    showSnackbar(response);
    if (response.successFlag) {
      fetchSkillData();
    }
    hideLoader();
  };

  const onDelete = async (id) => {
    showLoader();
    const response = await deleteCertification(id, account.email);
    showSnackbar(response);
    fetchSkillData();
    hideLoader();
  };

  const handleNew = async () => {
    let newElementValue = CERTIFICATION;
    try {
      newElementValue.list[0].value = null;
    } catch (err) {}
    setEditList([...editList, newElementValue]);
    setTimeout(() => {
      if (editList?.length > 1) {
        scrollToBottom();
      }
    }, 100);
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Helmet>
        <title>OneClick | Edit Certifications</title>
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
            Edit Certifications
          </Typography>
        </MoveToRight>

        <Grid container spacing={3}>
          {editList?.map((edit, index) => (
            <Grid key={index} item xs={12} md={12} lg={6}>
              <AppEdit
                key={index}
                itemID={edit.certNameId}
                disableButtons
                onUpdate={onUpdate}
                onAdd={onAdd}
                onDelete={onDelete}
                newFlag={edit.newFlag}
                title={edit.title}
                items={edit.list}
                layout={12}
              />
              <Divider sx={{ height: "50px", border: "none" }} />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            margin: "1rem",
            marginRight: "0.2rem",
          }}
        >
          {editList && (
            <Button
              onClick={handleNew}
              startIcon={<AddIcon />}
              variant="contained"
            >
              ADD NEW
            </Button>
          )}
        </Box>
      </Container>

      <div id="HRMSbottomElement" />
    </Box>
  );
}

export default EditCertifications;
