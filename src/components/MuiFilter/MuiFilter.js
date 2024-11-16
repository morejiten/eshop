import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";
const MuiFilter = (products, onSortChange) => {

  const [sortValue, setSortValue] = useState('default');

  const handleSortChange = (event) => {
    const value = event.target.value; // Extract the value from the event
    setSortValue(value);
  
    console.log("products to filter:", products);
    let sortedProducts = [...products.products];
  
    console.log("sorting type: ", value);
    switch (value) {
      case 'htl':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'lth':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        // Keep original order for 'default' and 'latest'
        sortedProducts = [...products.products];
    }
  
    products.onSortChange(sortedProducts);
  };

  return (<>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Sort by:</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sortValue}
        label="Sort by:"
        onChange={handleSortChange}
      >
        <MenuItem value="default"><em>Default</em></MenuItem>
        <MenuItem value="htl">Price: High to Low</MenuItem>
        <MenuItem value="lth">  Price: Low to Hight</MenuItem>
        <MenuItem value="latest">Newest</MenuItem>
      </Select>
    </FormControl>
  </>);
}

export default MuiFilter;