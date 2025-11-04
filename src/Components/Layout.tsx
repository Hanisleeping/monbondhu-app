// src/components/Layout.tsx
import { Outlet, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper, Fab, Box, Typography, Modal } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';
import MicIcon from '@mui/icons-material/Mic';
import { useState } from 'react';

// Import speech recognition
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// Modal style
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Layout() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(0);
  const [listening, setListening] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  // This is our TTS (Text-to-Speech) function
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD'; // Set to Bangla
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceStart = () => {
    setListening(true);
    setModalOpen(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: 'bn-BD' });
    speak("বলুন, আমি শুনছি।");
  };

  const handleVoiceStop = () => {
    SpeechRecognition.stopListening();
    setListening(false);
    setModalOpen(false);

    // Process the command
    processCommand(transcript);
  };

  // This is the "brain" of our voice assistant
  const processCommand = (command: string) => {
    console.log("Command received:", command);
    resetTranscript();

    // Riddle Answer: Use .includes() for dialect tolerance
    if (command.includes("হোম") || command.includes("বাড়ি")) {
      speak("হোম পেজে যাচ্ছি।");
      navigate('/');
      setNavValue(0);
    } else if (command.includes("মানচিত্র") || command.includes("হাসপাতাল")) {
      speak("হাসপাতালের মানচিত্র খুলছি।");
      navigate('/map');
      setNavValue(1);
    } else if (command.includes("সাহায্য") || command.includes("কথা বলতে")) {
      speak("সাহায্য পেজে যাচ্ছি।");
      navigate('/help');
      setNavValue(2);
    } else if (command.includes("তথ্য") || command.includes("টিকা")) {
      speak("তথ্য পেজে যাচ্ছি।");
      navigate('/info');
      setNavValue(3);
    } else {
      speak("দুঃখিত, আমি বুঝতে পারিনি। আবার চেষ্টা করুন।");
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <Typography>দুঃখিত, আপনার ব্রাউজার ভয়েস কমান্ড সাপোর্ট করে না।</Typography>;
  }

  return (
    <>
      <Outlet />

      {/* --- MISSION 10: Voice Assistant FAB --- */}
      <Fab
        color={listening ? "secondary" : "primary"}
        aria-label="voice assistant"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
        onClick={listening ? handleVoiceStop : handleVoiceStart}
      >
        <MicIcon />
      </Fab>

      {/* Voice Listening Modal */}
      <Modal open={modalOpen} onClose={handleVoiceStop}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">শুনছি...</Typography>
          <Typography sx={{ mt: 2 }}>{transcript || "বলুন..."}</Typography>
          
        </Box>
      </Modal>

      {/* --- Bottom Navigation Bar --- */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={navValue}
          onChange={(event , newValue) => {
            setNavValue(newValue);
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

