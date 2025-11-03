// src/pages/Home.tsx
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ paddingBottom: '70px' }}> {/* Add padding for bottom nav */}
      <Typography variant="h4" gutterBottom>
        হোম (Home)
      </Typography>
      {/* We will build here */}
    </Container>
  );
}
