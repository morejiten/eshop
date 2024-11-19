import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Stepper,
    Step,
    StepLabel,
    Paper,
    Divider,
} from '@mui/material';

const MuiConfirmOrder = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { product, addressDetails } = state;
    const token = localStorage.getItem('authToken');

    const handlePlaceOrder = async () => {
        try {
            console.log("placing order for product:", product);
            console.log("placing order with address:", addressDetails);
            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/orders', {
                method: 'POST',
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantity: product.quantity || 1,
                    product: product.id,
                    address: addressDetails.id,
                }),
            });
            
            if (response.ok) {
                alert("Order placed successfully!")
                navigate('/home');
            } else {
                throw new Error('Order placement failed');
            }
        } catch (error) {
            console.error("Error placing order:", error);
            // Handle error appropriately
        }
    };

    return (
        <Box sx={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
            <Stepper activeStep={2} alternativeLabel>
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

            <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Shoes
                </Typography>
                <Typography variant="body1">
                    Quantity: {product.quantity || 1}
                </Typography>
                <Typography variant="body1">
                    Category: {product.category || 'Footwear'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {product.description}
                </Typography>
                <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                    Total Price: ₹ {product.price*product.quantity || 1000}
                </Typography>
            </Paper>

            <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Address Details:
                </Typography>
                <Typography variant="body1">{addressDetails.name}</Typography>
                <Typography variant="body1">
                    Contact Number: {addressDetails.contact}
                </Typography>
                <Typography variant="body1">{addressDetails.street}</Typography>
                <Typography variant="body1">{addressDetails.city}</Typography>
                <Typography variant="body1">{addressDetails.state}</Typography>
                {addressDetails.landmark && (
                    <Typography variant="body1">{addressDetails.landmark}</Typography>
                )}
                <Typography variant="body1">{addressDetails.zip}</Typography>
            </Paper>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                >
                    BACK
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePlaceOrder}
                >
                    PLACE ORDER
                </Button>
            </Box>
        </Box>
    );
};

export default MuiConfirmOrder;