import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect } from "react";

const MuiToggleButtons = ({ categories, selectedCategory = 'all', onCategoryChange }) => {
  useEffect(() => {
    console.log("MuiToggleButtons - Received categories:", categories);
  }, [categories]);

  const handleChange = (event, newCategory) => {
    // Prevent deselection of all buttons
    if (newCategory !== null) {
      console.log("Toggle button changed to:", newCategory);
      onCategoryChange(newCategory);
    }
  };

  const categoryOptions = ['all', ...(Array.isArray(categories) ? categories : [])];

  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={selectedCategory}
      exclusive
      onChange={handleChange}
      aria-label="Product Categories"
    >
      {categoryOptions.map((category, index) => (
        <ToggleButton 
          key={index} 
          value={category.toLowerCase()}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default MuiToggleButtons;