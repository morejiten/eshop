import { pink } from "@mui/material/colors";
import { AppBar, Button, InputAdornment, Input, Toolbar, Stack, Typography, Box, IconButton } from "@mui/material";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MuiAppBar = ({ searchTerm, onSearch }) => {
  const { isUserLoggedIn, isUserAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log("Search term updated:", value);  // Log the updated value
    onSearch(value); // Pass search term to parent component
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
          upGrad E-Shop
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Stack spacing={4} direction="row" alignItems="center">
            {isUserLoggedIn && (
              <>
                <Input
                  id="input-with-icon-adornment"
                  placeholder="Search..."
                  className="globalSearch"
                  value={searchTerm}  // Use the searchTerm passed from App.js
                  onChange={handleSearchChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchRounded sx={{ color: pink[500] }} />
                    </InputAdornment>
                  }
                />
                <RouteLink to="/home" className="route-link">Home</RouteLink>
                {isUserAdmin && <RouteLink to="/addProduct" className="route-link">Add Product</RouteLink>}
                <Button
                  variant="contained"
                  color="default"
                  sx={{ backgroundColor: pink[500] }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}

            {!isUserLoggedIn && (
              <>
                <RouteLink to="/login" className="route-link">Login</RouteLink>
                <RouteLink to="/signUp" className="route-link">Signup</RouteLink>
              </>
            )}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MuiAppBar;
