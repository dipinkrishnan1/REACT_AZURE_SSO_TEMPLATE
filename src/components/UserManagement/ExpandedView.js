// ExpandedView.js
import React from "react";
import { Modal, Box, Typography, TextField, InputAdornment,IconButton } from "@mui/material";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import { AddCircleOutline as AddIcon } from "@mui/icons-material";

const ExpandedView = ({ isExpand, handleCloseExpanded, selectedGroup, handleDeleteUser ,handleAdd }) => {
  return (
    <Modal open={isExpand}>
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            height: '90%',
            transform: "translate(-50%, -50%)",
            minWidth: "400px",
            bgcolor: "background.paper",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
            pb: 2,
            pr: 3,
            pl:3,
            pt: 1,
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
          <IconButton color="error" >
          <ClearIcon fontSize="large" color="error" onClick={handleCloseExpanded}>{`Close`}</ClearIcon>
          </IconButton>
           
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between',alignItems:'flex-start',pt:'1rem' ,mb:5}} >
           <Box maxWidth={'80%'}> 
           <Typography variant="h6"  >
            {`${selectedGroup.groupName}`}
          </Typography>
          <Typography color='GrayText' >
             {selectedGroup.description}
          </Typography>
           </Box>
          
          <IconButton color="primary" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
          </Box>


          <TextField
            placeholder="Search in group"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box mt={2} mb={4}  height={'90%'} overflow={'scroll'}>
            {/* <ListItemText primary="Users in Group:" /> */}
            <Box mt={2} height={'90%'} >
              {selectedGroup.users.map((user, userIndex) => (
                <Box key={userIndex} display="flex" alignItems="center" padding={'0.5rem'} paddingRight={'1rem'}>
                  <ListItemText primary={user}  />
                  <ClearIcon
                    sx={{ opacity: "0.6", marginLeft: "auto", cursor: "pointer" }}
                    color="error"
                    onClick={() => handleDeleteUser(1, userIndex)}
                  >
                    Delete
                  </ClearIcon>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default ExpandedView;
