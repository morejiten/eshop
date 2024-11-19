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

const MuiAddProduct = () => {
  // State variables
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [availableItems, setAvailableItems] = useState(0);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  // API endpoints
  const baseUrl = "https://dev-project-ecommerce.upgrad.dev/api";
  const productApiEndpoint = `${baseUrl}/products`;
  const categoriesApiEndpoint = `${baseUrl}/products/categories`;

  // Fetch categories from API
  function getCategoriesList() {
    console.log("Fetching categories from API");
    fetch(categoriesApiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log("Categories API Response:", data);
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]); // Set empty categories on error
      });
  }

  // Add a new product
  const addProduct = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const newProduct = {
      name: name || "Not Provided",
      category: selectedCategory || "Uncategorized",
      imageUrl: imageUrl || "https://placehold.co/400x400/EEE/31343C",
      description: description || "No description available",
      manufacturer: manufacturer || "Unknown Manufacturer",
      availableItems: parseInt(availableItems) || 0,
      price: parseFloat(price) || 0,
    };

    const token = localStorage.getItem('authToken');

    fetch(productApiEndpoint, {
      method: "POST",
      headers: {
        "x-auth-token": token, // Add the required authentication token
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct), // Send the product data as JSON
    })
      .then((response) => {
        if (response.ok) {
          navigate('/home');
          // return response.json(); // Parse JSON if request was successful
        } else {
          throw new Error("Failed to add product");
        }
      })
      .then((data) => {
        console.log("Product added successfully:", data);
        alert("Product added successfully!");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
      });
      
  };


  // Fetch categories when the component loads
  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <div className="container">
      <FormControl size="medium">
        <form onSubmit={addProduct}>
          <Stack alignItems="center" direction="column" spacing={2}>
            <AccountCircleIcon
              sx={{ color: pink[500] }}
              fontSize="large"
            ></AccountCircleIcon>
            <Typography variant="h5">Add New Product</Typography>

            {/* Product Name */}
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(event) => setName(event.target.value)}
              required
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
                    <MenuItem key={index} value={category.toLowerCase()}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="default">No Categories Available</MenuItem>
                )}
              </Select>
            </FormControl>

            {/* Manufacturer */}
            <TextField
              id="manufacturer"
              label="Manufacturer"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(event) => setManufacturer(event.target.value)}
              required
            />

            {/* Available Items */}
            <TextField
              id="availableItems"
              label="Available Items"
              variant="outlined"
              style={{ width: "100%" }}
              type="number"
              onChange={(event) => setAvailableItems(event.target.value)}
            />

            {/* Price */}
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              style={{ width: "100%" }}
              type="number"
              onChange={(event) => setPrice(event.target.value)}
            />

            {/* Image URL */}
            <TextField
              id="imageUrl"
              label="Image URL"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(event) => setImageUrl(event.target.value)}
            />

            {/* Description */}
            <TextField
              id="description"
              label="Product Description"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(event) => setDescription(event.target.value)}
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Save Product
            </Button>
          </Stack>
        </form>
      </FormControl>
    </div>
  );
};

export default MuiAddProduct;
