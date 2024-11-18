import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const MuiViewProduct = () => {
  const { state } = useLocation();
  const { product } = state;

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <img src={product.imageUrl} alt={product.name} style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Typography variant="h5">{product.name}</Typography>
            <Typography variant="body2">Category: {product.category}</Typography>
            <Typography variant="body2">{product.description}</Typography>
            <Typography variant="h5">Price: ₹{product.price}</Typography>
            <TextField id="quantity" label="Quantity" variant="outlined" fullWidth />
            <Button variant="contained" color="primary" fullWidth>
              Place Order
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MuiViewProduct;
