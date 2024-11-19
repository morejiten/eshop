import {
  IconButton, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  CardActions, 
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const MuiCard = ({ name, image, price, description, product, onProductDelete  }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem("userRole");
  const isUserAdmin = (userRole?.toLowerCase() === "admin");

  const handleBuy = async () => {
    try {
      // Replace with actual API URL
      const response = await axios.get(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${product.id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      navigate("/viewProduct", { state: { product: response.data } });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleEdit = () => {
    navigate("/editProduct", { state: { product } }); // Pass product data to Edit Product page
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${product.id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      // Optional: Add logic to remove the product from the UI or refresh the product list
      alert("Product deleted successfully");
      console.log("Product deleted successfully");
      setOpenDeleteDialog(false);
      // Optionally navigate or update parent component
      if (onProductDelete) {
        onProductDelete();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345, margin: "auto", border: "1px solid #ddd" }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
          sx={{ objectFit: "contain", padding: 2 }}
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
              ₹ {price}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button size="small" variant="contained" color="primary" onClick={handleBuy}>
            BUY
          </Button>
          {isUserAdmin && (
            <Box>
              <IconButton aria-label="edit product" onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
              </IconButton>
              <IconButton aria-label="delete product" onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </Box>
          )}
        </CardActions>
      </Card>

      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Product
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the product "{name}"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MuiCard;
