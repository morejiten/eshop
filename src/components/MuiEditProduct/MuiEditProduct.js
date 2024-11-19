import { pink } from "@mui/material/colors";
import {
  FormControl,
  TextField,
  Button,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MuiEditProduct = () => {
  const location = useLocation();
  const product = location.state?.product || {}; // Retrieve product data or use an empty object
  const navigate = useNavigate();

  // States for form fields
  const [name, setName] = useState(product.name || "");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(product.category || "");
  const [manufacturer, setManufacturer] = useState(product.manufacturer || "");
  const [availableItems, setAvailableItems] = useState(product.availableItems || 0);
  const [price, setPrice] = useState(product.price || 0);
  const [imageUrl, setImageUrl] = useState(product.imageUrl || "");
  const [description, setDescription] = useState(product.description || "");

  // API endpoints
  const baseUrl = "https://dev-project-ecommerce.upgrad.dev/api";
  const productApiEndpoint = `${baseUrl}/products`;
  const categoriesApiEndpoint = `${productApiEndpoint}/categories`;

  // Fetch categories from API
  const getCategoriesList = async () => {
    console.log("Fetching categories from API");
    try {
      const response = await fetch(categoriesApiEndpoint);
      const data = await response.json();
      console.log("Categories API Response:", data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // Set empty categories on error
    }
  };

  useEffect(() => {
    getCategoriesList();
    if (product) {
      setName(product.name || "");
      setSelectedCategory(product.category || "");
      setManufacturer(product.manufacturer || "");
      setAvailableItems(product.availableItems || 0);
      setPrice(product.price || 0);
      setImageUrl(product.imageUrl || "");
      setDescription(product.description || "");
    }
  }, [product]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    // Ensure all required fields are filled
    if (!name || !selectedCategory || !manufacturer || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    const productId = product.id; // Get product ID from the passed state
    const endpoint = `${productApiEndpoint}/${productId}`;
    const updatedProduct = {
      id: productId,
      name,
      category: selectedCategory,
      price: parseFloat(price), // Ensure price is a number
      description,
      manufacturer,
      availableItems: parseInt(availableItems), // Ensure availableItems is an integer
      imageUrl, // Include imageUrl field in the update
    };

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        // const responseBody = await response.json();
        // console.log("Product updated successfully:", responseBody);
        navigate('/home');
        alert("Product updated successfully!");
      } else {
        const errorMessage = await response.text();
        console.error("Error updating product:", errorMessage);
        alert(`Failed to update product: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error during product update:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <FormControl size="medium">
        <Stack alignItems="center" direction="column" spacing={2}>
          <AccountCircleIcon sx={{ color: pink[500] }} fontSize="large" />
          <Typography variant="h5">Edit/Modify Product</Typography>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            style={{ width: "100%" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* Categories Dropdown */}
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth size="small">
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={selectedCategory}
              label="Category"
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="default">No Categories Available</MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            id="manufacturer"
            label="Manufacturer"
            variant="outlined"
            style={{ width: "100%" }}
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
          <TextField
            id="availableItems"
            label="Available Items"
            variant="outlined"
            style={{ width: "100%" }}
            value={availableItems}
            onChange={(e) => setAvailableItems(e.target.value)}
          />
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            style={{ width: "100%" }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            id="imageUrl"
            label="Image URL"
            variant="outlined"
            style={{ width: "100%" }}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <TextField
            id="description"
            label="Product Description"
            variant="outlined"
            style={{ width: "100%" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Modify Product
          </Button>
        </Stack>
      </FormControl>
    </div>
  );
};

export default MuiEditProduct;
