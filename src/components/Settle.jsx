import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/userDetailSlice"; // Action to update user

const password = "settle123"; // Hardcoded password for now

const Settle = ({ open, handleClose, userId, amount, userName }) => {
  const dispatch = useDispatch();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState("");

  // Handle password input change
  const handlePasswordChange = (e) => {
    setEnteredPassword(e.target.value);
  };

  // Handle settle action
  const handleSettle = () => {
    if (enteredPassword === password) {
      const updatedData = {
        settled: true,
        settledOn: new Date().toLocaleString(), // Current date and time
      };

      dispatch(updateUser({ id: userId, updatedData }));
      handleClose(); // Close the dialog after successful settlement
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Settle Transaction</DialogTitle>
      <DialogContent>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">
            Are you sure you want to settle the amount of {amount} for {userName}?
          </Typography>

          <TextField
            label="Enter Password"
            type="password"
            value={enteredPassword}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            required
          />

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSettle} variant="contained" color="primary">
          Settle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settle;
