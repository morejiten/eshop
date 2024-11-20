import { pink } from "@mui/material/colors";
import { AppBar, Button, InputAdornment, Input, Toolbar, Stack, Typography, Box, IconButton } from "@mui/material";
import { Link as RouteLink, useNavigate, useLocation } from "react-router-dom";

import SearchRounded from "@mui/icons-material/SearchRounded";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";

import './MuiAppBar.css';

const MuiAppBar = () => {
  const [searchProduct, setSearchProduct] = useState("")
  const [products, setProducts] = useState([]);
  const { isUserLoggedIn, isUserAdmin, logout } = useAuth();

  const product = useLocation()?.state?.product;


  const token = localStorage.getItem('authToken');

  const baseUrl = "https://dev-project-ecommerce.upgrad.dev/api";
  const productApiEndpoint = `${baseUrl}/products`;
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    // Remove authToken and role from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

    // Redirect to the login page
    navigate("/login");
  };

  const handleSearchPrductInputChange = (e) => {
    getProductList(e);
    const searchInput = e.target.value;
    setSearchProduct(searchInput);
  
  }


  function getProductList(e) {
    console.log("Fetching products from API");
    fetch(productApiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log("Products API Response:", data);

        // filter the list
        const filteredProducts = data.filter((product) =>
          product.name.toLowerCase().includes(e.target.value.toLowerCase())
        );

        setProducts(filteredProducts);
     })
      .catch(error => {
        console.error("Error fetching products:", error);
        setProducts([]);

      });
  }

  const viewProduct = async (e, prodId) => {
    console.log("prodId00000", prodId);
    try {
      // Replace with actual API URL
      const response = await axios.get(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${prodId}`,
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

  const viewSearchResults = async () => {

    try {
      navigate("/searchResult", { state: { product: products } });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login'); // Redirect to login if authToken is not found
    }
  }, []);





  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
          upGrad E-Shop
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Stack spacing={4} direction="row" alignItems="center">
            {/* Show Home, Search bar, and Add Product for logged-in users */}
            {isUserLoggedIn && (
              <>
                <Input
                  id="input-with-icon-adornment"
                  placeholder="Search..."
                  className="globalSearch"
                  value={searchProduct}
                  onChange={handleSearchPrductInputChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchRounded sx={{ color: pink[500] }} />
                    </InputAdornment>
                  }
                />
                <ul className="quick-search-container">
                  {
                    products.map((product) => {

                      return (<li key={product.id} >
                        <a href="#"

                          onClick={(e) => viewProduct(e, product.id)}
                        >
                          {product.name}
                        </a>
                      </li>
                      )

                    })

                  }
                  <li><a onClick={(e) => viewSearchResults()}>{"view all result - >"}</a> </li>
                </ul>
                <RouteLink to="/home" className="route-link">
                  Home
                </RouteLink>
                {isUserAdmin && (
                  <RouteLink to="/addProduct" className="route-link">
                    Add Product
                  </RouteLink>
                )}
                <Button
                  variant="contained"
                  color="default"
                  sx={{ backgroundColor: pink[500] }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}

            {/* Show Login and Signup for non-logged-in users */}
            {!isUserLoggedIn && (
              <>
                <RouteLink to="/login" className="route-link">
                  Login
                </RouteLink>
                <RouteLink to="/signUp" className="route-link">
                  Signup
                </RouteLink>
              </>
            )}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MuiAppBar;
