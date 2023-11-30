import { useMsal } from "@azure/msal-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";

// hooks
import useResponsive from "src/hooks/useResponsive";
// components
import Logo from "src/components/logo";
import Scrollbar from "src/components/scrollbar";
import NavSection from "src/components/nav-section";
//
import navConfig from "./config";
import secureAPIGraphPicture from "src/api/secureAPI/secureAPIGraphPicture";
import { useAuth } from "src/auth/AuthContext";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  try {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  } catch (error) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
}

export default function Nav({ openNav, onCloseNav }) {
  const [avatar, setAvatar] = useState(null);
  const { isAdmin } = useAuth();
  const { accounts } = useMsal();
  const user = accounts[0];

  const account = {
    displayName: user?.name,
    email: user?.me,
    //photoURL: '/assets/images/avatars/avatar_default.jpg',
  };

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    setTimeout(() => {
      secureAPIGraphPicture(
        `${process.env.REACT_APP_GRAPH_PROFILE_PIC}/$value`
      ).then((response) => {
        setAvatar(response.imageUrl);
      });
    }, 700);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            {avatar ? (
              <Avatar src={avatar} />
            ) : (
              <>
                {account?.displayName ? (
                  <Avatar {...stringAvatar(account?.displayName)} />
                ) : (
                  <Avatar />
                )}
              </>
            )}

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {isAdmin ? "Administrator" : "Employee"}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection
        data={navConfig({ isAdmin: isAdmin })}
        onCloseNav={onCloseNav}
      />

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">
            Upgrade to Pro
          </Button>
        </Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "#00000005",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
