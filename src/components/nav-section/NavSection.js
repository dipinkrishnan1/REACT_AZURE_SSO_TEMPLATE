import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], onCloseNav }) {
  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} onCloseNav={onCloseNav} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item, onCloseNav }) {
  const { title, path, icon, isAdmin } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      onClick={() => {
        onCloseNav();
      }}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      <StyledNavItemIcon
        sx={{ scale: "0.8", color: "#1976d2", opacity: "0.6" }}
      >
        {isAdmin && isAdmin}
      </StyledNavItemIcon>
    </StyledNavItem>
  );
}
