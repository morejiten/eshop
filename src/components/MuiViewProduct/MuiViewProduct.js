import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

const MuiViewProduct = ({name}) => {
  
  const currSessionProduct =JSON.parse(sessionStorage.getItem("currentProduct"))  || {};
  
   const { state:inwardState = "" } = useLocation();
   
  let  myProduct   = useLocation().state?.product ?? JSON.parse(sessionStorage.getItem("currentProduct")); // conditional 

  

  const navigate = useNavigate();
  const [one, setOne] = useState({});

  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [error, setError] = useState("");

if( myProduct === undefined){
  
  const currProduct =JSON.parse(sessionStorage.getItem("currentProduct")) ;
  myProduct =  currProduct;
  window.location.reload();
  
  }

  
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    setQuantity(value);
    
    // Validate quantity
    if (value <= 0) {
      setError("Quantity must be greater than 0");
    } else if (value > myProduct.availableItems) {
      setError(`Only ${myProduct.availableItems} items available`);
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
    
    if (quantity > myProduct.availableItems) {
      setError(`Only ${myProduct.availableItems} items available`);
      return;
    }

    // Create a new product object with quantity
    const productWithQuantity = {
      ...myProduct,
      quantity: quantity,
      totalPrice: quantity * myProduct.price
    };

    // Navigate to the address page and pass product details as state
    navigate("/address", { state: { myProduct: productWithQuantity } });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <img 
            src={myProduct?.imageUrl} 
            alt={myProduct.name} 
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
              <Typography variant="h5">{myProduct.name}</Typography>
              <Chip
                label={`Available Quantity: ${myProduct.availableItems}`}
                color={myProduct.availableItems > 0 ? "primary" : "error"}
                size="small"
              />
            </Box>
            <Typography variant="body2">Category: {myProduct.category}</Typography>
            <Typography variant="body2">{myProduct.description}</Typography>
            <Typography variant="h5">Price: ₹{myProduct.price}</Typography>
            
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
                max: myProduct.availableItems,
                step: 1
              }}
              error={!!error}
              helperText={error}
            />

            {/* Show total price when quantity > 1 */}
            {quantity > 1 && !error && (
              <Typography variant="body1" color="primary">
                Total Price: ₹{(quantity * myProduct.price).toFixed(2)}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePlaceOrder}
              disabled={!!error || quantity <= 0 || quantity > myProduct.availableItems}
            >
              Place Order
            </Button>

            {/* Show out of stock message if no items available */}
            {myProduct.availableItems <= 0 && (
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