import React from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const AIAnalysisLoading = () => {
  const analysisSteps = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: 'Analyzing Personality Traits',
      description: 'Understanding your unique characteristics and behavioral patterns',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'Evaluating Skills & Education',
      description: 'Identifying your academic strengths and learning preferences',
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: 'Matching Career Paths',
      description: 'Finding careers that align with your interests and abilities',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Generating Recommendations',
      description: 'Creating personalized career and education guidance',
    },
  ];

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          
          <Typography variant="h4" gutterBottom>
            AI Analysis in Progress
          </Typography>
          
          <Typography variant="body1" color="textSecondary" paragraph sx={{ mb: 4 }}>
            Our AI is carefully analyzing your responses to provide personalized career recommendations.
            This process typically takes 1-2 minutes.
          </Typography>

          <Box sx={{ width: '100%', mb: 4 }}>
            <LinearProgress variant="indeterminate" />
          </Box>

          <Box sx={{ mt: 4 }}>
            {analysisSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ mr: 2, color: 'primary.main' }}>
                    {step.icon}
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {step.description}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 4 }}>
            Please do not close this window while the analysis is in progress.
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default AIAnalysisLoading; 