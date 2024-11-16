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
import { Link } from "react-router-dom";

const MuiCard = ({ name, image, price, description }) => {
  let isUserAdmin = true;

  return (
    <Card sx={{ maxWidth: 345, margin: "auto", border: "1px solid #ddd" }}>
      {/* Product Image */}
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
        sx={{ objectFit: "contain", padding: 2 }}
      />

      {/* Product Details */}
      <CardContent>
        {/* Name and Price Row */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            ₹ {price}
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {description}
        </Typography>
      </CardContent>

      {/* Actions (Buy and Admin Options) */}
      <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* BUY Button */}
        <Button size="small" variant="contained" color="primary">
          BUY
        </Button>

        {/* Admin Icons */}
        {isUserAdmin && (
          <Box>
            <IconButton aria-label="edit product" component={Link} to="/editProduct">
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
            <IconButton aria-label="delete product" component={Link} to="/deleteProduct">
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default MuiCard;
