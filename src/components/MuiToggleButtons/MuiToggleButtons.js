
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
const MuiToggleButtons = () => {

  const [alignment, setAlignment] = useState('all');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };


  return (<>

    <ToggleButtonGroup
      size="small"
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="apparel">Apparel</ToggleButton>
      <ToggleButton value="electronics">Electronics</ToggleButton>
      <ToggleButton value="personalCare">Personal Care</ToggleButton>
    </ToggleButtonGroup>
  </>);
}

export default MuiToggleButtons;