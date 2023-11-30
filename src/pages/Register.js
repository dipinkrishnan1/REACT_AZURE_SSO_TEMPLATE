import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { Container, Typography, Divider, Box, Button } from "@mui/material";
import { motion } from "framer-motion"; // Import from framer-motion
import useResponsive from "src/hooks/useResponsive";
import Logo from "src/components/logo";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import getEmployee from "src/api/getEmployeeDetails";
import addEmployee from "src/api/addEmployee";

// Styled Components
const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

function Register() {
  // Hooks
  const mdUp = useResponsive("up", "md");
  const { accounts } = useMsal();
  const user = accounts[0];
  const account = {
    displayName: user?.name,
    email: user?.username,
  };
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    const validate = async () => {
      try {
        const data = await getEmployee("view", account.email);

        if (data.isFound !== false) {
          navigate("/");
        }
      } catch (error) {
        // Handle errors here
      }
    };
    validate();
  }, [account.email, navigate]);

  // Functions
  const fetchData = async () => {
    try {
      const data = await getEmployee("view", account.email);

      if (data.isFound !== false) {
        navigate("/");
      } else {
        const adddata = await addEmployee(account.email);
        if (adddata.successFlag === true) {
          navigate("/");
        }
      }
    } catch (error) {
      // Handle errors here
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>OneClick | Register</title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              {"Hi, Welcome!".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.12 }}
                >
                  {letter}
                </motion.span>
              ))}
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Typography variant="h4" gutterBottom>
                Register
              </Typography>
            </motion.div>

            <Divider sx={{ mt: 3 }}></Divider>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                mt: "2rem",
                mb: "1rem",
              }}
            >
              <Typography marginBottom={"2rem"}>
                Logging in for the first time? Click 'Register' to get started
                with OneClick !
              </Typography>
              <Typography variant="h6">Name: {account.displayName}</Typography>
              <Typography variant="h6">Email: {account.email}</Typography>
            </Box>
            <Button
              onClick={fetchData}
              sx={{ minWidth: "20rem", mt: "1rem" }}
              variant="contained"
            >
              REGISTER
            </Button>
          </StyledContent>
        </Container>
      </StyledRoot>
    </motion.div>
  );
}

export default Register;
