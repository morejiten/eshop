import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Button,
    Divider,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const MuiAddress = () => {
    const { state } = useLocation();
    const { product } = state; // Extract product details

    console.log(product);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [newAddress, setNewAddress] = useState({
        name: "",
        contact: "",
        street: "",
        city: "",
        state: "",
        landmark: "",
        zip: "",
    });
    const [addresses, setAddresses] = useState([]);

    const token = localStorage.getItem('authToken');

    // Fetch addresses from the API
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/addresses', {
                    method: 'GET',
                    headers: {
                        'x-auth-token': token,
                    },
                });
                const data = await response.json();
                setAddresses(data); // Assuming the response is an array of address objects
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };

        fetchAddresses();
    }, []);

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const handleSubmit = () => {
        console.log("Address Submitted:", selectedAddress || newAddress);
    };

    return (
        <Box sx={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
            {/* Stepper */}
            <Stepper activeStep={1} alternativeLabel>
                <Step>
                    <StepLabel>Items</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Select Address</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Confirm Order</StepLabel>
                </Step>
            </Stepper>

            {/* Select Address */}
            <Box sx={{ marginTop: "20px" }}>
                <FormControl fullWidth>
                    <InputLabel>Select Address</InputLabel>
                    <Select
                        value={selectedAddress}
                        onChange={handleAddressChange}
                        displayEmpty
                    >
                        <MenuItem value="">
                            <em>Select...</em>
                        </MenuItem>
                        {addresses.map((address) => (
                            <MenuItem key={address.id} value={address.id}>
                                {address.name} - {address.city} {/* Customize display */}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Typography align="center" sx={{ marginY: "20px" }}>
                    - OR -
                </Typography>

                {/* Add Address Form */}
                <Box
                    component="form"
                    sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
                >
                    <TextField
                        required
                        label="Name"
                        name="name"
                        value={newAddress.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        label="Contact Number"
                        name="contact"
                        value={newAddress.contact}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        label="Street"
                        name="street"
                        value={newAddress.street}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        label="City"
                        name="city"
                        value={newAddress.city}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        label="State"
                        name="state"
                        value={newAddress.state}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Landmark"
                        name="landmark"
                        value={newAddress.landmark}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        label="Zip Code"
                        name="zip"
                        value={newAddress.zip}
                        onChange={handleInputChange}
                    />
                </Box>
            </Box>

            {/* Submit Button */}
            <Box sx={{ marginTop: "20px", textAlign: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!selectedAddress && !newAddress.name}
                >
                    Confirm
                </Button>
            </Box>
        </Box>
    );
};

export default MuiAddress;
