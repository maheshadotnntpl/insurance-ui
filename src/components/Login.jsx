import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../utils/auth'
import AccountService from '../services/AccountService';
import { ToasterType } from "../utils/ToasterType";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import Toast from "../utils/toasterUtil";

const defaultTheme = createTheme();

export const Login = () => {

  const [user, setUser] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [loginError, setLoginError] = useState([]);

  const redirectPath = location.state?.path || '/calculate-premium'

  useEffect(() => {
    if (user) {
      auth.login(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginError([]);
    const data = new FormData(event.currentTarget);
    if (data.get('username') !== '' && data.get('password') !== '') {
      AccountService.Authenticate(data)
        .then((response) => {
          if (response.data.statusCode === HttpStatusCode.OK) {
            setUser(response.data.object.token);
            localStorage.setItem("token", response.data.object.token);
            navigate(redirectPath, { replace: true });
          }
          else {
            Toast(response.data.Message, ToasterType.ERROR);
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          Toast(error, ToasterType.ERROR);
        });
    }
    else {
      let errorArray = [];
      if (data.get('username') === '') {
        errorArray.push('username');
      }
      if (data.get('password') === '') {
        errorArray.push('password');
      }
      setLoginError(errorArray);
      Toast('User Name/Password can not be empty', ToasterType.ERROR);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => setUser(e.target.value)}
              error={loginError.includes("username")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={loginError.includes("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
