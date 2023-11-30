import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  LinearProgress,
} from "@mui/material";
// utils
import { bgBlur } from "src/utils/cssStyles";
// components
import Iconify from "src/components/iconify";
//
// import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";

import NotificationsPopover from "./NotificationsPopover";
import { useLoaderContext } from "src/context/LoaderContext";
import { useNavigate, useLocation } from "react-router-dom";
import useResponsive from "src/hooks/useResponsive";
import { HeightLaunch } from "src/animated";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 78;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  backgroundColor: "transparent",
  backdropFilter: "blur(20px)",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const { isLoading } = useLoaderContext();
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useResponsive("up", "lg");

  const goBack = () => {
    navigate(-1); // This will navigate one step back in the history.
  };
  return (
    <>
      <StyledRoot>
        <StyledToolbar>
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: "text.primary",
              display: { lg: "none" },
            }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>

          {/* <Searchbar /> */}
          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
            <NotificationsPopover />
            <AccountPopover />
          </Stack>
        </StyledToolbar>
        {/* {isLoading && (
        
        )} */}
        {isLoading && (
          <HeightLaunch>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </HeightLaunch>
        )}
        {location.pathname.startsWith("/dashboard/profile") &&
          location.pathname !== "/dashboard/profile" && (
            <Box
              sx={{
                position: "fixed",
                top: `${isDesktop ? "1.4rem" : "0.6rem"}`,
                left: `${isDesktop ? "0" : "4rem"}`,
                backdropFilter: "blur(20px)",
              }}
            >
              <Button
                size="large"
                color="primary"
                width="5rem"
                sx={{
                  backgroundColor: "transparent",
                  backdropFilter: "blur(5px)",
                }}
                onClick={goBack}
                startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
              >
                Back
              </Button>
            </Box>
          )}
      </StyledRoot>
    </>
  );
}
