import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/userDetailSlice"; // Action to update user

const Modify = ({ open, handleClose, user }) => {
  const dispatch = useDispatch();

  // State to hold modified data
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    mode: "",
    shop_name: "",
  });

  // Update state when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        amount: user.amount || "",
        mode: user.mode || "",
        shop_name: user.shop_name || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save button click
  const handleSave = () => {
    dispatch(updateUser({ id: user.id, updatedData:formData}));
    handleClose(); // Close dialog
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Modify Transaction</DialogTitle>
      <DialogContent>
        <Box sx={{ padding: 2 }}>
          <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} fullWidth margin="normal" required />
          <TextField label="Amount" name="amount" value={formData.amount} onChange={handleInputChange} fullWidth margin="normal" type="number" required />
          <TextField label="Shop Name" name="shop_name" value={formData.shop_name} onChange={handleInputChange} fullWidth margin="normal" required />
          
          {/* Radio Buttons for Mode */}
          <Typography variant="h6" sx={{ mt: 2 }}>Mode</Typography>
          <RadioGroup name="mode" value={formData.mode} onChange={handleInputChange} row>
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          </RadioGroup>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modify;
