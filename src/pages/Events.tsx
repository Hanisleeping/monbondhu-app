// src/pages/Events.tsx
import { Container, Typography, Card, CardContent, Box } from "@mui/material";
import eventsData from '../data/events.json';

export default function Events() {
  return (
    <Container sx={{ paddingBottom: '70px', paddingTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        কমিউনিটি ইভেন্টস
      </Typography>

      <Box>
        {eventsData.map(event => (
          <Card key={event.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography variant="body2"><b>তারিখ:</b> {event.date}</Typography>
              <Typography variant="body2"><b>স্থান:</b> {event.location}</Typography>
              <Typography variant="body2"><b>আয়োজক:</b> {event.organizer}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

