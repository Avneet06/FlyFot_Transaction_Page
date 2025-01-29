import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const allusers = useSelector((state) => state.app.users);

  // Handle opening and closing the drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  // Navigate to different pages & close the drawer
  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  // Navigate to the Create page when the logo/heading is clicked
  const handleLogoClick = () => {
    navigate("/"); // Navigate to the create page
  };

  return (
    <>
      {/* AppBar */}
      <AppBar position="static" sx={{ mb: 5 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
          {/* Logo & Heading */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/Subject.PNG" // Add your logo path
              alt="Logo"
              style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
            />
            <Typography
              variant="h6"
              sx={{ marginLeft: 1, cursor: "pointer" }} // Add cursor style to indicate clickability
              onClick={handleLogoClick} // Add onClick handler to navigate to create page
            >
              Flyfot Life Sciences
            </Typography>
          </Box>

          {/* Hamburger Menu (Always Visible) */}
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer (Menu) */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button onClick={() => handleNavigate("/")}>
              <ListItemText primary="Create Transaction" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate("/read")}>
              <ListItemText primary={`All Records (${allusers.length})`} />
            </ListItem>
            <ListItem button onClick={() => handleNavigate("/analytics")}>
              <ListItemText primary="Settlement Record" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
