import React, { useEffect, useState } from "react";
import { useStore, useStoreActions } from "../config/store";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Container,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import ChangePassword from "../components/ChangePassword";
import { Auth } from "aws-amplify";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MCNY Provider Portal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default function Login() {
  const setSession = useStoreActions(
    (actions) => actions.SessionModel.setSession
  );
  const setSignedIn = useStoreActions(
    (actions) => actions.SessionModel.setSignedIn
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false); 
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const navigate = useNavigate();
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await Auth.signIn(username, password);
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        setChangePassword(true);
      } else {
        const payload = {
          username: user.username,
          email: user.attributes.email,
          jwtToken: user.signInUserSession.idToken.jwtToken,
          firstName: user.attributes.given_name,
          lastName: user.attributes.family_name,
          dob: user.attributes.birthdate,
        };
        setError(false);
        setSession(payload);
        setSignedIn(true);
        navigate("/");
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log("error signing in", error.message);
    }
  };

  useEffect(() => {
  if(errorMsg !== "")
    setError(true);
  }, [errorMsg]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {changePassword ? (
          <ChangePassword changePassword={changePassword}/>
        ) : (
          <LoginComponent
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        )}
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Stack sx={{ width: "100%" }} spacing={2}>
          {error && <Alert severity="error">{errorMsg}</Alert>}
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

