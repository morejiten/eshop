import { pink } from '@mui/material/colors';
import { FormControl, TextField, Button, Link, Stack, Typography } from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const MuiLogin = () => {
  return (<>

    <div className="container">

      <FormControl size="medium"  >

        <Stack alignItems="center" direction="column" spacing={2}>
          <AccountCircleIcon sx={{ color: pink[500] }} fontSize="large"></AccountCircleIcon>
          <Typography variant="h5">Login</Typography>
          <TextField id="emailAddress" label="Email Address" variant="outlined" style={{ width: "100%" }} />
          <TextField id="password" label="Password" variant="outlined" style={{ width: "100%" }} />
          <Button variant="contained" color="primary" fullWidth> Sign In</Button>
          <Link href="#" color="inherit" variant="body2">Don't have an account? Sign up</Link>
        </Stack>

      </FormControl>
    </div>
  </>);
}

export default MuiLogin;