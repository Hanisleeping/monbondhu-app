// src/pages/Admin.tsx
import { Container, Typography, Card, CardContent, Box, Grid, Button } from "@mui/material";
import { CSVLink } from "react-csv"; // Our CSV export tool

// This is our "Aggregated, Anonymized Data"
const hardcodedStats = {
  totalCheckIns: 450,
  helpRequests: 32,
  mostViewedTopic: "ডেঙ্গু প্রতিরোধ",
};

// This is the fake CSV data for the demo
const csvData = [
  ["region", "help_requests", "most_viewed_topic"],
  ["Dhaka", 18, "ডেঙ্গু"],
  ["Chattogram", 6, "মানসিক চাপ"],
  ["Khulna", 8, "শিশুর টিকা"],
];

export default function Admin() {
  return (
    <Container sx={{ paddingTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        পার্টনার ড্যাশবোর্ড (NGO View)
      </Typography>
      <Typography gutterBottom>
        This is the anonymized data export for partner NGOs (Mission 9).
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">মোট মুড লগ (৭ দিন)</Typography>
              <Typography variant="h3">{hardcodedStats.totalCheckIns}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">মোট সাহায্য অনুরোধ</Typography>
              <Typography variant="h3">{hardcodedStats.helpRequests}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">সর্বাধিক দেখা বিষয়</Typography>
              <Typography variant="h3">{hardcodedStats.mostViewedTopic}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <CSVLink data={csvData} filename={"monbondhu-report.csv"}>
        <Button variant="contained">Download Report (.CSV)</Button>
      </CSVLink>

    </Container>
  );
}
