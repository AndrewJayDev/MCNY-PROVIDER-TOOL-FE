import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {MdArticle} from 'react-icons/md';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useStoreActions, useStore } from '../config/store';
import { useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

const pages = ['Requests'];


function ResponsiveAppBar() {

  const setSignedIn = useStoreActions((actions) => actions.SessionModel.setSignedIn);
  const getCurrentUser = useStoreActions((actions) => actions.SessionModel.getCurrentSessionThunk);
  const session = useStoreState((state: any) => state.SessionModel.session);
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  function handleBtnClick(event: MouseEvent<HTMLLIElement, MouseEvent>): void {
    let nav : string = event.currentTarget.innerText;
    nav = nav.toLowerCase();
    if(location.pathname !== '/'+nav)
      navigate(nav);
  };

  async function signOut() {
    try {
      await Auth.signOut();
      setSignedIn(false);
      navigate('/login');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const handleHomeClick = () => {
    navigate('/');
  };


useEffect(() => {
  
  getCurrentUser().then((res: any) => {
    setFirstName(res.attributes.given_name);
    setLastName(res.attributes.family_name);
  }).catch((err: any) => {
    console.log(err)
  });
}, []);



  return (
    <AppBar position="static" sx={{backgroundColor: '#002D72', }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
            onClick={handleHomeClick}
          >
            
            MyMCNY
          </Typography>

        
        
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleBtnClick}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button variant="contained" onClick={handleOpenUserMenu} sx={{ p: 1, color: "white" }}>
                <Typography> {lastName}, {firstName} </Typography>
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
          
                <MenuItem onClick={signOut}>
                  <Typography textAlign="center" >Logout</Typography>
                </MenuItem>
         
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
