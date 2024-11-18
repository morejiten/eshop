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

const MuiCard = ({ name, image, price, description, product }) => {
  const navigate = useNavigate();
  const isUserAdmin = true;

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
        <Button size="small" variant="contained" color="primary">
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
