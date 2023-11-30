import PropTypes from "prop-types";
import { Card, CardHeader, Box } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { CardLaunch } from "src/animated";
import StyledTextarea from "src/theme/overrides/StyledTextArea";

AppDescription.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default function AppDescription({ title, description }) {
  const theme = useTheme();

  return (
    <CardLaunch>
      <Card>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="1rem"
        >
          <CardHeader
            sx={{ color: theme.palette.primary.main }}
            title={title}
          />
        </Box>
        <Box p="1rem" pt="0.2rem">
          <StyledTextarea
            value={description ? description : "Empty"}
            disabled
          ></StyledTextarea>
        </Box>
      </Card>
    </CardLaunch>
  );
}
