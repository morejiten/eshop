import {
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MuiCard = ({ name, image, price, description, product }) => {
  const navigate = useNavigate();
  const isUserAdmin = true;

  const handleBuy = async () => {
    try {
      // Replace with actual API URL
      const response = await axios.get(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${product.id}`,
        {
          headers: {
            "x-auth-token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGRlbW8uY29tIiwiaWF0IjoxNzMxOTQyNzk5LCJleHAiOjE3MzE5NTExOTl9.RPExUeGGSCAx2oFXkuwuj_cPLr1PwC-799ejzbWbZRwRba3CeH7EWT-BUHIYt97NFqf2lkp4fHMoc1ak-C2w4A",
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

  return (
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
            <IconButton aria-label="delete product">
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default MuiCard;
