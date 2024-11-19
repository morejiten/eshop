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
    Alert,
    IconButton,
    Card,
    CardContent
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const MuiAddress = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { product } = state;

    const [selectedAddress, setSelectedAddress] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [showError, setShowError] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: "",
        contactNumber: "",
        street: "",
        city: "",
        state: "",
        landmark: "",
        zipcode: ""
    });

    const token = localStorage.getItem('authToken');

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

    // Fetch addresses from the API
    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({
            ...prev,
            [name]: value
        }));
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

    const handleSaveAddress = async () => {
        try {
            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/addresses', {
                method: 'POST',
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAddress)
            });

            if (response.ok) {
                // Clear form and refresh addresses
                setNewAddress({
                    name: "",
                    contactNumber: "",
                    street: "",
                    city: "",
                    state: "",
                    landmark: "",
                    zipcode: ""
                });
                fetchAddresses();
            }
        } catch (error) {
            console.error('Error saving address:', error);
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
            <Box sx={{ maxWidth: "600px", margin: "auto", p: 2 }}>
                {/* Address Selection */}
                <FormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel>Select Address</InputLabel>
                    <Select
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        label="Select Address"
                    >
                        {addresses.map((address) => (
                            <MenuItem key={address.id} value={address.id}>
                                {address.name} - {address.street}, {address.city}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Error Alert */}
                {showError && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setShowError(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Please select address!
                    </Alert>
                )}

                {/* Add Address Form */}
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            Add Address
                        </Typography>
                        <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                            <TextField
                                fullWidth
                                placeholder="Name *"
                                name="name"
                                value={newAddress.name}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                placeholder="Contact Number *"
                                name="contactNumber"
                                value={newAddress.contactNumber}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                placeholder="Street *"
                                name="street"
                                value={newAddress.street}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                placeholder="City *"
                                name="city"
                                value={newAddress.city}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                placeholder="State *"
                                name="state"
                                value={newAddress.state}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                placeholder="Landmark"
                                name="landmark"
                                value={newAddress.landmark}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                placeholder="Zip Code *"
                                name="zipcode"
                                value={newAddress.zipcode}
                                onChange={handleInputChange}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSaveAddress}
                                sx={{ mt: 2 }}
                            >
                                SAVE ADDRESS
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                {/* Submit Button */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        BACK
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}
                        disabled={!selectedAddress}>
                        NEXT
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MuiAddress;