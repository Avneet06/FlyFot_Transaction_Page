import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";


//create action


export const createUser=createAsyncThunk("createUser",async(data,{rejectWithValue})=>{


    const response=await fetch("https://66b393be7fba54a5b7ed75ed.mockapi.io/Flyfot",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }
    );
    try{
        const result=await response.json();
        return result
    }catch(error)
    {
     return rejectWithValue(error)
    }

})

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const response = await fetch("https://66b393be7fba54a5b7ed75ed.mockapi.io/Flyfot");
    return await response.json();
  });


  export const updateUser = createAsyncThunk(
    "updateUser",
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        const response = await fetch(`https://66b393be7fba54a5b7ed75ed.mockapi.io/Flyfot/${id}`, {
          method: "PUT", // Use PUT to update an existing resource
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update the transaction");
        }
  
        const result = await response.json();
        return result; // Return the updated data
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );



  export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id, { rejectWithValue }) => {
      try {
        const response = await fetch(`https://66b393be7fba54a5b7ed75ed.mockapi.io/Flyfot/${id}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete the user");
        }
  
        return id; // Return the deleted user ID
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const settleUser = createAsyncThunk(
    "settleUser",
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `https://66b393be7fba54a5b7ed75ed.mockapi.io/Flyfot/${id}`,
          {
            method: "PUT", // Use PUT to update an existing resource
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to settle the transaction");
        }
  
        const result = await response.json();
        return result; // Return the updated data
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  
      // Filter users with settled transactions and within the date range
      export const fetchSettledTransactions = createAsyncThunk(
        'fetchSettledTransactions',
        async ({ startDate, endDate }, { getState }) => {
          const state = getState();
          const users = state.app.users;
      
          console.log("All users:", users);  // Log all users to inspect their structure
          console.log("Start Date:", startDate, "End Date:", endDate);  // Log the selected date range
      
          // Function to get month-year from DD/MM/YYYY format
          const getMonthYear = (dateString) => {
            if (!dateString) return null;
      
            const [date, time] = dateString.split(','); // 'DD/MM/YYYY, HH:MM:SS'
            const [day, month, year] = date.split('/'); // Split 'DD/MM/YYYY'
      
            if (year && month && day) {
              const monthYear = `${month}-${year}`; // Return "MM-YYYY"
              console.log(`Parsed Month-Year for ${dateString}: ${monthYear}`);
              return monthYear;
            }
      
            console.error(`Invalid date format: ${dateString}`);
            return null;
          };
      
          // Filter users with settled transactions and within the date range
          const filteredTransactions = users.filter((user) => {
            // Check if settledOn exists
            if (!user.settledOn) {
              console.log(`No settledOn date for user ${user.name}`);
              return false;
            }
      
            // Parse settledOn date
            const monthYear = getMonthYear(user.settledOn);
      
            // Skip if the month-year parsing failed or if it's out of the date range
            if (!monthYear) {
              console.log(`Invalid settledOn date for user ${user.name}: ${user.settledOn}`);
              return false;
            }
      
            // Check if the transaction is settled and within the selected date range
            const isWithinRange = (new Date(user.settledOn) >= new Date(startDate)) && (new Date(user.settledOn) <= new Date(endDate));
      
            if (!isWithinRange) {
              console.log(`User ${user.name} settledOn date is outside the selected range.`);
            }
      
            return user.settled && isWithinRange;
          });
      
          // Group the filtered transactions by month-year
          const groupedTransactions = filteredTransactions.reduce((acc, user) => {
            const monthYear = getMonthYear(user.settledOn);
            if (monthYear) {
              if (!acc[monthYear]) {
                acc[monthYear] = [];
              }
              acc[monthYear].push(user);
            }
            return acc;
          }, {});
      
          console.log("Grouped Transactions:", groupedTransactions);  // Log grouped transactions
      
          return groupedTransactions;
        }
      );
      
  
  

export const userDetail=createSlice({
    name:"userDetail",
    initialState:{
        users:[],
        groupedSettledTransactions: {},
        loading:false,
        error:null,
    

    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true; // Start loading when request is pending
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false; // Stop loading when request is fulfilled
                state.users.push(action.payload); // Add the new user to the state
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false; // Stop loading when request is rejected
                state.error = action.payload; // Set error state to the rejection payload
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
              })
              .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
              })
              .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              })
              .addCase(updateUser.pending, (state) => {
                state.loading = true;
              })
              .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                  state.users[index] = action.payload; // Update Redux store
                }
              })
              .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })
              .addCase(deleteUser.pending, (state) => {
                state.loading = true;
              })
              .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload); // Remove deleted user
              })
              .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })
              .addCase(settleUser.pending, (state) => {
                state.loading = true;
              })
              .addCase(settleUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(
                  (user) => user.id === action.payload.id
                );
                if (index !== -1) {
                  state.users[index] = action.payload; // Update the user's settled status and date
                }
              })
              .addCase(settleUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })
              .addCase(fetchSettledTransactions.pending, (state) => {
                state.loading = true;
              })
              .addCase(fetchSettledTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.groupedSettledTransactions = action.payload;  // Save grouped transactions in state
              })
              .addCase(fetchSettledTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              });
    },
})

export default userDetail.reducer