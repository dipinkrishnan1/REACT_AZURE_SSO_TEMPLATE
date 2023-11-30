import { useMsal } from "@azure/msal-react";
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
// components//
//
import AddIcon from "@mui/icons-material/Add";
//
import { useEffect, useState } from "react";

// sections
// import Iconify from "src/components/iconify";

// animated
import { MoveToRightSlow } from "src/animated";
import { AppEdit } from "src/sections/@dashboard/app";
import getEmployee from "src/api/getEmployeeDetails";

import { PRIMARY_SKILLS } from "src/constants/NewElement";

import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";

import updatePrimarySkills from "src/api/updatePrimarySkills";
import deletePrimarySkills from "src/api/deletePrimarySkills";
import addPrimarySkills from "src/api/addPrimarySkills";
import { useLoaderContext } from "src/context/LoaderContext";
// ----------------------------------------------------------------------

function scrollToBottom() {
  const element = document.getElementById("HRMSbottomElement"); // You can also use document.body
  element.scrollIntoView({
    behavior: "smooth",
  });
}

export default function EditPrimarySkills() {
  const [editList, setEditList] = useState();
  const { showLoader, hideLoader } = useLoaderContext();
  const { accounts } = useMsal();
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
      // console.log(data.skillMatrix);

      setEditList([...data.skillMatrix]);
      hideLoader();
      // setLoading(false);
    } catch (error) {
      // setError(error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdate = async (data) => {
    showLoader();
    const response = await updatePrimarySkills(data, account.email);
    showSnackbar(response);
    if (response.successFlag) {
      fetchSkillData();
    }
    hideLoader();
  };

  const onDelete = async (id) => {
    showLoader();
    const response = await deletePrimarySkills(id, account.email);
    showSnackbar(response);
    if (response.successFlag) {
      fetchSkillData();
    }
    hideLoader();
  };

  const onAdd = async (data) => {
    showLoader();
    const response = await addPrimarySkills(data, account.email);
    showSnackbar(response);
    if (response.successFlag) fetchSkillData();
    hideLoader();
  };

  const handleNew = async () => {
    let newElementValue = PRIMARY_SKILLS;
    let isFirst = true;
    if (editList && editList.length > 0) {
      isFirst = false;
    }
    try {
      newElementValue.list[0].value = null;
      newElementValue.list[1].value = "";
      newElementValue.list[2].value = null;
    } catch (error) {}

    setEditList([...editList, newElementValue]);

    setTimeout(() => {
      if (!isFirst) scrollToBottom();
    }, 100);
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Helmet>
        <title>OneClick | Edit Primary Skills</title>
      </Helmet>

      <Container sx={{ minHeight: "calc(100vh - 185px)" }} maxWidth="99%">
        {/* <Box sx={{ textAlign: 'left' }}> */}
        {/* <Button
            onClick={() =>
              navigate("/dashboard/profile?target=mit-web-primaryskills  ")
            }
            size="large"
            color="primary"
            startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
          >
            Back
          </Button> */}
        {/* </Box> */}

        {/* <Button size="large" variant="text" onClick={() => navigate('/dashboard/profile')}>{`<<Back`}</Button> */}

        <MoveToRightSlow>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Edit Primary Skills
          </Typography>
        </MoveToRightSlow>

        <Grid container spacing={0}>
          {editList?.map((edit, index) => (
            <Grid key={index} item xs={12} md={12} lg={12}>
              <AppEdit
                key={index}
                itemID={edit.skillId}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAdd={onAdd}
                newFlag={edit.newFlag}
                title={edit.title}
                items={edit.list}
                layout={6}
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
