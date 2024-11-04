import { pink } from '@mui/material/colors';
import { FormControl, TextField, Button, Link, Stack, Typography } from "@mui/material";
import { InputLabel, MenuItem,  Select } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useState} from "react";
const MuiAddProduct = () => {

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

return (<>


    <div className="container">

      <FormControl size="medium"  >
        <Stack alignItems="center" direction="column" spacing={2}>
          <AccountCircleIcon sx={{ color: pink[500] }} fontSize="large"></AccountCircleIcon>
          <Typography variant="h5">Add New Product</Typography>
          <TextField id="name" label="Name" variant="outlined" style={{ width: "100%" }} />
          
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth size="small">
          <InputLabel id="category">Category:</InputLabel>
      <Select
        labelId="category"
        id="category"
        value={age}
        label="Category:"
        onChange={handleChange}
      >
        <MenuItem value="default">
          <em>furniture </em>
        </MenuItem>
        <MenuItem value="apparel">Apparel</MenuItem>
        <MenuItem value="electricals">  Electricals</MenuItem>
        <MenuItem value="personalcare">Personal Care </MenuItem>
        <MenuItem value="furniture">Furniture </MenuItem>
      </Select>
</FormControl>
          <TextField id="manufacturer" label="Manufacturer" variant="outlined" style={{ width: "100%" }} />
          <TextField id="availableItems" label="Available Items" variant="outlined" style={{ width: "100%" }} />
          <TextField id="price" label="Price" variant="outlined" style={{ width: "100%" }} />
          <TextField id="imageUrl" label="Image URL" variant="outlined" style={{ width: "100%" }} />
          <TextField id="description" label="Product Dewscription" variant="outlined" style={{ width: "100%" }} />
          <Button variant="contained" color="primary" fullWidth> Save Product</Button>
          
        </Stack>

      </FormControl>
    </div>
  </>);
}

export default MuiAddProduct;