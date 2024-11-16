import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState, useEffect } from "react";

const MuiToggleButtons = ({ categories }) => {
  const [alignment, setAlignment] = useState('all');

  useEffect(() => {
    console.log("MuiToggleButtons - Received categories:", categories);
  }, [categories]);

  const handleChange = (event, newAlignment) => {
    console.log("Toggle button changed to:", newAlignment);
    setAlignment(newAlignment);
  };

  const categoryOptions = ['all', ...(Array.isArray(categories) ? categories : [])];

  console.log("MuiToggleButtons - Available options:", categoryOptions);

  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
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