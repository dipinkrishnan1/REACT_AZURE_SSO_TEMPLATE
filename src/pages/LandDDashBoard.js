import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";

// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "src/components/iconify";

import SearchEmployee from "src/sections/@dashboard/admin/SearchEmployee";
import ExportEmployee from "src/sections/@dashboard/admin/ExportEmployee";
import { useAuth } from "src/auth/AuthContext";
import { MoveToTop } from "src/animated";
// ----------------------------------------------------------------------

const AppWebsiteVisits = lazy(() =>
  import("src/sections/@dashboard/app/AppWebsiteVisits")
);
const AppNewsUpdate = lazy(() =>
  import("src/sections/@dashboard/app/AppNewsUpdate")
);
const AppOrderTimeline = lazy(() =>
  import("src/sections/@dashboard/app/AppOrderTimeline")
);
const AppCurrentVisits = lazy(() =>
  import("src/sections/@dashboard/app/AppCurrentVisits")
);
const AppTrafficBySite = lazy(() =>
  import("src/sections/@dashboard/app/AppTrafficBySite")
);
const AppCurrentSubject = lazy(() =>
  import("src/sections/@dashboard/app/AppCurrentSubject")
);

const AppConversionRates = lazy(() =>
  import("src/sections/@dashboard/app/AppConversionRates")
);
// const AppWidgetSummary = lazy(() =>
//   import("src/sections/@dashboard/app/AppWidgetSummary")
// );
const AppUserPage = lazy(() =>
  import("src/sections/@dashboard/app/AppUserPage")
);

export default function LandDDashBoard() {
  const theme = useTheme();
  const { isAdmin, loading } = useAuth();

  return (
    <>
      <Helmet>
        <title> OneClick | L & D Dashboard</title>
      </Helmet>
      {isAdmin ? (
        <>
          <MoveToTop>
            <Typography variant="h4" sx={{ mb: 5, ml: "1.2rem" }}>
              L&D Dashboard
            </Typography>
          </MoveToTop>
          <Container maxWidth="99%" sx={{ height: "90%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <SearchEmployee />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <ExportEmployee />
              </Grid>
            </Grid>
            {true && (
              <>
                <Typography
                  color="primary"
                  variant="h5"
                  sx={{ mt: "4rem", ml: "0rem", mb: "2rem" }}
                >
                  Discover
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={8} lg={8}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AppWebsiteVisits
                        title="Certifications"
                        subheader="(+43%) than last year"
                        chartLabels={[
                          "01/01/2003",
                          "02/01/2003",
                          "03/01/2003",
                          "04/01/2003",
                          "05/01/2003",
                          "06/01/2003",
                          "07/01/2003",
                          "08/01/2003",
                          "09/01/2003",
                          "10/01/2003",
                          "11/01/2003",
                        ]}
                        chartData={[
                          {
                            name: "Azure",
                            type: "column",
                            fill: "solid",
                            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                          },
                          {
                            name: "IBM",
                            type: "area",
                            fill: "gradient",
                            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                          },
                          {
                            name: "Reltio",
                            type: "line",
                            fill: "solid",
                            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                          },
                        ]}
                      />
                    </Suspense>
                  </Grid>

                  <Grid item xs={12} md={4} lg={4}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AppCurrentVisits
                        title="Trainings"
                        chartData={[
                          { label: "AWS", value: 4344 },
                          { label: "IBM", value: 5435 },
                          { label: "GCP", value: 1443 },
                          { label: "Redhat", value: 4443 },
                        ]}
                        chartColors={[
                          theme.palette.primary.main,
                          theme.palette.info.main,
                          theme.palette.warning.main,
                          theme.palette.error.main,
                        ]}
                      />
                    </Suspense>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AppUserPage />
                    </Suspense>
                  </Grid>

                  <Grid item xs={12} md={6} lg={8}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AppConversionRates
                        title="Conversion Rates"
                        subheader="(+43%) than last year"
                        chartData={[
                          { label: "Italy", value: 400 },
                          { label: "Japan", value: 430 },
                          { label: "China", value: 448 },
                          { label: "Canada", value: 470 },
                          { label: "France", value: 540 },
                          { label: "Germany", value: 580 },
                          { label: "South Korea", value: 690 },
                          { label: "Netherlands", value: 1100 },
                          { label: "United States", value: 1200 },
                          { label: "United Kingdom", value: 1380 },
                        ]}
                      />
                    </Suspense>
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AppCurrentSubject
                        title="Current Subject"
                        chartLabels={[
                          "English",
                          "History",
                          "Physics",
                          "Geography",
                          "Chinese",
                          "Math",
                        ]}
                        chartData={[
                          { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                          { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                          { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
                        ]}
                        chartColors={[...Array(6)].map(
                          () => theme.palette.text.secondary
                        )}
                      />
                    </Suspense>
                  </Grid>

                  <Grid item xs={12} md={6} lg={8}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AppNewsUpdate
                        title="News Update"
                        list={[...Array(5)].map((_, index) => ({
                          id: faker.datatype.uuid(),
                          title: faker.name.jobTitle(),
                          description: faker.name.jobTitle(),
                          image: `/assets/images/covers/cover_${index + 1}.jpg`,
                          postedAt: faker.date.recent(),
                        }))}
                      />
                    </Suspense>
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AppOrderTimeline
                        title="Order Timeline"
                        list={[...Array(5)].map((_, index) => ({
                          id: faker.datatype.uuid(),
                          title: [
                            "1983, orders, $4220",
                            "12 Invoices have been paid",
                            "Order #37745 from September",
                            "New order placed #XF-2356",
                            "New order placed #XF-2346",
                          ][index],
                          type: `order${index + 1}`,
                          time: faker.date.past(),
                        }))}
                      />
                    </Suspense>
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AppTrafficBySite
                        title="Traffic by Site"
                        list={[
                          {
                            name: "FaceBook",
                            value: 323234,
                            icon: (
                              <Iconify
                                icon={"eva:facebook-fill"}
                                color="#1877F2"
                                width={32}
                              />
                            ),
                          },
                          {
                            name: "Google",
                            value: 341212,
                            icon: (
                              <Iconify
                                icon={"eva:google-fill"}
                                color="#DF3E30"
                                width={32}
                              />
                            ),
                          },
                          {
                            name: "Linkedin",
                            value: 411213,
                            icon: (
                              <Iconify
                                icon={"eva:linkedin-fill"}
                                color="#006097"
                                width={32}
                              />
                            ),
                          },
                          {
                            name: "Twitter",
                            value: 443232,
                            icon: (
                              <Iconify
                                icon={"eva:twitter-fill"}
                                color="#1C9CEA"
                                width={32}
                              />
                            ),
                          },
                        ]}
                      />
                    </Suspense>
                  </Grid>
                </Grid>
              </>
            )}
          </Container>
        </>
      ) : (
        <>
          {!loading && (
            <Typography>You are not authorized to view this page</Typography>
          )}
        </>
      )}
    </>
  );
}
