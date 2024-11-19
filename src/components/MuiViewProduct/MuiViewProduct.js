import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Chip,
  Alert,
} from "@mui/material";

const MuiViewProduct = () => {
  const { state } = useLocation();
  const { product } = state;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [error, setError] = useState("");

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    setQuantity(value);
    
    // Validate quantity
    if (value <= 0) {
      setError("Quantity must be greater than 0");
    } else if (value > product.availableItems) {
      setError(`Only ${product.availableItems} items available`);
    } else {
      setError("");
    }
  };

  const handlePlaceOrder = () => {
    // Validate before proceeding
    if (quantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }
    
    if (quantity > product.availableItems) {
      setError(`Only ${product.availableItems} items available`);
      return;
    }

    // Create a new product object with quantity
    const productWithQuantity = {
      ...product,
      quantity: quantity,
      totalPrice: quantity * product.price
    };

    // Navigate to the address page and pass product details as state
    navigate("/address", { state: { product: productWithQuantity } });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ 
              width: "100%",
              maxHeight: "500px",
              objectFit: "contain" 
            }} 
          />
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h5">{product.name}</Typography>
              <Chip
                label={`Available Quantity: ${product.availableItems}`}
                color={product.availableItems > 0 ? "primary" : "error"}
                size="small"
              />
            </Box>
            <Typography variant="body2">Category: {product.category}</Typography>
            <Typography variant="body2">{product.description}</Typography>
            <Typography variant="h5">Price: ₹{product.price}</Typography>
            
            <TextField
              id="quantity"
              label="Quantity"
              variant="outlined"
              type="number"
              fullWidth
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ 
                min: 1, 
                max: product.availableItems,
                step: 1
              }}
              error={!!error}
              helperText={error}
            />

            {/* Show total price when quantity > 1 */}
            {quantity > 1 && !error && (
              <Typography variant="body1" color="primary">
                Total Price: ₹{(quantity * product.price).toFixed(2)}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePlaceOrder}
              disabled={!!error || quantity <= 0 || quantity > product.availableItems}
            >
              Place Order
            </Button>

            {/* Show out of stock message if no items available */}
            {product.availableItems <= 0 && (
              <Alert severity="error">
                This product is currently out of stock
              </Alert>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MuiViewProduct;