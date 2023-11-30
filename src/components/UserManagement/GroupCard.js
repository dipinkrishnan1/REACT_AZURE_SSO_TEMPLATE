// GroupCard.jsx
import React from "react";
import { Card, CardHeader, IconButton, List, ListItem, ListItemText, Box, Button, Typography, CardContent, useTheme } from "@mui/material";
import { AddCircleOutline as AddIcon } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";


const GroupCard = ({ group, handleDeleteUser, handleAddUser, handleExpand }) => {
  const theme = useTheme();
  return (
    <Card sx={{  backgroundImage:`${theme.palette.mode==="light" ? 'linear-gradient(135deg, rgb(245, 247, 250) 0%, rgb(242 243 245) 100%)' :'' }`}}>
      <CardHeader
        title={group.groupName}
        subheader={group.description}
        action={
          <IconButton color="primary" onClick={handleAddUser}>
            <AddIcon />
          </IconButton>
        }
      />
      <CardContent sx={{padding:'0.5rem'}}> 
      <List>
        {group.users.map((user, userIndex) => (
          <ListItem key={userIndex}>
            <ListItemText primary={user}  sx={{color:'GrayText'}} />
            <Box component={Button} onClick={() => handleDeleteUser(userIndex)}>
              <ClearIcon sx={{ opacity: "0.6" }} color="error">
                Delete
              </ClearIcon>
            </Box>
          </ListItem>
        ))}
      </List>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", borderTop: '1px solid #80808063', padding: '1rem', paddingBottom: '0.5rem' }}>
        <Typography color={'GrayText'} fontSize={'14px'}>Showing {group.users.length} of 12 accounts</Typography>
        <Button onClick={handleExpand}>{`View All >`}</Button>
      </Box>
    
    </Card>
  );
};

export default GroupCard;
