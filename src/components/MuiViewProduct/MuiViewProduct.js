import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Chip,
} from "@mui/material";

const MuiViewProduct = () => {
  const { state } = useLocation();
  const { product } = state;
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Navigate to the address page and pass product details as state
    navigate("/address", { state: { product } });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <img src={product.imageUrl} alt={product.name} style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h5">{product.name}</Typography>
              <Chip
                label={`Available Quantity: ${product.availableItems}`}
                color="primary"
                size="small"
              />
            </Box>
            <Typography variant="body2">Category: {product.category}</Typography>
            <Typography variant="body2">{product.description}</Typography>
            <Typography variant="h5">Price: ₹{product.price}</Typography>
            <TextField id="quantity" label="Quantity" variant="outlined" fullWidth />
            <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MuiViewProduct;
