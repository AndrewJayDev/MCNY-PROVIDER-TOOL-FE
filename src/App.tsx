import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from "react";
import ResponsiveAppBar from "./components/AppBar";
import SideBar from "./components/SideBar";
import { Box, Container, createTheme } from "@mui/material";
import Grid from '@mui/material/Grid';
import Body from './pages/Body';
import { useStoreActions, useStoreState } from "easy-peasy";
import {  useNavigate } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';


const theme = createTheme();
function App(props: AppProps) {
  const signedIn = useStoreState((state: boolean) => state.SessionModel.signedIn);
  const setSignedIn = useStoreActions((actions) => actions.SessionModel.setSignedIn);
  const setSession = useStoreActions((actions) => actions.SessionModel.setSession);
  const setGroup = useStoreActions((actions) => actions.SessionModel.setGroupThunk);
  const navigate = useNavigate();

useEffect(() => {
  const checkLocalStorage = async () => {
    try {

       const user = await Auth.currentAuthenticatedUser();
       const payload = {
        username: user.username,
        email: user.attributes.email,
        jwtToken: user.signInUserSession.idToken.jwtToken,
        firstName: user.attributes.given_name,
        lastName: user.attributes.family_name,
        dob: user.attributes.birthdate,
      };
       setSession(payload);
    } catch (error) {
      setSignedIn(false);
      navigate('/login');
    }
  };

  checkLocalStorage();
}, []);



 
  return (
    <>
      <ThemeProvider theme={theme}>
      <Box>
            <Grid container >
                <ResponsiveAppBar />
                <Grid container  direction="row">
                <Grid item xs={4} md={2}>
                    <SideBar />
                </Grid>
                  <Grid item xs={8} md={10}>
                  <Body/>
                  </Grid>
                </Grid>
            </Grid>
           </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
