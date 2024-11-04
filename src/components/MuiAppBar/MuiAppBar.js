import { pink } from '@mui/material/colors';
import { AppBar, Button, InputAdornment, Input, Toolbar, Stack, Typography, Box } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import SearchRounded from '@mui/icons-material/SearchRounded';

const MuiAppBar = () => {

  let isUserAdmin = true;
  let isUserLoggedIn =  true;

  return (<>
    <AppBar position="static">
      <Toolbar>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          upGrad E-Shop
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Stack spacing={4} direction="row">

            <Input
              id="input-with-icon-adornment"
              placeholder='Search...'
              className="globalSearch"
              startAdornment={
                <InputAdornment position="start">
                  <SearchRounded sx={{ color: pink[500] }} />
                </InputAdornment>
              }
            />
<RouteLink to="/home" className="route-link">Home</RouteLink>
           { isUserAdmin && <RouteLink to="/addProduct" className="route-link">Add Product</RouteLink> }
            {  isUserLoggedIn &&  <>
            <RouteLink to="/login" className="route-link">Login</RouteLink>
            <RouteLink to="/signUp" className="route-link">Signup</RouteLink> 
            </> } 
            { isUserLoggedIn &&  
              <Button variant="contained" color="default" sx={{ backgroundColor: pink[500] }} > Logout</Button>
            }
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>

  </>);
}


export default MuiAppBar;