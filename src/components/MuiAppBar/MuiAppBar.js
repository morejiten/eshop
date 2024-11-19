import { pink } from "@mui/material/colors";
import { AppBar, Button, InputAdornment, Input, Toolbar, Stack, Typography, Box } from "@mui/material";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const MuiAppBar = () => {
  const { isUserLoggedIn, isUserAdmin, logout } = useAuth();
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Default: not logged in
  // const [isUserAdmin, setIsUserAdmin] = useState(false); // Default: not admin

  const navigate = useNavigate();

  // Check login and admin status on component mount
  // useEffect(() => {
  //   const authToken = localStorage.getItem("authToken");
  //   setIsUserLoggedIn(!!authToken);

  //   // Example: Mock admin check, update based on your app logic
  //   const userRole = localStorage.getItem("userRole");
  //   setIsUserAdmin(userRole?.toLowerCase() === "admin");
  // }, []);

  const handleLogout = () => {
    logout();
    // Remove authToken and role from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

    // Update login state
    // setIsUserLoggedIn(false);

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
          upGrad E-Shop
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Stack spacing={4} direction="row" alignItems="center">
            {/* Show Home, Search bar, and Add Product for logged-in users */}
            {isUserLoggedIn && (
              <>
                <Input
                  id="input-with-icon-adornment"
                  placeholder="Search..."
                  className="globalSearch"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchRounded sx={{ color: pink[500] }} />
                    </InputAdornment>
                  }
                />
                <RouteLink to="/home" className="route-link">
                  Home
                </RouteLink>
                {isUserAdmin && (
                  <RouteLink to="/addProduct" className="route-link">
                    Add Product
                  </RouteLink>
                )}
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

            {/* Show Login and Signup for non-logged-in users */}
            {!isUserLoggedIn && (
              <>
                <RouteLink to="/login" className="route-link">
                  Login
                </RouteLink>
                <RouteLink to="/signUp" className="route-link">
                  Signup
                </RouteLink>
              </>
            )}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MuiAppBar;
