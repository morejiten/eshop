import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";

const MuiFilter = ({ products, onSortChange }) => {
  const [sortValue, setSortValue] = useState("default");

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortValue(value);

    console.log("products to filter:", products);

    // Sort the products based on the selected value
    let sortedProducts = [...products];
    switch (value) {
      case "htl": // High to Low
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "lth": // Low to High
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default: // Default or Newest
        sortedProducts = [...products];
    }

    console.log("Sorted products:", sortedProducts);
    onSortChange(sortedProducts); // Pass sorted products to parent
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="sort-label">Sort by:</InputLabel>
      <Select
        labelId="sort-label"
        id="sort-select"
        value={sortValue}
        label="Sort by:"
        onChange={handleSortChange}
      >
        <MenuItem value="default">
          <em>Default</em>
        </MenuItem>
        <MenuItem value="htl">Price: High to Low</MenuItem>
        <MenuItem value="lth">Price: Low to High</MenuItem>
        <MenuItem value="latest">Newest</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MuiFilter;
