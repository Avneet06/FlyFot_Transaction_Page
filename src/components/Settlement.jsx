import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, MenuItem, Select, FormControl, InputLabel, Grid, Paper } from "@mui/material";
import { fetchUsers } from "../features/userDetailSlice"; // Assuming you have an action to fetch users

const Settlement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.app);
  
  const [selectedShop, setSelectedShop] = useState('');
  const [transactions, setTransactions] = useState([]);
  
  // Fetch users when the component is mounted
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle shop selection change
  const handleShopChange = (event) => {
    const shopName = event.target.value;
    setSelectedShop(shopName);
    
    if (shopName) {
      const filteredTransactions = users.filter((user) => user.shop_name === shopName);
      setTransactions(filteredTransactions);
    } else {
      setTransactions([]);
    }
  };

  // Group transactions by shop_name and calculate total, settled, and unsettled amounts
  const groupTransactionsByShop = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      // Ensure that amount is treated as a number
      const amount = Number(transaction.amount);
  
      if (!acc[transaction.shop_name]) {
        acc[transaction.shop_name] = {
          shop_name: transaction.shop_name,
          totalAmount: 0,
          settledAmount: 0,
          unsettledAmount: 0,
          users: [],
        };
      }
  
      // Aggregate amounts correctly
      acc[transaction.shop_name].totalAmount += amount;
  
      if (transaction.settled) {
        acc[transaction.shop_name].settledAmount += amount;
      } else {
        acc[transaction.shop_name].unsettledAmount += amount;
      }
  
      // Add user to the shop group
      acc[transaction.shop_name].users.push(transaction);
  
      return acc;
    }, {});
  };

  // Grouped transactions by shop_name
  const groupedTransactions = groupTransactionsByShop(users);

  // Get the shop's details for the selected shop
  const shopDetails = groupedTransactions[selectedShop];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: { xs: '30px', sm: '40px', md: '50px' }, fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.6rem' } }}>
        Shop Transaction Details
      </Typography>

      {/* Shop Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel id="shop-select-label">Select Shop</InputLabel>
        <Select
          labelId="shop-select-label"
          value={selectedShop}
          label="Select Shop"
          onChange={handleShopChange}
        >
          {Object.keys(groupedTransactions).map((shopName) => (
            <MenuItem key={shopName} value={shopName}>
              {shopName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display Loading or Error */}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* Display Transaction Info */}
      {selectedShop && shopDetails && (
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Transactions for {selectedShop}
          </Typography>
          <Grid container spacing={2}>
            {shopDetails.users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography>Amount: ₹{user.amount}</Typography>
                  <Typography>Settled: {user.settled ? 'Yes' : 'No'}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Display Total, Settled, and Unsettled Amounts */}
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">Total Amount: ₹{shopDetails.totalAmount}</Typography>
            <Typography variant="h6">Settled Amount: ₹{shopDetails.settledAmount}</Typography>
            <Typography variant="h6">Unsettled Amount: ₹{shopDetails.unsettledAmount}</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Settlement;
