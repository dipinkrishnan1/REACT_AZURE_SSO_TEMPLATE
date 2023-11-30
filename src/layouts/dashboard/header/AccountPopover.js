import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
// router
import { useNavigate } from "react-router-dom";
import secureAPIGraphPicture from "src/api/secureAPI/secureAPIGraphPicture";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: 'About',
  //   icon: 'eva:home-fill',
  //   path: '/dashboard/about',
  // },
  {
    label: "Profile",
    icon: "eva:person-fill",
    path: "/dashboard/profile",
  },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------
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

export default function AccountPopover() {
  const [avatar, setAvatar] = useState();
  const [open, setOpen] = useState(null);
  const { accounts } = useMsal();
  const { instance } = useMsal();
  const user = accounts[0];
  const navigate = useNavigate();
  const account = {
    displayName: user?.name,
    email: user?.username,
    // photoURL: '/assets/images/avatars/avatar_default.jpg',
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    localStorage.clear("hrms-profilepic");
    localStorage.clear("hrms-profile");
    localStorage.clear("hrms-token");
    handleClose();
    instance.logoutRedirect();
  };

  useEffect(() => {
    setTimeout(() => {
      secureAPIGraphPicture(
        `${process.env.REACT_APP_GRAPH_PROFILE_PIC}/$value`
      ).then((response) => {
        setAvatar(response.imageUrl);
      });
    }, 700);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
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
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 250,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(option.path);
              }}
              key={option.label}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
