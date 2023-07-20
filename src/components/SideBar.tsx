import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, List, ListItem, ListItemButton  } from "@mui/material"

import { useStoreState } from 'easy-peasy';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const group = useStoreState((state: any) => state.SessionModel.group);
  const [sidebar, setSidebar] = useState<string[]>([]);
  const routes = {"New Pay Request": "/new-request", "Pay Request History": "/request-history"}
const adminSidebar: string[] =['Pay Requests', 'Clinicians'];
const clinicianSidebar: string[] =['New Pay Request', 'Pay Request History'];
//mobile sidebar


useEffect(() => {
  if (group === 'admin') {
    setSidebar(adminSidebar);
  } else {
    setSidebar(clinicianSidebar);
  }
}, [group]);

  return (
    <Box
      component="nav"
      sx={{
        width: '100%',
        minHeight: '100vh',
        marginRight: '3em',
        backgroundColor: '#002D72'
      }}
      aria-label="sidebar"
    >
   
      <List
      sx={{  display:'flex',
      flexDirection:'column',}}
      >
        {sidebar.map((text, index) => (
            <ListItemButton divider key={text} focusRipple >
              <NavLink style={{color:'#ffffff', fontFamily:'monospace', fontSize: '1.1em'}}   key={text} to={routes[text]}>{text}</NavLink>
            </ListItemButton>
            ))}
      </List>
      
    </Box>
  );
};

export default Sidebar;

