import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetailSlice';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    mode: '',
    shop_name: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure correct data types
    const newUser = {
      ...formData,
      amount: Number(formData.amount), // Convert amount to number
    };

    dispatch(createUser(newUser));
    navigate('/read');

    console.log('Form Data Submitted:', newUser);

    // Reset form fields
    setFormData({
      name: '',
      amount: '',
      mode: '',
      shop_name: '',
    });
  };

  return (
    <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: { xs: '90%', sm: '400px' }, // Responsive maxWidth for mobile and desktop
        margin: '0 auto',
        padding: { xs: '10px', sm: '20px' }, // Adjust padding for smaller screens
        boxShadow: 3,
        borderRadius: '8px',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '20px' }}>
         Enter Transaction Details
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {/* Name Input */}
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        {/* Shop Name Input */}
        <TextField
          label="Shop Name"
          name="shop_name"
          value={formData.shop_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        {/* Amount Input */}
        <TextField
          label="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />

        {/* Radio Buttons for Mode */}
        <FormControl component="fieldset" sx={{ marginTop: '16px' }} required>
          <FormLabel component="legend">Mode</FormLabel>
          <RadioGroup
            name="mode"
            value={formData.mode}
            onChange={handleInputChange}
            row
          >
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          </RadioGroup>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Create;
