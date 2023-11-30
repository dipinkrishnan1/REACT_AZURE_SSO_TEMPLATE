import { useMsal } from "@azure/msal-react";
import { Helmet } from "react-helmet-async";
import { Grid, Container, Typography, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import Iconify from "src/components/iconify";
import { MoveToRight } from "src/animated";
import { AppEdit } from "src/sections/@dashboard/app";

import addPrimarySkills from "src/api/addPrimarySkills";
import { PRIMARY_SKILLS } from "src/constants/NewElement";
import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";
import { useLoaderContext } from "src/context/LoaderContext";

const newElement = PRIMARY_SKILLS;

export default function AddPrimarySkills() {
  const [editList, setEditList] = useState([]);
  const { accounts } = useMsal();
  const { showLoader, hideLoader } = useLoaderContext();
  const user = accounts[0];
  const account = {
    displayName: user?.name,
    email: user?.username,
  };
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  // const fetchSkillData = async () => {
  //   try {
  //     const data = await getSkills("Edit", account.email);
  //     setEditList([...data]);
  //   } catch (error) {
  //     // Handle errors here
  //   }
  // };

  useEffect(() => {
    // fetchSkillData();
    handleNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdate = async (data) => {
    showLoader();
    const response = await addPrimarySkills(data, account.email);
    showSnackbar(response);
    hideLoader();
    if (response.successFlag) navigate(-1);
    // navigate("/dashboard/profile?target=mit-web-primaryskills");
  };

  const handleNew = async () => {
    let newElementValue = newElement;
    try {
      newElementValue.list[0].value = null;
      newElementValue.list[1].value = "";
      newElementValue.list[2].value = null;
    } catch (error) {}
    setEditList([...editList, newElementValue]);
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Helmet>
        <title>OneClick | Add Primary Skills</title>
      </Helmet>

      <Container sx={{ minHeight: "calc(100vh - 185px)" }} maxWidth="99%">
        {/* <Button
            onClick={() =>
              navigate("/dashboard/profile?target=mit-web-primaryskills")
            }
            size="large"
            color="primary"
            startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
          >
            Back
          </Button> */}
        <MoveToRight>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Add Primary Skills
          </Typography>
        </MoveToRight>

        <Grid container spacing={3}>
          {editList?.map((edit, index) => (
            <Grid key={index} item xs={12} md={12} lg={12}>
              <AppEdit
                key={index}
                onUpdate={onUpdate}
                onAdd={onUpdate} // Updated this to onUpdate
                newFlag={edit.newFlag}
                title={edit.title}
                items={edit.list}
                layout={6}
              />
              <Divider sx={{ height: "50px", border: "none" }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
