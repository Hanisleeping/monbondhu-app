// src/pages/Info.tsx
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Card, CardContent, TextField, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from "react";
import { addWeeks } from 'date-fns';

// EPI Schedule (Simplified)
const epiSchedule = [
  { week: 0, vaccine: "BCG, OPV 0" },
  { week: 6, vaccine: "Penta 1, OPV 1" },
  { week: 10, vaccine: "Penta 2, OPV 2" },
  { week: 14, vaccine: "Penta 3, OPV 3" },
  { week: 39, vaccine: "MR 1" },
];

export default function Info() {
  const [childDob, setChildDob] = useState<Date | null>(null);
  const [nextVaccine, setNextVaccine] = useState<string | null>(null);

  // Load saved DOB from storage
  useEffect(() => {
    const savedDob = localStorage.getItem('monBondhu-childDob');
    if (savedDob) {
      setChildDob(new Date(savedDob));
    }
  }, []);

  // Calculate next vaccine when DOB changes
  useEffect(() => {
    if (childDob) {
      const today = new Date();
      for (const item of epiSchedule) {
        const vaccineDate = addWeeks(childDob, item.week);
        if (vaccineDate > today) {
          setNextVaccine(`${item.vaccine} (তারিখ: ${vaccineDate.toLocaleDateString('bn-BD')})`);
          break;
        }
      }
      if (!nextVaccine) setNextVaccine("সকল টিকা সম্পন্ন হয়েছে।");
    }
  }, [childDob]); // Re-run when childDob changes

  const handleDateChange = (newDate: Date | null) => {
    setChildDob(newDate);
    if (newDate) {
      localStorage.setItem('monBondhu-childDob', newDate.toISOString());
    } else {
      localStorage.removeItem('monBondhu-childDob');
    }
  };


  return (
    <Container sx={{ paddingBottom: '70px', paddingTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        স্বাস্থ্য তথ্য
      </Typography>

      {/* --- MISSION 5: Maternal & Child Health Tracker --- */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>শিশুর টিকার সময়সূচী</Typography>
          <Typography variant="body2" gutterBottom>
            আপনার শিশুর জন্মদিন সিলেক্ট করুন। অ্যাপ আপনাকে পরবর্তী টিকার তারিখ মনে করিয়ে দেবে।
          </Typography>
          <DatePicker
            label="শিশুর জন্মদিন"
            value={childDob}
            onChange={handleDateChange}
            sx={{ width: '100%' }}
          />
          {nextVaccine && (
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              পরবর্তী টিকা: {nextVaccine}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* --- MISSION 6: Symptom Awareness Guide --- */}
      <Typography variant="h5" gutterBottom>সতর্কতা ও লক্ষণ</Typography>
      <Typography variant="body2" color="error" gutterBottom>
        এটি কোনো চিকিৎসা পরামর্শ নয়। জরুরী অবস্থায় ডাক্তার দেখান।
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>ডায়রিয়া</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            যদি ৩ দিনের বেশি পাতলা পায়খানা হয়, মলের সাথে রক্ত যায়, বা শরীর খুব দুর্বল লাগে, তবে সাথে সাথে ডাক্তার দেখান। প্রতিবার পায়খানার পর ওরস্যালাইন খান।
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>বুকের ব্যথা</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            বুকের ব্যথাকে অবহেলা করবেন না। এটি হার্ট অ্যাটাকের লক্ষণ হতে পারে। দ্রুত হাসপাতালে যান।
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>মানসিক চাপ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            টানা ২ সপ্তাহ বা তার বেশি সময় যদি মন খুব খারাপ থাকে, কোনো কিছুতে আনন্দ না পান, বা ঘুমাতে সমস্যা হয়, তবে এটি ডিপ্রেশন হতে পারে। 'সাহায্য' বাটন চেপে কথা বলুন। এটি কোনো দুর্বলতা নয়।
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
