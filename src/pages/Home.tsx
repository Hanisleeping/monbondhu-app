// src/pages/Home.tsx
import { Container, Typography, Card, CardContent, Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import tipsData from '../data/tips.json'; // Import our "database"

// Define the structure of a mood log
type MoodLog = {
  date: string;
  mood: string;
};

// Helper function to get seasonal tips
const getSeasonalTip = () => {
  const month = new Date().getMonth(); // 0-11
  if (month >= 5 && month <= 8) return tipsData.monsoon[0]; // Monsoon
  if (month >= 11 || month <= 1) return tipsData.winter[0]; // Winter
  return tipsData.summer[0]; // Summer
};

export default function Home() {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  // Load logs from localStorage when the app starts
  useEffect(() => {
    const storedLogs = localStorage.getItem('monBondhu-moodLogs');
    if (storedLogs) {
      setMoodLogs(JSON.parse(storedLogs));
    }
  }, []);

  // Function to handle mood selection
  const handleMoodClick = (mood: string) => {
    const newLog: MoodLog = { date: new Date().toISOString(), mood: mood };
    const updatedLogs = [...moodLogs, newLog];

    setMoodLogs(updatedLogs);
    // Save to device storage (localStorage) - This is our "privacy-first" feature
    localStorage.setItem('monBondhu-moodLogs', JSON.stringify(updatedLogs));
  };

  // Riddle Answer: Gentle nudge
  const lastLogDate = moodLogs.length > 0 ? new Date(moodLogs[moodLogs.length - 1].date) : null;
  let greeting = "আজ আপনার মন কেমন?";
  if (lastLogDate && (new Date().getTime() - lastLogDate.getTime()) > 3 * 24 * 60 * 60 * 1000) {
    greeting = "অনেকদিন পর আসলেন! আজ কেমন লাগছে?";
  }

  return (
    <Container sx={{ paddingBottom: '70px', paddingTop: '20px' }}>
      {/* --- MISSION 1: Mental Health Check-In --- */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {greeting}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="space-around">
            <Button variant="outlined" onClick={() => handleMoodClick('খুব ভালো')}>😄</Button>
            <Button variant="outlined" onClick={() => handleMoodClick('ভালো')}>😊</Button>
            <Button variant="outlined" onClick={() => handleMoodClick('মোটামুটি')}>😐</Button>
            <Button variant="outlined" onClick={() => handleMoodClick('মন খারাপ')}>😞</Button>
            <Button variant="outlined" onClick={() => handleMoodClick('খুব চিন্তা')}>😭</Button>
          </Stack>
        </CardContent>
      </Card>

      {/* --- MISSION 4: Seasonal Preventive Health Tips --- */}
      <Card sx={{ mb: 3, backgroundColor: '#e0f7fa' }}>
        <CardContent>
          <Typography variant="h6">আজকের স্বাস্থ্য বার্তা</Typography>
          <Typography variant="body1">
            {getSeasonalTip()}
          </Typography>
        </CardContent>
      </Card>

      {/* --- Mood Log Viewer --- */}
      <Button onClick={() => setShowLogs(!showLogs)}>
        {showLogs ? 'লগ লুকিয়ে রাখুন' : 'আমার মুড লগ দেখুন'}
      </Button>
      {showLogs && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">আপনার মুড লগ</Typography>
          {moodLogs.map((log) => (
            <Typography key={log.date}>
              {new Date(log.date).toLocaleDateString('bn-BD')}: {log.mood}
            </Typography>
          ))}
        </Box>
      )}
    </Container>
  );
}
