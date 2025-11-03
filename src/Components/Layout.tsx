// src/components/Layout.tsx
import { Outlet, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';
import { useState } from 'react';

export default function Layout() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  return (
    <>
      {/* This is where the current page will be rendered */}
      <Outlet />

      {/* This is the persistent Bottom Navigation Bar */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            // Navigate to the correct page
            if (newValue === 0) navigate('/');
            else if (newValue === 1) navigate('/map');
            else if (newValue === 2) navigate('/help');
            else if (newValue === 3) navigate('/info');
            else if (newValue === 4) navigate('/events');
          }}
        >
          <BottomNavigationAction label="হোম" icon={<HomeIcon />} />
          <BottomNavigationAction label="মানচিত্র" icon={<MapIcon />} />
          <BottomNavigationAction label="সাহায্য" icon={<HealthAndSafetyIcon />} />
          <BottomNavigationAction label="তথ্য" icon={<InfoIcon />} />
          <BottomNavigationAction label="ইভেন্টস" icon={<EventIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
