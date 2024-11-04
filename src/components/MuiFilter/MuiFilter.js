import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";
const MuiFilter = () => {

  const [age, setAge] = useState('latest');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (<>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Sort by:</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Sort by:"
        onChange={handleChange}
      >
        <MenuItem value="default">
          <em>Newest</em>
        </MenuItem>
        <MenuItem value="htl">Price: High to Low</MenuItem>
        <MenuItem value="lth">  Price: Low to Hight</MenuItem>
        <MenuItem value="latest">Newest</MenuItem>
      </Select>
    </FormControl>
  </>);
}

export default MuiFilter;