import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

const ConsentForm = ({ onConsent }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      onConsent();
    }
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Welcome to FindMyCareer Assessment
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mt: 3 }}>
            Before you begin the assessment, please read and understand the following information:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Purpose"
                secondary="This assessment helps us understand your personality traits, skills, interests, and values to provide personalized career recommendations."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Duration"
                secondary="The assessment typically takes 10-15 minutes to complete. You can take your time to answer each question thoughtfully."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Confidentiality"
                secondary="Your responses are confidential and will only be used to generate your career recommendations. We do not share your data with third parties."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="AI Analysis"
                secondary="Your responses will be analyzed by our AI system to provide personalized career recommendations and educational guidance."
              />
            </ListItem>
          </List>

          <Box sx={{ mt: 4 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  color="primary"
                  size="large"
                />
              }
              label={
                <Typography variant="body1">
                  I understand and agree to proceed with the assessment
                </Typography>
              }
            />
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleAccept}
              disabled={!accepted}
              sx={{ minWidth: 200 }}
            >
              Begin Assessment
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ConsentForm; 