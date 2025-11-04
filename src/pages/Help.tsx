// src/pages/Help.tsx
import { Container, Typography, Card, CardContent, TextField, Button, Box } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";

// !!! IMPORTANT !!!
// 1. Go to https://formspree.io/ and create a new form.
// 2. It will give you a URL like: https://formspree.io/f/xxxxxxxx
// 3. Paste that URL below to replace 'YOUR_FORMSPREE_URL_HERE'

const FORMSPREE_URL = "https://formspree.io/f/mblpvkea";  

export default function Help() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Container sx={{ paddingBottom: '70px', paddingTop: '20px' }}>
        <Typography variant="h4" gutterBottom>ধন্যবাদ!</Typography>
        <Typography variant="body1">
          আপনার অনুরোধটি জমা হয়েছে। আমাদের পার্টনার NGO থেকে একজন প্রশিক্ষিত ভলান্টিয়ার ৪৮ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগের চেষ্টা করবে (যদি আপনি নম্বর দিয়ে থাকেন)। নম্বর না দিলে, অনুগ্রহ করে অপেক্ষা করুন, আমরা একটি সাধারণ পরামর্শ ইমেইলে পাঠাবো।
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ paddingBottom: '70px', paddingTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        গোপনে সাহায্য চান
      </Typography>

      {/* Riddle Answer: UI/UX signals for trust */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
        <LockIcon sx={{ mr: 1 }} />
        <Typography variant="body2">
          আপনার কোনো তথ্য (নাম, ফোন নম্বর) আমাদের কাছে জমা হবে না। এটি সম্পূর্ণ গোপনীয়। আপনি চাইলে আপনার পরিচয় গোপন রাখতে পারেন।
        </Typography>
      </Box>

      <form action="https://formspree.io/f/mblpvkea" method="POST" onSubmit={() => setSubmitted(true)}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>আপনি কী নিয়ে কথা বলতে চান?</Typography>
            <TextField
              name="message" // 'name' attribute is required for Formspree
              label="আপনার কথা লিখুন..."
              multiline
              rows={6}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <Typography variant="body2" gutterBottom>
              আপনি চাইলে যোগাযোগের জন্য একটি ইমেইল বা ফোন নম্বর দিতে পারেন (ঐচ্ছিক):
            </Typography>
            <TextField
              name="contact" // 'name' attribute
              label="ইমেইল বা ফোন (ঐচ্ছিক)"
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained" fullWidth>
              অনুরোধ জমা দিন
            </Button>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}

