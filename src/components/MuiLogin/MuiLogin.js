import { pink } from "@mui/material/colors";
import axios from "axios";
import {
  FormControl,
  TextField,
  Button,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MuiLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginEndpoint =
      "https://dev-project-ecommerce.upgrad.dev/api/auth/signin";

    const credentials = {
      username: email,
      password: password,
    };

    try {
      const response = await axios.post(loginEndpoint, credentials, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response Data:", response.data);
      console.log("Response Headers:", response.headers);

      const authToken = response.headers["x-auth-token"];
      const userRole = response.data.roles[0]; // Assuming the first role is the primary role

      if (authToken) {
        // Store authToken and userRole in localStorage
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userRole", userRole);

        alert("Login successful!");
        navigate("/home");
      } else {
        setError("Authentication token not found.");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="container">
      <FormControl size="medium">
        <form onSubmit={handleLogin}>
          <Stack alignItems="center" direction="column" spacing={2}>
            <AccountCircleIcon sx={{ color: pink[500] }} fontSize="large" />
            <Typography variant="h5">Login</Typography>

            <TextField
              id="emailAddress"
              label="Email Address"
              variant="outlined"
              style={{ width: "100%" }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              style={{ width: "100%" }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign In
            </Button>

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Link
              href="#"
              color="inherit"
              variant="body2"
              onClick={() => navigate("/signup")}
              style={{ cursor: "pointer" }}
            >
              Don't have an account? Sign up
            </Link>
          </Stack>
        </form>
      </FormControl>
    </div>
  );
};

export default MuiLogin;
