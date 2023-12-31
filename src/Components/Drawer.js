import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import customImage from '../imgs/drawericon.png';
import adminpic from '../imgs/adminpic.png';

export default function CustomDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });
  const navigate = useNavigate();  // Initialize useNavigate

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleEditProfileClick = () => {
    console.log('Edit Profile clicked');
  };

  const handleListItemClick = (text) => () => {
    console.log(`${text} clicked`);
    if (text === 'Logout') {
      handleLogoutClick();  // Call handleLogoutClick for the Logout button
    }
    else if(text === 'Drivers') {
      navigate('/drivers');
    } else if (text === 'Monitoring') {
      navigate('/homepage');
    }
    // Add other conditions for different list items
  };

  const handleLogoutClick = () => {
    // Perform any logout logic if needed
    // ...

    // Navigate to the /login route
    navigate('/login');
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250, backgroundColor: '#352555', color: 'white', display: 'flex', flexDirection: 'column' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Section 1: User Information */}
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ flexDirection: 'column', alignItems: 'center' }}>
            {/* Centered Round Picture */}
            <Avatar
              src={adminpic}
              alt="Avatar"
              sx={{
                width: 70,
                height: 70,
                margin: 'auto',
              }}
            >
              <AccountCircleIcon sx={{ width: 50, height: 50 }} />
            </Avatar>
            <ListItemText
              primary="Admin"
              secondary="admin@gmail.com"
              primaryTypographyProps={{
                style: { color: 'white', fontSize: '1rem' }, 
              }}
              secondaryTypographyProps={{
                style: { color: 'gray', fontSize: '0.6rem' },
              }}
              sx={{
                textAlign: 'center',
                fontSize: '0.6rem',
              }}
            />
            <IconButton
              color="inherit"
              sx={{ margin: 'auto', display: 'block', fontSize: '0.6rem', border: '0.5px solid white','&:hover': { backgroundColor: 'white', color:'#352555'} }}
              onClick={handleEditProfileClick}
            >
              Edit Profile <EditIcon />
            </IconButton>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {/* Section 2: Navigation Buttons */}
      <List sx={{ backgroundColor: 'white', color: '#352555' }}>
        {[
          { text: 'Monitoring', icon: <VisibilityIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Monitoring') },
          { text: 'Drivers', icon: <DirectionsBusIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Drivers') },
          { text: 'Assignments', icon: <AssignmentIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Assignments') },
          { text: 'Routes', icon: <MapIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Routes') },
          { text: 'Stations', icon: <LocationOnIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Stations') },
          { text: 'Logout', icon: <ExitToAppIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Logout') },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  //hello
  return (
    <div>
      <IconButton onClick={toggleDrawer('left', true)}>
        <img src={customImage} alt="Drawer" style={{ width: '50px', height: '50px' }} />
      </IconButton>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}
