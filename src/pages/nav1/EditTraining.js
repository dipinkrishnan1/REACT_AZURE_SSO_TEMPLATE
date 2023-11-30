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
import { MoveToRight } from "src/animated";
import { AppEdit } from "src/sections/@dashboard/app";
import getEmployee from "src/api/getEmployeeDetails";
import { TRAINING } from "src/constants/NewElement";
import addTraining from "src/api/addTraining";
import deleteTraining from "src/api/deleteTraining";
import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";
import { useLoaderContext } from "src/context/LoaderContext";
// ----------------------------------------------------------------------
function scrollToBottom() {
  const element = document.getElementById("HRMSbottomElement"); // You can also use document.body
  element.scrollIntoView({
    behavior: "smooth",
  });
}

export default function EditTraining() {
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
      //  console.log(data);
      setEditList([...data.trainingMatrix]);
      // setLoading(false);
      hideLoader();
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
    fetchSkillData();
  };

  const onAdd = async (data) => {
    showLoader();
    const response = await addTraining(data, account.email);
    showSnackbar(response);
    if (response.successFlag) {
      fetchSkillData();
    }
    hideLoader();
  };
  const onDelete = async (id) => {
    showLoader();
    const response = await deleteTraining(id, account.email);
    showSnackbar(response);
    if (response.successFlag) {
      fetchSkillData();
    }
    hideLoader();
  };
  const handleNew = async () => {
    let newElementValue = TRAINING;

    try {
      newElementValue.list[0].value = null;
    } catch (error) {}

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
        <title>OneClick | Edit Training</title>
      </Helmet>

      <Container sx={{ minHeight: "calc(100vh - 185px)" }} maxWidth="99%">
        {/* <Box sx={{ textAlign: 'left' }}> */}
        {/* <Button
            onClick={() =>
              navigate("/dashboard/profile?target=mit-web-training")
            }
            size="large"
            color="primary"
            startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
          >
            Back
          </Button> */}
        {/* </Box> */}

        {/* <Button size="large" variant="text" onClick={() => navigate('/dashboard/profile')}>{`<<Back`}</Button> */}
        <MoveToRight>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Edit Training
          </Typography>
        </MoveToRight>

        <Grid container spacing={3}>
          {editList?.map((edit, index) => (
            <Grid key={index} item xs={12} md={12} lg={6}>
              <AppEdit
                key={index}
                itemID={edit.trainingNameId}
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
