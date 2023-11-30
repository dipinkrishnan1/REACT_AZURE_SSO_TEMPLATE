import { useEffect, useState } from "react";
import { Grid, Container, Box, CircularProgress } from "@mui/material";
import { ROUTE } from "src/constants";
import getEmployee from "src/api/getEmployeeDetails";
import { MoveToTop } from "src/animated";
import {
  AppSummary,
  AppFileUploader,
  AppDescription,
} from "src/sections/@dashboard/app";
// import ProfileProgressWithValueLabel from "src/components/profile-progress/ProfileProgressWithValueLabel";

export default function UserView({ email }) {
  const [employee, setEmployee] = useState();
  const account = {
    email: email,
  };
  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        const data = await getEmployee("view", account.email);
        setEmployee(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEmployeeData();
  }, [account.email]); // Include account.email in the dependency array

  return (
    <>
      {employee ? (
        <MoveToTop>
          <Container maxWidth="99%">
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: "5px",
                    mr: "10px",
                  }}
                >
                  {/* <ProfileProgressWithValueLabel employee={employee} /> */}
                </Box>

                {employee && (
                  <AppDescription title="About" description={employee?.about} />
                )}
              </Grid>
              {employeeSections.map((section) => (
                <Grid key={section.id} item xs={12} md={12} lg={12}>
                  {employee?.[section.dataKey] && (
                    <AppSummary
                      title={section.title}
                      subheader={`   ${
                        employee[section.dataKey]?.length
                      } Record(s)`}
                      lastUpdated={employee[section.dataKey + "LTD"]}
                      disableAction
                      editnavigation={section.editRoute}
                      addnavigation={section.addRoute}
                      list={employee[section.dataKey]}
                    />
                  )}
                  {!employee?.[section.dataKey] && (
                    <AppSummary
                      title={section.title}
                      disableAction
                      addnavigation={section.addRoute}
                      list={[]}
                    />
                  )}
                </Grid>
              ))}

              <Grid item xs={12} md={12} lg={12}>
                <AppFileUploader
                  email={account.email}
                  isResumeUploaded={employee?.isResumeUploaded === "true"}
                  viewOnly
                />
              </Grid>
            </Grid>
          </Container>
        </MoveToTop>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

const employeeSections = [
  {
    id: "mit-web-primaryskills",
    title: "Primary Skills",
    dataKey: "skillMatrix",
    editRoute: ROUTE.editPrimary,
    addRoute: ROUTE.addPrimaryskills,
  },
  {
    id: "mit-web-training",
    title: "Trainings",
    dataKey: "trainingMatrix",
    editRoute: ROUTE.editTraining,
    addRoute: ROUTE.addTraining,
  },
  {
    id: "mit-web-certification",
    title: "Certifications & Licenses",
    dataKey: "certificationMatrix",
    editRoute: ROUTE.editCertification,
    addRoute: ROUTE.addCertification,
  },
  // {
  //   id: "mit-web-otherskills",
  //   title: "Other Skills",
  //   dataKey: "otherSkillMatrix",
  //   editRoute: ROUTE.editOtherSkills,
  //   addRoute: ROUTE.editOtherSkills,
  // },
  // {
  //   id: "mit-web-education",
  //   title: "Education",
  //   dataKey: "educationMatrix",
  //   editRoute: ROUTE.editEducation,
  //   addRoute: ROUTE.editEducation,
  // },
  // {
  //   id: "mit-web-previousexperiance",
  //   title: "Previous Experience",
  //   dataKey: "previousExperiance",
  //   editRoute: ROUTE.editExperiance,
  //   addRoute: ROUTE.editExperiance,
  // },
];
