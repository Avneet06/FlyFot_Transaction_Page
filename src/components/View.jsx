import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

const View = ({ open, handleClose, user }) => {
  if (!user) return null; // Ensure user data exists before rendering

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Name: {user.name}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Typography variant="h6">Age: {user.age}</Typography>
          <Typography variant="h6">Gender: {user.gender}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default View;
