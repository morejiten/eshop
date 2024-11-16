import { Stack } from "@mui/material";
import MuiCard from "../MuiCard/MuiCard.js";
import MuiFilter from "../MuiFilter/MuiFilter.js";
import MuiToggleButtons from "../MuiToggleButtons/MuiToggleButtons.js";
import { useState, useEffect } from "react";

const MuiHome = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // API endpoints
  const baseUrl = "http://dev-project-ecommerce.upgrad.dev/api";
  const productApiEndpoint = `${baseUrl}/products`;
  const categoriesApiEndpoint = `${baseUrl}/products/categories`;

  // Separate function to fetch categories
  function getCategoriesList() {
    console.log("Fetching categories from API");
    fetch(categoriesApiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log("Categories API Response:", data);
        setCategories(data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }

  function getProductList() {
    console.log("Fetching products from API");
    fetch(productApiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log("Products API Response:", data);
        setProducts(data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }

  // Fetch both products and categories when component mounts
  useEffect(() => {
    getProductList();
    getCategoriesList();
  }, []);

  // Log state updates
  useEffect(() => {
    console.log("Products state updated:", products);
  }, [products]);

  useEffect(() => {
    console.log("Categories state updated:", categories);
  }, [categories]);

  return (
    <div className="full-container">
      <Stack alignItems="center" direction="column" spacing={20}>
        <MuiToggleButtons categories={categories}></MuiToggleButtons>
      </Stack>
      <Stack alignItems="left" direction="row" spacing={20} sx={{ width: 700 }}>
        <MuiFilter></MuiFilter>
      </Stack>
      <Stack 
        alignItems="center" 
        direction="row" 
        spacing={{ xs: 1, sm: 2 }} 
        sx={{ flexWrap: 'wrap' }}
      >
        {products.map(({ name, imageUrl, description, price }, index) => (
          <MuiCard 
            key={index}
            name={name} 
            image={imageUrl} 
            description={description} 
            price={price} 
          />
        ))}
      </Stack>
    </div>
  );
}

export default MuiHome;