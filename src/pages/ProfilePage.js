import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Container, Typography, Box, Skeleton } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { MoveToTop, SkeltonDelayed } from "src/animated";
import { AppSummary } from "src/sections/@dashboard/app";
// import { AppFileUploader } from "src/sections/@dashboard/app";
import { ROUTE } from "src/constants";
import getEmployee from "src/api/getEmployeeDetails";
import updateEmployee from "src/api/updateEmployee";
import { useSnackbar } from "src/components/SnackbarProvider/SnackbarProvider";
import ProfileProgressWithValueLabel from "src/components/profile-progress";
import { useLoaderContext } from "src/context/LoaderContext";
import { lazy, Suspense } from "react";

const AppFileUploader = lazy(() =>
  import("src/sections/@dashboard/app/AppFileUploader")
);

export default function DashboardAppPage() {
  const [employee, setEmployee] = useState();
  const [employeeProfile, setEmployeeProfile] = useState();
  const { accounts } = useMsal();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoaderContext();
  const user = accounts[0];
  const account = {
    displayName: user?.name,
    email: user?.username,
  };
  const { showSnackbar } = useSnackbar();

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const target = queryParams.get("target");

  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        showLoader();
        const data = await getEmployee("view", account.email);
        hideLoader();
        if (data.isFound === false && account.email) {
          navigate("/register");
        }

        setEmployee(data);

        const profile = JSON.parse(localStorage.getItem("hrms-profile"));

        if (profile?.successFlag) setEmployeeProfile(profile.data);
        // const targetElement = document.getElementById(target);

        // if (targetElement) {
        //    targetElement.scrollIntoView({ behavior: "smooth" });
        // }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        showSnackbar({ sucessFlag: false, message: error.message });
      }
    }

    fetchEmployeeData();

    setTimeout(() => {
      const profile = JSON.parse(localStorage.getItem("hrms-profile"));
      if (profile?.successFlag) setEmployeeProfile(profile.data);
    }, 700);
    // eslint-disable-next-line
  }, [account.email, navigate]);

  const updateEmployeeFn = async (data) => {
    showLoader();
    const response = await updateEmployee(data, account.email);
    showSnackbar(response);

    const employee = await getEmployee("view", account.email);
    setEmployee(employee);
    hideLoader();
  };
  const refresh = async () => {
    showLoader();
    const employee = await getEmployee("view", account.email);
    setEmployee(employee);
    hideLoader();
  };
  return (
    <>
      <Helmet>
        <title>OneClick | Profile</title>
      </Helmet>

      <Container maxWidth="99%">
        <MoveToTop>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mr: "0.2rem",
            }}
          >
            <Typography variant="h4" sx={{ mb: 3, maxWidth: "80%" }}>
              Welcome, {account.displayName} !
            </Typography>
            <ProfileProgressWithValueLabel
              display={employee ? "flex" : "none"}
              employee={employee}
            />
          </Box>
        </MoveToTop>

        {employee ? (
          <Grid container spacing={7}>
            <Grid item xs={12} md={12} lg={12}>
              {employeeProfile && employee && (
                <AppSummary
                  title="About"
                  description={employee?.about}
                  editnavigation={ROUTE.updateEmployee}
                  showDescription
                  onDescUpdate={updateEmployeeFn}
                  layout={6}
                  disableAction
                  list={employeeProfile}
                />
              )}
            </Grid>
            <Grid id="mit-web-primaryskills" item xs={12} md={12} lg={12}>
              {employee?.skillMatrix && (
                <AppSummary
                  title={`Primary Skills`}
                  subheader={` ${employee.skillMatrix.length} Record(s)`}
                  lastUpdated={employee.skillMatrixLTD}
                  editnavigation={ROUTE.editPrimary}
                  addnavigation={ROUTE.addPrimaryskills}
                  list={employee.skillMatrix}
                />
              )}
              {!employee?.skillMatrix && (
                <AppSummary
                  title="Primary Skills"
                  addnavigation={ROUTE.addPrimaryskills}
                  list={[]}
                />
              )}
            </Grid>

            <Grid id="mit-web-training" item xs={12} md={12} lg={12}>
              {employee?.trainingMatrix && (
                <AppSummary
                  title={`Trainings `}
                  subheader={` ${employee.trainingMatrix.length} Record(s)`}
                  lastUpdated={employee.trainingMatrixLTD}
                  editnavigation={ROUTE.editTraining}
                  addnavigation={ROUTE.addTraining}
                  list={employee.trainingMatrix}
                />
              )}
              {!employee?.trainingMatrix && (
                <AppSummary
                  title="Trainings"
                  editnavigation={"editTraining"}
                  addnavigation={"addtraining"}
                  list={[]}
                />
              )}
            </Grid>
            <Grid id="mit-web-certification" item xs={12} md={12} lg={12}>
              {employee?.certificationMatrix && (
                <AppSummary
                  title={`Certifications & Licenses`}
                  subheader={`${employee.certificationMatrix.length} Record(s)`}
                  lastUpdated={employee.certificationMatrixLTD}
                  editnavigation={ROUTE.editCertification}
                  addnavigation={ROUTE.addCertification}
                  list={employee.certificationMatrix}
                />
              )}
              {!employee?.certificationMatrix && (
                <AppSummary
                  title="Certifications & Licenses"
                  addnavigation={ROUTE.editOtherSkills}
                  list={[]}
                />
              )}
            </Grid>
            {/* <Grid id="mit-web-otherskills" item xs={12} md={12} lg={12}>
            {employee?.otherSkillMatrix && (
              <AppSummary
                title="Other Skills"
                disableAction
                editnavigation={ROUTE.editOtherSkills}
                addnavigation={ROUTE.editOtherSkills}
                list={[employee.otherSkillMatrix]}
              />
            )}
            {!employee?.otherSkillMatrix && (
              <AppSummary
                title="Other Skills"
                disableAction
                editnavigation={ROUTE.editOtherSkills}
                addnavigation={ROUTE.editOtherSkills}
                list={[]}
              />
            )}
          </Grid>
          <Grid id="mit-web-education" item xs={12} md={12} lg={12}>
            {employee?.educationMatrix && (
              <AppSummary
                title="Education"
                disableAction
                editnavigation={ROUTE.editEducation}
                addnavigation={ROUTE.editEducation}
                list={employee.educationMatrix}
              />
            )}
            {!employee?.educationMatrix && (
              <AppSummary
                title="Education"
                disableAction
                addnavigation={ROUTE.editEducation}
                list={[]}
              />
            )}
          </Grid>
          <Grid id="mit-web-previousexperiance" item xs={12} md={12} lg={12}>
            {employee?.previousExperiance && (
              <AppSummary
                title="Previous Experience"
                disableAction
                editnavigation={ROUTE.editExperiance}
                addnavigation={ROUTE.editExperiance}
                list={employee.previousExperiance}
              />
            )}
            {!employee?.previousExperiance && (
              <AppSummary
                title="Previous Experience"
                disableAction
                editnavigation={ROUTE.editExperiance}
                addnavigation={ROUTE.editExperiance}
                list={[]}
              />
            )}
          </Grid> */}
            <Grid item xs={12} md={12} lg={12}>
              <Suspense fallback={<div>Loading...</div>}>
                <AppFileUploader
                  email={account.email}
                  isResumeUploaded={employee?.isResumeUploaded === "true"}
                  refresh={refresh}
                />
              </Suspense>
            </Grid>
          </Grid>
        ) : (
          <SkeltonDelayed>
            <Box>
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} animation="wave" height={"17rem"} />
              ))}
            </Box>
          </SkeltonDelayed>
        )}
      </Container>
    </>
  );
}
