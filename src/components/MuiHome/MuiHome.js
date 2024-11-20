import { Stack } from "@mui/material";
import MuiCard from "../MuiCard/MuiCard.js";
import MuiFilter from "../MuiFilter/MuiFilter.js";
import MuiToggleButtons from "../MuiToggleButtons/MuiToggleButtons.js";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const MuiHome = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortedProducts, setSortedProducts] = useState(products);

  const navigate = useNavigate();

  const baseUrl = "https://dev-project-ecommerce.upgrad.dev/api";
  const productApiEndpoint = `${baseUrl}/products`;
  const categoriesApiEndpoint = `${baseUrl}/products/categories`;

  const handleProductDelete = () => {
    getProductList();
  };

  const handleSortChange = (newSortedProducts) => {
    setSortedProducts(newSortedProducts);
  };

  const handleCategoryChange = (category) => {
    console.log("Category changed to:", category);
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  function getCategoriesList() {
    fetch(categoriesApiEndpoint)
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }

  function getProductList() {
    fetch(productApiEndpoint)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      });
  }

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
    }
    getProductList();
    getCategoriesList();
  }, [navigate]);

  useEffect(() => {
    console.log("Filtering products based on search term:", searchTerm);  // Log searchTerm
    if (searchTerm) {
      const searchFiltered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(searchFiltered);
    } else {
      setFilteredProducts(products);  // Reset to all products if searchTerm is empty
    }
  }, [searchTerm, products]);

  return (
    <div className="full-container">
      <Stack alignItems="center" direction="column" spacing={20}>
        <MuiToggleButtons
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Stack>
      <Stack alignItems="left" direction="row" spacing={20} sx={{ width: 700 }}>
        <MuiFilter products={filteredProducts} onSortChange={setFilteredProducts} />
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        spacing={{ xs: 1, sm: 2 }}
        sx={{ flexWrap: "wrap" }}
      >
        {filteredProducts.map(({ name, imageUrl, description, price }, index) => (
          <MuiCard
            key={index}
            name={name}
            image={imageUrl}
            description={description}
            price={price}
            product={filteredProducts[index]}
            onProductDelete={handleProductDelete}
          />
        ))}
      </Stack>
    </div>
  );
}

export default MuiHome;
