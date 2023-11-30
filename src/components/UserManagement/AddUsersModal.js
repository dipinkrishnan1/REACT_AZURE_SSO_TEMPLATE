// AddUsersModal.jsx
import React from "react";
import { Modal, Box, Button, Typography, Autocomplete, TextField } from "@mui/material";

const AddUsersModal = ({ isModalOpen, handleCloseModal, selectedItems, setSelectedItems, handleAdd }) => {
  return (
    <Modal open={isModalOpen}>
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            min: "300",
            bgcolor: "background.paper",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
            pb: 2,
            pr: 3,
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
               <Typography variant="h6"  >
            L & D Admin
          </Typography>
          <Typography color='GrayText' >
            Access to L&D Dashboard
          </Typography>
          <Autocomplete
            sx={{mt:'1.5rem'}}
            fullWidth
            multiple
            id="multi-select-autocomplete"
            options={[{label:"dipin.k@mastechinfotrellis.com"},{label:"aims.k@mastechinfotrellis.com"}]}
            getOptionLabel={(option) => option.label}
            value={selectedItems}
            onChange={(_, newValue) => {
              setSelectedItems(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Add Users" />
            )}
          />
          <Box display="flex" justifyContent={'flex-end'} marginTop={3}>
            <Button
    
              variant="contained"
              color="primary"
              onClick={handleAdd}
            >
              Add
            </Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default AddUsersModal;
