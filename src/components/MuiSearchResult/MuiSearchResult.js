import { Stack } from "@mui/material";
import MuiCard from "../MuiCard/MuiCard.js";
import MuiFilter from "../MuiFilter/MuiFilter.js";
import MuiToggleButtons from "../MuiToggleButtons/MuiToggleButtons.js";
import { useState, useEffect } from "react";
import { useNavigate , useLocation} from 'react-router-dom';

const MuiSearchResult = () => {
  const { state } = useLocation();
  const { product } = state;

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
   //  getProductList();
    // setRefreshKey(prevKey => prevKey + 1);
  };

  // Pass this to the ProductFilter component
  const handleSortChange = (newSortedProducts) => {
    setSortedProducts(newSortedProducts);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    console.log("Category changed to:", category);
    setSelectedCategory(category);

    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
      console.log("Filtered products:", filtered);
      setFilteredProducts(filtered);
    }
  };

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
        setFilteredProducts(data); // Initialize filtered products with all products
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
      navigate('/login'); // Redirect to login if authToken is not found
    }
    console.log("86....product",product);
   //  getProductList();
   setProducts(product);
   setFilteredProducts(product);
    getCategoriesList();
  }, [navigate]);

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
        {/* Pass products and handleSortChange to MuiFilter */}
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

export default MuiSearchResult;