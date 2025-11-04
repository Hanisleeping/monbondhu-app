// src/pages/Map.tsx
import { Container, Typography, ToggleButton, ToggleButtonGroup, Box, Card, CardContent } from "@mui/material";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Import our "databases"
import facilities from '../data/facilities.json';
import chwData from '../data/chw.json';

export default function Map() {
  const [view, setView] = useState('map'); // 'map' or 'list'

  return (
    <Container sx={{ paddingBottom: '70px', paddingTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        সাহায্যের ঠিকানা
      </Typography>

      {/* This is the 2G Fallback Toggle (Hablu's Reality Check) */}
      <ToggleButtonGroup
        color="primary"
        value={view}
        exclusive
        onChange={(e, newView) => { if (newView) setView(newView); }}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="map">মানচিত্র দেখুন</ToggleButton>
        <ToggleButton value="list">তালিকা দেখুন</ToggleButton>
      </ToggleButtonGroup>

      {/* --- MISSION 2: Community Health Map --- */}
      {view === 'map' && (
        <Box sx={{ height: '400px', width: '100%', mb: 3 }}>
          <MapContainer center={[23.8103, 90.4125]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {facilities.map(facility => (
              <Marker key={facility.id} position={[facility.lat, facility.lng]}>
                <Popup>
                  <b>{facility.name}</b><br />
                  {facility.type}<br />
                  সেবা: {facility.services.join(', ')}<br />
                  {/* Riddle Answer: Show transport info */}
                  যাতায়াত: {facility.transport}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      )}

      {/* --- MISSION 8: Volunteer Health Worker Directory (List View) --- */}
      {view === 'list' && (
        <Box>
          <Typography variant="h5" gutterBottom>ক্লিনিক ও হাসপাতাল</Typography>
          {facilities.map(facility => (
            <Card key={facility.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{facility.name}</Typography>
                <Typography variant="body2">{facility.type}</Typography>
                <Typography variant="body2">সেবা: {facility.services.join(', ')}</Typography>
                <Typography variant="body2">যাতায়াত: {facility.transport}</Typography>
              </CardContent>
            </Card>
          ))}

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            কমিউনিটি স্বাস্থ্যকর্মী
          </Typography>
          {chwData.map(chw => (
            <Card key={chw.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{chw.name} {chw.verified && '✅'}</Typography>
                <Typography variant="body2">গ্রাম: {chw.village}</Typography>
                <Typography variant="body2">দক্ষতা: {chw.skills.join(', ')}</Typography>
                <Button variant="contained" size="small" href={`tel:${chw.phone}`} sx={{ mt: 1 }}>
                  কল করুন
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}

