import { Helmet } from "react-helmet-async";
// @mui
import { Container, Typography } from "@mui/material";

// import { useMsal } from "@azure/msal-react";

// ----------------------------------------------------------------------

export default function ComingSoon({ title }) {
  // const { accounts } = useMsal();
  // const user = accounts[0];
  // const account = {
  //   displayName: user?.name,
  // };
  return (
    <>
      <Helmet>
        <title>OneClick | Coming Soon.</title>
      </Helmet>

      <Container maxWidth="99%" sx={{ minHeight: "calc(100vh - 185px)" }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {title}
        </Typography>
        <Typography>Undergoing Enhancements</Typography>

        <p>We're currently in the process of enhancing our platform.</p>
      </Container>
    </>
  );
}
