import { useMsal } from "@azure/msal-react";
import { Helmet } from "react-helmet-async";

import { Grid, Container, Typography, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
// components//
//
import { useEffect, useState } from "react";

// sections
// import Iconify from "src/components/iconify";

// animated
import { MoveToRight } from "src/animated";
import { AppEdit } from "src/sections/@dashboard/app";
import { TRAINING } from "src/constants/NewElement";
import addTraining from "src/api/addTraining";
import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";
import { useLoaderContext } from "src/context/LoaderContext";

// ----------------------------------------------------------------------

const newElement = TRAINING;

export default function AddTraining() {
  const [editList, setEditList] = useState([]);
  const { showLoader, hideLoader } = useLoaderContext();
  const { accounts } = useMsal();
  const user = accounts[0];
  const account = {
    displayName: user?.name,
    email: user?.username,
  };
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    handleNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAdd = async (data) => {
    showLoader();
    const response = await addTraining(data, account.email);
    hideLoader();
    showSnackbar(response);
    if (response.successFlag) navigate(-1);
    // navigate("/dashboard/profile?target=mit-web-training");
    //  fetchSkillData();
  };
  const handleNew = async () => {
    let newElementValue = newElement;
    try {
      newElementValue.list[0].value = null;
    } catch (error) {}
    setEditList([...editList, newElementValue]);
  };
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Helmet>
        <title>OneClick | Add Training</title>
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
            Add Training
          </Typography>
        </MoveToRight>

        <Grid container spacing={3}>
          {editList?.map((edit, index) => (
            <Grid key={index} item xs={12} md={12} lg={12}>
              <AppEdit
                key={index}
                onAdd={onAdd}
                newFlag={edit.newFlag}
                title={edit.title}
                items={edit.list}
                layout={10}
              />
              <Divider sx={{ height: "50px", border: "none" }} />
            </Grid>
          ))}
        </Grid>
        {/*  <Box sx={{ display: 'flex', flexDirection: 'row-reverse', margin: '1rem', marginRight: '0.2rem' }}>
            <Button onClick={handleNew} startIcon={<AddIcon />} textAlign="right" variant="contained">
              ADD NEW SKILL
            </Button>
          </Box> */}
      </Container>
    </Box>
  );
}
