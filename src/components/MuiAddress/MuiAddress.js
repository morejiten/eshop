import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
} from "@mui/material";

const MuiAddress = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { product } = state;
    
    const [selectedAddress, setSelectedAddress] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        name: "",
        contact: "",
        street: "",
        city: "",
        state: "",
        landmark: "",
        zip: "",
    });

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
                setAddresses(data);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };

        fetchAddresses();
    }, [token]);

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const handleSubmit = async () => {
        // If a new address is being added, first save it
        let addressId = selectedAddress;
        
        if (!selectedAddress && newAddress.name) {
            try {
                const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/addresses', {
                    method: 'POST',
                    headers: {
                        'x-auth-token': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newAddress),
                });
                const data = await response.json();
                addressId = data.id; // Assuming the API returns the new address ID
            } catch (error) {
                console.error("Error saving new address:", error);
                return;
            }
        }

        // Navigate to confirm order page with necessary details
        navigate('/confirm-order', {
            state: {
                product: product,
                address: addressId,
                addressDetails: selectedAddress 
                    ? addresses.find(addr => addr.id === selectedAddress)
                    : newAddress
            }
        });
    };

    const handlePlaceOrder = async () => {
        try {
            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/orders', {
                method: 'POST',
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantity: product.quantity || 1,
                    product: product.id,
                    address: selectedAddress || newAddress.id,
                }),
            });
            
            if (response.ok) {
                // Navigate to order success page or show confirmation
                navigate('/order-success');
            } else {
                throw new Error('Order placement failed');
            }
        } catch (error) {
            console.error("Error placing order:", error);
            // Handle error - show error message to user
        }
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
                    <InputLabel sx={{ top: "-8px" }}>Select Address</InputLabel>
                    <Select
                        value={selectedAddress}
                        onChange={handleAddressChange}
                        displayEmpty
                        sx={{ width: "100%" }}
                    >
                        <MenuItem value="">
                            <em>Select...</em>
                        </MenuItem>
                        {addresses.map((address) => (
                            <MenuItem key={address.id} value={address.id}>
                                {address.name} - {address.street}, {address.city}
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