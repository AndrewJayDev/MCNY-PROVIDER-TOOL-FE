import  React , { useState } from 'react';
import { Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Alert, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Auth } from 'aws-amplify';

interface IChangePasswordProps {
  changePassword: (changePassword: boolean) => void;
}

const LoginComponent: React.FunctionComponent<IChangePasswordProps > = ( props : IChangePasswordProps ) => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<boolean>(false); 
  const [errorMsg, setErrorMsg] = useState<string>("");
  const navigate = useNavigate();
  const handleChangePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Auth.signIn(username, currentPassword)
  .then((user) => {
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
      console.log(requiredAttributes);
      Auth.completeNewPassword(
        user, // the Cognito User Object
        newPassword, // the new password
        requiredAttributes// the required attributes fields
      )
        .then((user) => {
          // at this time the user is logged in if no MFA required
          console.log(user);
         navigate('/');
        })
        .catch((e) => {
          setError(true);
          setErrorMsg(e.message);
        });
    } else {
      // other situations
    }
  })
  .catch((e) => {
    console.log(e);
  });
  };
  return (
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
      Change Password
    </Typography>
    <Box component="form" onSubmit={handleChangePasswordSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="current-password"
        label="Current Password"
        type="password"
        id="current-password"
        autoComplete="current-password"
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="new-password"
        label="New Password"
        type="password"
        id="new-password"
        autoComplete="new-password"
        onChange={(e) => setNewPassword(e.target.value)}
        // Add onChange handler to capture the new password
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Change Password
      </Button>
      <Grid container>
        <Grid item xs>
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
      <Stack sx={{ width: "100%" }} spacing={2}>
          {error && <Alert severity="error">{errorMsg}</Alert>}
        </Stack>
    </Box>
  </Box>

  );
};

export default LoginComponent;
