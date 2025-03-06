import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  LinearProgress,
  Card,
  CardContent,
  Divider,
  useTheme,
  Alert,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const results = location.state?.results;

  if (!results) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          No results found. Please take the assessment again.
        </Alert>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/assessment')}
          >
            Take Assessment Again
          </Button>
        </Box>
      </Container>
    );
  }

  const renderPersonalityTrait = (trait, score) => (
    <Grid item xs={12} sm={6} key={trait}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" color="textPrimary">
              {trait}
            </Typography>
            <Typography variant="body2" color="primary">
              {score}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={score}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.palette.grey[200],
              '& .MuiLinearProgress-bar': {
                borderRadius: 4
              }
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );

  const renderCareerCard = (career, index) => (
    <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'primary.light' }}>
      <Typography variant="h6" gutterBottom>
        {career.title}
      </Typography>
      <Typography variant="body1">
        {career.description}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Match Score: {career.matchScore}%
      </Typography>
    </Paper>
  );

  const renderActionItem = (item, index) => (
    <ListItem key={index}>
      <ListItemText primary={item} />
    </ListItem>
  );

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Your Career Assessment Results
          </Typography>

          {/* Personality Profile */}
          {Object.keys(results.personalityTraits).length > 0 && (
            <>
              <Box mb={6}>
                <Typography variant="h5" gutterBottom>
                  Personality Profile
                </Typography>
                <Grid container spacing={3}>
                  {Object.entries(results.personalityTraits).map(([trait, score]) =>
                    renderPersonalityTrait(trait, score)
                  )}
                </Grid>
              </Box>
              <Divider sx={{ my: 4 }} />
            </>
          )}

          {/* Recommended Careers */}
          {results.recommendedCareers.length > 0 && (
            <>
              <Box mb={4}>
                <Typography variant="h5" gutterBottom>
                  Recommended Career Path
                </Typography>
                {results.recommendedCareers.map((career, index) =>
                  renderCareerCard(career, index)
                )}
              </Box>
              <Divider sx={{ my: 4 }} />
            </>
          )}

          {/* College Recommendations */}
          {(results.collegeRecommendations.government.length > 0 ||
            results.collegeRecommendations.private.length > 0 ||
            results.collegeRecommendations.international.length > 0) && (
            <>
              <Box mb={4}>
                <Typography variant="h5" gutterBottom>
                  College Recommendations
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(results.collegeRecommendations).map(([category, colleges]) => (
                    <Grid item xs={12} md={4} key={category}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {category.charAt(0).toUpperCase() + category.slice(1)} Colleges
                        </Typography>
                        <List>
                          {colleges.map((college, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={college.name} secondary={college.location} />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Divider sx={{ my: 4 }} />
            </>
          )}

          {/* Strengths and Development Areas */}
          <Grid container spacing={4}>
            {results.strengths.length > 0 && (
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Your Strengths
                </Typography>
                <List>
                  {results.strengths.map((strength, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={strength} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
            {results.developmentAreas.length > 0 && (
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Areas for Development
                </Typography>
                <List>
                  {results.developmentAreas.map((area, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={area} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
          </Grid>

          {/* Action Items */}
          {results.actionItems.length > 0 && (
            <Box mb={4}>
              <Typography variant="h5" gutterBottom>
                Next Steps
              </Typography>
              <List>
                {results.actionItems.map((item, index) =>
                  renderActionItem(item, index)
                )}
              </List>
            </Box>
          )}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Results; 