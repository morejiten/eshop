import React, { useState } from "react";
import { pink } from "@mui/material/colors";
import { FormControl, TextField, Button, Link, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MuiSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSignUp = async () => {
    const { firstName, lastName, email, password, confirmPassword, contactNumber } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      email,
      password,
      firstName,
      lastName,
      role: ["admin"], // Adjust role as needed
      contactNumber,
    };

    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Sign-up successful!");
        console.log(result);
      } else {
        const error = await response.json();
        alert(`Sign-up failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <FormControl size="medium">
        <Stack alignItems="center" direction="column" spacing={2}>
          <AccountCircleIcon sx={{ color: pink[500] }} fontSize="large" />
          <Typography variant="h5">Sign Up</Typography>

          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            size="medium"
            fullWidth
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <TextField
            id="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <TextField
            id="contactNumber"
            label="Contact Number"
            variant="outlined"
            fullWidth
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
            Sign Up
          </Button>
          <Link href="#" color="inherit" variant="body2">
            Already have an account? Sign In
          </Link>
        </Stack>
      </FormControl>
    </div>
  );
};

export default MuiSignUp;
