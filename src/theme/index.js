import PropTypes from "prop-types";
import { useMemo, useState } from "react";
// @mui
import { CssBaseline, Box, Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//

import shadows from "./shadows";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import customShadows from "./customShadows";
import componentsOverride from "./overrides";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem("mode"));
  const lightthemeOptions = useMemo(
    () => ({
      palette: { mode: `light` },
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    []
  );
  const darkthemeOptions = useMemo(
    () => ({
      palette: { mode: `dark`, background:{default:'#121212'} },
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    []
  );

  const lighttheme = createTheme(lightthemeOptions);
  lighttheme.components = componentsOverride(lighttheme);

  const darktheme = createTheme(darkthemeOptions);
  darktheme.components = componentsOverride(darktheme);

  return (
    <StyledEngineProvider injectFirst>
      <Box
        component={Button}
        onClick={() => {
          const newMode = mode === "dark" ? "light" : "dark";
          setMode(newMode);
          localStorage.setItem("mode", newMode);
        }}
        color={mode === "dark" ? "white" : "#7c7c7c"}
        sx={{
          display: "flex",
          alignItems: "center",
          position: "fixed",
          zIndex: 2000,
          bottom: "0px",
          left: "0px",
          borderRadius: "30px",
        }}
      >
        {/* <Switch
          defaultChecked={mode === "dark"}
          onChange={() => {
            const newMode = mode === "dark" ? "light" : "dark";
            setMode(newMode);
            localStorage.setItem("mode", newMode);
          }}
        /> */}

        <LightModeIcon />
      </Box>

      <MUIThemeProvider theme={mode === "dark" ? darktheme : lighttheme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
