// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Import our layout and pages
import Layout from './components/Layout';
import Home from './pages/Home';
import Map from './pages/Map';
import Help from './pages/Help';
import Info from './pages/Info';
import Events from './pages/Events';
import Admin from './pages/Admin';

// A simple theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#006a4e', // Bangladesh Green
    },
    secondary: {
      main: '#f42a41', // Bangladesh Red
    },
  },
});

// Define our app's routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // The Layout component wraps all our pages
    children: [
      { path: '/', element: <Home /> },
      { path: '/map', element: <Map /> },
      { path: '/help', element: <Help /> },
      { path: '/info', element: <Info /> },
      { path: '/events', element: <Events /> },
    ],
  },
  {
    path: '/admin', // Our secret partner page
    element: <Admin />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline /> {/* Fixes common CSS issues */}
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
