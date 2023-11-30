import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Popover } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";

function CircularProgressWithLabel(props) {
  return (
    <Box
      component={Button}
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: "1rem",
        border: "none",
        padding: "6px",
        borderRadius: "60px",
        background: "rgba(25, 118, 210, 0.04)",
      }}
      onClick={props.onClick} // Handle click event on the parent Box
    >
      {props.value !== 100 ? (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress size={"3.1rem"} variant="determinate" {...props} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.value !== 0 && (
              <Typography
                color="primary"
                variant="caption"
                component="div"
                fontWeight={"bold"}
                fontSize={"12px"}
                // color="text.secondary"
              >
                {`${Math.round(props.value)}%`}
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            padding: "0.3rem",
            border: "0.3rem solid",
            borderRadius: "90px",
          }}
        >
          <DoneIcon fontSize="large" sx={{ scale: "1.2" }} />
        </Box>
      )}
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired, // Add a prop for the click event handler
};

const getCompletedPercentage = ({ employee }) => {
  let value = 0;
  let doneList = [];
  let notList = [];
  if (employee?.about) {
    value += 10;
    doneList.push("About");
  } else {
    notList.push("About");
  }

  if (employee?.skillMatrix?.length > 0) {
    value += 30;
    doneList.push("Primary Skills");
  } else {
    notList.push("Primary Skills");
  }
  if (employee?.trainingMatrix?.length > 0) {
    value += 15;
    doneList.push("Trainings");
  } else {
    notList.push("Trainings");
  }
  if (employee?.certificationMatrix?.length > 0) {
    value += 15;
    doneList.push("Certifications");
  } else {
    notList.push("Certifications");
  }
  if (employee?.isResumeUploaded === "true") {
    value += 30;
    doneList.push("Resume");
  } else {
    notList.push("Resume");
  }

  return { value: value, doneList: doneList, notList: notList };
};

export default function ProfileProgressWithValueLabel(employee) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const matrix = getCompletedPercentage(employee);
  const handleBoxClick = (event) => {
    setPopoverOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setPopoverOpen(false);
  };

  return (
    <div>
      <CircularProgressWithLabel
        value={matrix.value}
        onClick={handleBoxClick}
      />
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box margin={"0.5rem"} padding={"1px"}>
          {matrix?.doneList?.map((item) => (
            <Box key={item} display={"flex"} alignItems={"center"}>
              <DoneIcon color="info" />
              <Typography sx={{ p: 0.7 }}>{item}</Typography>
            </Box>
          ))}

          {matrix?.notList?.map((item) => (
            <Box key={item} display={"flex"} alignItems={"center"}>
              <ClearIcon color="error" />
              <Typography sx={{ p: 1 }}>{item}</Typography>
            </Box>
          ))}
        </Box>
      </Popover>
    </div>
  );
}
