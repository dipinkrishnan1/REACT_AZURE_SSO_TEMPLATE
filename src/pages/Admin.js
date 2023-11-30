import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Typography, Box } from "@mui/material";
import { useMsal } from "@azure/msal-react";





export default function Admin() {
  const { accounts } = useMsal();
  const user = accounts[0];
  const account = {
    displayName: user?.name,
    email: user?.username,
  };

  return (
    <>
      <Helmet>
        <title>Application | Profile</title>
      </Helmet>

      <Container maxWidth="99%">
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
        
          </Box>
          <h3>Admin page</h3>
          <p>User role configured in `src\auth\AuthContext.js`</p>
      </Container>
    </>
  );
}
