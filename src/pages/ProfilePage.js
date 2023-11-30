import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Typography, Box } from "@mui/material";
import { useMsal } from "@azure/msal-react";

export default function DashboardAppPage() {
  const [profile,setProfile]=useState(null);
  const { accounts } = useMsal();
  const user = accounts[0];
  const account = {
    displayName: user?.name,
    email: user?.username,
  };

  
  useEffect(()=>{
    setTimeout(()=>{

      setProfile(JSON.parse(localStorage.getItem("Application-profile")));
    },500)
     
  },[])

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
          <div>
      {profile?.successFlag && profile?.data?.map((item) => (
        <div key={item.id}>
          <Typography variant="h6">{item.label}</Typography>
          <Typography>{item.value}</Typography>
        </div>
      ))}
    </div>
      </Container>
    </>
  );
}
