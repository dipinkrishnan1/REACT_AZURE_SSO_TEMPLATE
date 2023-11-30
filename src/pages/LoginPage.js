import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react"; // Import useEffect and useState

// hooks
import useResponsive from "src/hooks/useResponsive";
// components
import Logo from "src/components/logo";
// sections
import { LoginForm } from "src/sections/auth/login";

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true); // State to control loading
  const mdUp = useResponsive("up", "md");

  useEffect(() => {
    // Delay rendering for 2 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 1000);

    return () => clearTimeout(timeout); // Clean up the timeout when the component unmounts
  }, []);

  if (isLoading) {
    return null; // Render nothing while still loading
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>OneClick | Login</title>
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
              {" Hi , Welcome!".split("").map((letter, index) => (
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
                Sign in to OneClick
              </Typography>
            </motion.div>

            <Divider sx={{ my: 3 }}></Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </motion.div>
  );
}
