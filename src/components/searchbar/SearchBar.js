import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Autocomplete } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import getCodeTableByName from "src/api/getCodeTableByName";
import TreeSelect from "../treeselect/TreeSelect";
import useResponsive from "src/hooks/useResponsive";

function SearchBar({ onSearch }) {
  const [searchType, setSearchType] = React.useState(1);
  const [queryString, setqueryString] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const isDesktop = useResponsive("up", "lg");

  const handleChangeSearchType = (event) => {
    setSearchType(event.target.value);
    setqueryString("");
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setqueryString(query);
  };

  const handleSearch = () => {
    if (queryString)
      onSearch({
        type: searchType,
        query: queryString,
      });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: `${isDesktop ? "row" : "column"}` }}
    >
      <FormControl
        sx={{
          minWidth: `${isDesktop ? "30%" : "100%"}`,
          mb: `${isDesktop ? "0" : "1rem"}`,
        }}
      >
        <InputLabel id="demo-simple-select-label">Search By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchType}
          label="Search By"
          onChange={handleChangeSearchType}
        >
          <MenuItem value={1}>Skills</MenuItem>
          <MenuItem value={2}>Employee</MenuItem>
          <MenuItem value={3}>Certification</MenuItem>
          <MenuItem value={4}>Certification (Beta)</MenuItem> 
        </Select>
      </FormControl>
      {searchType === 2 && (
        <TextField
          placeholder="Search..."
          fullWidth
          onChange={handleSearchChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      )}
      {searchType === 1 && (
        <Autocomplete
          fullWidth
          options={options}
          onOpen={async () => {
            const codeTable = await getCodeTableByName(
              process.env.REACT_APP_CODE_TABLE_SKILLS
            );

            const optionsTemp = codeTable.map((obj) => obj?.name);
            setOptions([...optionsTemp]);
          }}
          onChange={(e, newValue) => {
            if (searchType === 1)
              onSearch({
                type: searchType,
                query: newValue,
              });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Enter Skill" variant="outlined" />
          )}
        />
      )}
      {searchType === 3 && (
        <Autocomplete
          fullWidth
          options={options}
          onOpen={async () => {
            const codeTable = await getCodeTableByName(
              process.env.REACT_APP_CODE_TABLE_CERTIFICATIONS
            );

            const optionsTemp = codeTable.map((obj) => obj?.name);
            setOptions([...optionsTemp]);
          }}
          onChange={(e, newValue) => {
            if (searchType === 3)
              onSearch({
                type: searchType,
                query: newValue,
              });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter Certification"
              variant="outlined"
            />
          )}
        />
      )}
      {searchType === 4 && <TreeSelect />}
    </Box>
  );
}

export default SearchBar;
