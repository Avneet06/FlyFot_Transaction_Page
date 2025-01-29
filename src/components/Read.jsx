import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, Typography, Button, Grid, CircularProgress } from "@mui/material";  // Import CircularProgress
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../features/userDetailSlice"; // Fetch all users from API
import Modify from "./Modify";
import Delete from "./Delete";
import Settle from "./Settle";

const Read = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data from Redux store
  const { users = [], loading, error } = useSelector((state) => state.app);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSettle, setOpenSettle] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSettleClick = (user) => {
    setSelectedUser(user);
    setOpenSettle(true);
  };

  // Handle close settle dialog
  const handleCloseSettle = () => {
    setOpenSettle(false);
    setSelectedUser(null);
  };

  const handleModifyClick = (user) => {
    setSelectedUser(user);
    setModifyOpen(true);
  };

  // Fetch all users when component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Placeholder delete function
  const handleDeleteClick = (id, settled) => {
    setSelectedUserId(id);
    setIsSettled(settled);
    setOpenDelete(true);
  };

  // Close delete dialog
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedUserId(null);
  };

  // Placeholder settle function
  const handleSettle = (id) => {
    console.log(`Settle transaction for ID: ${id}`);
    // Dispatch Redux action here
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" variant="h6" align="center">Error: {error}</Typography>;
  }

  const unsettledUsers = users.filter((user) => !user.settled);
  const settledUsers = users.filter((user) => user.settled);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center", marginBottom: { xs: '30px', sm: '40px', md: '50px' }, fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.6rem' } }}>
        Transactions Details
      </Typography>
      <Grid container spacing={3}>
        {unsettledUsers.length > 0 ? (
          unsettledUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ height: "100%", boxShadow: 3, bgcolor: user.settled ? "lightgreen" : "white" }}>
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography>Shop Name: {user.shop_name}</Typography>
                  <Typography>Amount: ₹{user.amount}</Typography>
                  <Typography>Mode: {user.mode}</Typography>

                  {/* Settled On message */}
                  {user.settled && (
                    <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                      Settled on: {user.settledOn}
                    </Typography>
                  )}

                  {/* Action Buttons */}
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button variant="contained" color="warning" onClick={() => handleModifyClick(user)}>
                      Modify
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(user.id, user.settled)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleSettleClick(user)}
                      disabled={user.settled}
                    >
                      Settle
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No unsettled transactions found</Typography>
        )}
        {settledUsers.length > 0 ? (
          settledUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ height: "100%", boxShadow: 3, bgcolor: user.settled ? "lightgreen" : "white" }}>
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography>Shop Name: {user.shop_name}</Typography>
                  <Typography>Amount: ₹{user.amount}</Typography>
                  <Typography>Mode: {user.mode}</Typography>

                  {/* Settled On message */}
                  {user.settled && (
                    <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                      Settled on: {user.settledOn}
                    </Typography>
                  )}

                  {/* Action Buttons */}
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    {/* No buttons for settled users */}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No settled transactions found</Typography>
        )}
      </Grid>
      <Modify open={modifyOpen} handleClose={() => setModifyOpen(false)} user={selectedUser} />
      <Delete
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        userId={selectedUserId}
        isSettled={isSettled}
      />
      {selectedUser && (
        <Settle
          open={openSettle}
          handleClose={handleCloseSettle}
          userId={selectedUser.id}
          amount={selectedUser.amount}
          userName={selectedUser.shop_name}
        />
      )}
    </Box>
  );
};

export default Read;
