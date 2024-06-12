import React from 'react';
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
import FeedbackIcon from '@mui/icons-material/Feedback';
// import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import driverIcon from '../assets/drivericon.png'
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BusIcon from '@mui/icons-material/DirectionsBus'

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import customImage from '../assets/drawericon.png';
import adminpic from '../assets/adminpic.png';
import { useAuthContext } from '../hooks/useAuthContext';

const DriverIcon = () => {
  return <img src={driverIcon} alt="Driver" width={20} />
};

export default function CustomDrawer() {

  const { dispatch } = useAuthContext()


  const [state, setState] = React.useState({
    left: false,
  });
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const handleEditProfileClick = () => {
  //   console.log('Edit Profile clicked');
  // };

  const handleListItemClick = (text) => () => {
    console.log(`${text} clicked`);
    if (text === 'Logout') {
      handleLogoutClick();
    } else if (text === 'Drivers') {
      navigate('/drivers');
    } else if (text === 'Monitoring') {
      navigate('/homepage');
    }
    else if (text === 'Buses') {
      navigate('/buses');
    }
    else if (text === 'Stations') {
      navigate('/stations');
    }
    else if (text === 'Assignments') {
      navigate('/assignments');
    }
    // Add other conditions for different list items
    else if (text === "Feedbacks") {
      navigate('/feedbacks')
    }

    else if (text === "Routes") {
      navigate('/routes')
    }
  };

  const handleLogoutClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {

        dispatch({ type: 'LOGOUT', payload: null })

        navigate('/login');
      }
    });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250, backgroundColor: '#352555', color: 'white', display: 'flex', flexDirection: 'column' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ flexDirection: 'column', alignItems: 'center' }}>
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
            {/* <IconButton
              color="inherit"
              sx={{ margin: 'auto', display: 'block', fontSize: '0.6rem', border: '0.5px solid white', '&:hover': { backgroundColor: 'white', color: '#352555' } }}
              onClick={handleEditProfileClick}
            >
              Edit Profile <EditIcon />
            </IconButton> */}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List sx={{ backgroundColor: 'white', color: '#352555' }}>
        {[
          { text: 'Monitoring', icon: <VisibilityIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Monitoring') },
          { text: 'Buses', icon: <BusIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Buses') },
          { text: 'Drivers', icon: <DriverIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Drivers') },
          { text: 'Assignments', icon: <AssignmentIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Assignments') },
          { text: 'Stations', icon: <LocationOnIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Stations') },
          { text: 'Routes', icon: <MapIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Routes') },
          { text: 'Feedbacks', icon: <FeedbackIcon sx={{ color: '#352555' }} />, onClick: handleListItemClick('Feedbacks') },
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
