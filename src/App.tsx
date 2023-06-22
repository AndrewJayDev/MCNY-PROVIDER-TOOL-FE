import { ThemeProvider } from "@emotion/react";
import React, { useEffect } from "react";
import ResponsiveAppBar from "./components/AppBar";
import SideBar from "./components/SideBar";
import { Box, Container, createTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Body from "./pages/Body";
import { useStoreActions, useStoreState } from "easy-peasy";
import {  useNavigate } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';

interface AppProps {
  bodyComponent: React.FunctionComponent;
}

const theme = createTheme();
function App(props: AppProps) {
  const signedIn = useStoreState((state: boolean) => state.SessionModel.signedIn);
  const setSignedIn = useStoreActions((actions) => actions.SessionModel.setSignedIn);
  const setSession = useStoreActions((actions) => actions.SessionModel.setSession);
  const navigate = useNavigate();

  // useEffect(() => { 

  //   if (!signedIn ) {
  //   navigate('/login');
  // }

// }, [signedIn]);

useEffect(() => {
  const checkLocalStorage = async () => {
    try {
       const user = await Auth.currentAuthenticatedUser();
       const payload = {
        username: user.username,
        email: user.attributes.email,
        jwtToken: user.signInUserSession.accessToken.jwtToken,
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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container xs={12}>
            <ResponsiveAppBar />
            <Grid container xs={12} direction="row">
              <SideBar />
              <Body bodyComponent={props.bodyComponent}/>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
