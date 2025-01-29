import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/userDetailSlice"; // Delete user action

const Delete = ({ open, handleClose, userId, isSettled }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded password (you can replace this with a more secure approach if necessary)
  const correctPassword = "settle123";

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle delete action
  const handleDelete = () => {
    if (isSettled) {
      if (password !== correctPassword) {
        setError("Incorrect password. Please try again.");
        return;
      }
    }
    dispatch(deleteUser(userId));
    handleClose(); // Close the dialog after deletion
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this transaction?</Typography>
        {isSettled && (
          <>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              This transaction is already settled. Please enter the password to delete.
            </Typography>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Delete;
