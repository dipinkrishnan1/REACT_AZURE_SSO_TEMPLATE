import * as React from "react";
import { TextareaAutosize } from "@mui/material";
import { styled } from "@mui/system";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledTextareaComponent = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 99%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    min-height:3rem;
    resize: none; 
    border-radius: 8px 8px 8px 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : "rgba(0, 0, 0, 0.6)"};
    background: ${theme.palette.mode === "dark" ? " #121212" : "#fff"};
 
    border: 1px solid ${theme.palette.mode === "dark" ? "#d0d7de" : "#d0d7de"};
  

    &:focus {
      border-color: ${blue[100]};
    }

    // &:focus {
    //   border-color: ${blue[400]};
    //   box-shadow: 0 0 0 0px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
    // }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

export default function StyledTextAreaEdit({
  value,
  onChange,
  disabled = false,
}) {
  return (
    <StyledTextareaComponent
      disabled={disabled}
      defaultValue={value}
      onChange={onChange}
      aria-label="empty textarea"
      placeholder={!disabled ? "Write a brief about yourself..." : "  NA"}
      spellCheck={false}
    />
  );
}
