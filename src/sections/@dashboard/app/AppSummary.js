import PropTypes from "prop-types";
import { useState } from "react";
import {
  Card,
  Stack,
  Divider,
  CardHeader,
  Typography,
  Box,
  Button,
  Grid,
  styled,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
// import CachedIcon from "@mui/icons-material/Cached";
import { useNavigate } from "react-router-dom";
import { CardLaunch, MoveToTopDelayed } from "src/animated";
import Iconify from "src/components/iconify";
import StyledTextarea from "src/theme/overrides/StyledTextArea";

AppSummary.propTypes = {
  title: PropTypes.string,
  lastUpdated: PropTypes.string,
  description: PropTypes.string,
  showDescription: PropTypes.bool,
  onDescUpdate: PropTypes.func,
  editnavigation: PropTypes.string,
  addnavigation: PropTypes.string,
  disableAction: PropTypes.bool,
  layout: PropTypes.number,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default function AppSummary({
  title,
  lastUpdated,
  description,
  showDescription = false,
  onDescUpdate,
  editnavigation,
  addnavigation,
  disableAction = false,
  disableUpdate = false,
  layout = 6,
  subheader,
  list = [],
  ...other
}) {
  const [lisiItems, setlisiItems] = useState(list?.slice(0, 4));
  const [expanded, setexpanded] = useState(false);

  const navigate = useNavigate();
  // const buttonRef = useRef();

  const handleEdit = () => {
    navigate(editnavigation);
  };
  const handleAdd = () => {
    navigate(addnavigation);
  };
  const viewAll = () => {
    if (!expanded) {
      setlisiItems(list);
    } else {
      setlisiItems(list.slice(0, 4));
    }
    setexpanded(!expanded);
  };

  // const descriptionUpdate = () => {
  //   onDescUpdate(desc);
  //   buttonRef.current.focus();
  // };
  const theme = useTheme();

  return (
    <CardLaunch>
      {list && (
        <Card {...other}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="1rem"
          >
            <MoveToTopDelayed>
              <CardHeader
                sx={{ color: theme.palette.primary.main }}
                title={title}
                subheader={
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.text.disabled}
                  >
                    {subheader}
                  </Typography>
                }
              />
            </MoveToTopDelayed>
            <Box
              display={"flex"}
              flexDirection={"column-reverse"}
              alignItems={"flex-end"}
            >
              {showDescription && !disableUpdate && (
                <Box component={Button} onClick={handleEdit}>
                  <EditIcon sx={{ scale: "0.9" }} />
                </Box>
              )}
              {!disableAction && (
                <Box sx={{ marginTop: "-1rem", display: "flex" }}>
                  <Box component={Button} onClick={handleAdd}>
                    <AddIcon sx={{ scale: "1.2" }} />
                  </Box>
                  <Box component={Button} onClick={handleEdit}>
                    <EditIcon sx={{ scale: "0.9" }} />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          {showDescription && (
            <Box
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
              width="98%"
              ml="0.2rem"
            >
              <StyledTextarea disabled value={description} />
            </Box>
          )}

          <Box>
            <Grid container spacing={1}>
              {lisiItems.map((task) => (
                <Grid key={task.id} item xs={12} md={layout}>
                  <Item sx={{ background: "transparent !important" }}>
                    <Stack
                      direction="row"
                      sx={{
                        px: 2,
                        py: 0.75,
                      }}
                    >
                      <MoveToTopDelayed>
                        <Box sx={{ flexGrow: 1, m: 0.1 }}>
                          <Typography
                            fontWeight="500"
                            color={theme.palette.text.primary}
                          >
                            {task.label}
                          </Typography>
                          <Typography color={theme.palette.text.disabled}>
                            {task.value}
                          </Typography>
                          <Divider
                            sx={{
                              marginTop: "0rem",
                              backgroundColor: "white",
                              border: "none",
                            }}
                          />
                        </Box>
                      </MoveToTopDelayed>
                    </Stack>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Divider />
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {lastUpdated ? (
              <Box
                display="flex"
                alignItems="flex-end"
                color={theme.palette.text.disabled}
                sx={{ marginLeft: "0.5rem" }}
              >
                <MoveToTopDelayed>
                  <Typography fontSize={"14px"}>Last updated </Typography>
                  <Typography fontSize={"14px"}>{lastUpdated}</Typography>
                </MoveToTopDelayed>
              </Box>
            ) : (
              <Typography></Typography>
            )}
            <Button
              onClick={viewAll}
              size="small"
              color="primary"
              endIcon={
                <Iconify
                  icon={
                    expanded
                      ? "eva:arrow-ios-back-fill"
                      : "eva:arrow-ios-forward-fill"
                  }
                />
              }
            >
              {!expanded ? "View all" : "View less"}
            </Button>
          </Box>
        </Card>
      )}
    </CardLaunch>
  );
}
