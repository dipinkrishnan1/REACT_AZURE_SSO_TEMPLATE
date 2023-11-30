// UserManagement.jsx
import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import GroupCard from "../components/UserManagement/GroupCard";
import ExpandedView from "../components/UserManagement/ExpandedView";
import AddUsersModal from "../components/UserManagement/AddUsersModal";

const AccessHub = () => {
  const [groups, setGroups] = useState([
    {
      groupName: "L & D Admin",
      description:"Access to L&D Dashboard",
      users: [
        "dipin.k@mastechinfotrellis.com",
   
        "Deepika@mastechinfotrellis.com",
        "Bharath.k@mastechinfotrellis.com",
      ],
    },
    {
      groupName: "Org Admin",
      description:"Access to Org Dashboard",
      users: [
        "dipin.k@mastechinfotrellis.com",
   
        "Deepika@mastechinfotrellis.com",
        "Bharath.k@mastechinfotrellis.com",
      ],
    },
    {
      groupName: "HR Admin",
      description:"Access to HR Dashboard",
      users: [
        "dipin.k@mastechinfotrellis.com",
   
        "Deepika@mastechinfotrellis.com",
        "Bharath.k@mastechinfotrellis.com",
      ],
    },
    {
      groupName: "Application Admin",
      description:"Access to L&D Dashboard , Org Dashboard, HR Dashboard",
      users: [
        "dipin.k@mastechinfotrellis.com",
        "arka@mastechinfotrellis.com",
      ],
    },
    {
      groupName: "Super User",
      description:"Access to L&D Dashboard , Org Dashboard, HR Dashboard, Access Hub",
      users: [
        "admin@mastechinfotrellis.com",
        
      ],
    },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({
    groupName: "L & D Admin",
    description:"Access to L&D Dashboard",
    users: [
      "d1ipin.k@mastechinfotrellis.com",
      "ar1ka@mastechinfotrellis.com",
      "Dee1pika@mastechinfotrellis.com",
      "Bharath.k@mastechinfotrellis.com",
      "1dipin.k@mastechinfotrellis.com",
      "aqrka@mastechinfotrellis.com",
      "Deqepika@mastechinfotrellis.com",
      "Bhqarath.k@mastechinfotrellis.com",
      "dipqqin.k@mastechinfotrellis.com",
      "arkqa@mastechinfotrellis.com",
      "Dqeepika@mastechinfotrellis.com",
      "Bhqarath.k@mastechinfotrellis.com",
    ],
  });
  
  
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAdd = () => {
    setModalOpen(false);
  };
  const handleCloseExpanded = () => {
 
    setIsExpand(false);
  };

  const handleDeleteUser = (groupIndex, userIndex) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].users.splice(userIndex, 1);
    setGroups(updatedGroups);
  };


  return (
    <>
      <Helmet>
        <title>Skills | Org Dashboard</title>
      </Helmet>

      <Container maxWidth="99%">

      <Typography variant="h4" sx={{ mb: 8, maxWidth: "80%" }}>
              Access Hub 
            </Typography>

        <Grid minHeight={"100vh"} container spacing={4}>
          {groups.map((group, groupIndex) => (
            <Grid item key={group.groupName} xs={12} sm={12} md={6}>
              <GroupCard
                group={group}
                handleDeleteUser={(userIndex) => handleDeleteUser(groupIndex, userIndex)}
                handleAddUser={() => {
                  // setCurrentGroup(groupIndex);
                  setModalOpen(true);
                }}
                handleExpand={() => {
                  setIsExpand(true);
                  setSelectedGroup(group);
                }}
              />
            </Grid>
          ))}
        </Grid>

        <ExpandedView
          isExpand={isExpand}
          handleCloseExpanded={handleCloseExpanded}
          selectedGroup={selectedGroup}
          handleDeleteUser={(userIndex) => handleDeleteUser(1, userIndex)}
          handleAdd={() => {
            // setCurrentGroup(groupIndex);
            setModalOpen(true);
          }}
        />
        <AddUsersModal
          isModalOpen={isModalOpen}
          handleCloseModal={() => setModalOpen(false)}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          handleAdd={handleAdd}
        />
      </Container>
    </>
  );
};

export default AccessHub;
