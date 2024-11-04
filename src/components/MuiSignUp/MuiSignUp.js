import { pink } from '@mui/material/colors';
import { FormControl, TextField, Button, Link, Stack, Typography } from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const MuiSignUp = () => {
  return (<>



    <div className="container">

      <FormControl size="medium"  >

        <Stack alignItems="center" direction="column" spacing={2}>
          <AccountCircleIcon sx={{ color: pink[500] }} fontSize="large"></AccountCircleIcon>
          <Typography variant="h5">Sign Up </Typography>

          <TextField id="firstName" label="First Name" variant="outlined" size="medium" style={{ width: "100%" }} />
          <TextField id="lastName" label="Last Name" variant="outlined" style={{ width: "100%" }} />
          <TextField id="emailAddress" label="Email Address" variant="outlined" style={{ width: "100%" }} />
          <TextField id="password" label="Password" variant="outlined" style={{ width: "100%" }} />
          <TextField id="confirmPassword" label="Confirmed Password" variant="outlined" style={{ width: "100%" }} />
          <TextField id="contactNumber" label="Contact Number" variant="outlined" style={{ width: "100%" }} />
          <Button variant="contained" color="primary" fullWidth> Sign Up</Button>
          <Link href="#" color="inherit" variant="body2">Already have a account? Sign In</Link>
        </Stack>

      </FormControl>
    </div>
  </>);
}

export default MuiSignUp;