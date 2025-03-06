import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';

const CollegeRecommendations = ({ recommendations }) => {
  const theme = useTheme();

  const renderCollegeCard = (college) => {
    return (
      <Card 
        key={college.name}
        sx={{ 
          mb: 2,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: theme.shadows[4]
          }
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" component="h3">
              {college.name}
            </Typography>
            <Chip
              icon={<SchoolIcon />}
              label={college.type.charAt(0).toUpperCase() + college.type.slice(1)}
              color={
                college.type === 'government' ? 'primary' :
                college.type === 'private' ? 'secondary' : 'info'
              }
              size="small"
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box mb={2}>
                <Typography variant="subtitle2" color="textSecondary">
                  <PublicIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Location
                </Typography>
                <Typography variant="body2">{college.country}</Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="subtitle2" color="textSecondary">
                  <EmojiEventsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Rankings
                </Typography>
                <Typography variant="body2">
                  {college.ranking.india && `India: #${college.ranking.india}`}
                  {college.ranking.india && college.ranking.global && ' | '}
                  {college.ranking.global && `Global: #${college.ranking.global}`}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="subtitle2" color="textSecondary">
                  <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Career Paths
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {college.careers.map((career, index) => (
                    <Chip
                      key={index}
                      label={career}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Available Courses
              </Typography>
              <List dense>
                {college.courses.map((course, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={course.name}
                        secondary={`${course.duration} | ${course.description}`}
                      />
                    </ListItem>
                    {index < college.courses.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </Grid>

          <Box mt={2}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Eligibility & Exams
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {college.eligibility.map((req, index) => (
                <Chip
                  key={index}
                  label={req}
                  size="small"
                  color="default"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderCollegeSection = (title, colleges) => {
    if (!colleges || colleges.length === 0) return null;

    return (
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {colleges.map(renderCollegeCard)}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        College Recommendations
      </Typography>
      
      {renderCollegeSection('Top Government Colleges', recommendations.government)}
      {renderCollegeSection('Leading Private Institutions', recommendations.private)}
      {renderCollegeSection('International Universities', recommendations.international)}
      
      {(!recommendations.government?.length && 
        !recommendations.private?.length && 
        !recommendations.international?.length) && (
        <Typography variant="body1" color="textSecondary" align="center">
          No college recommendations available for the selected career path.
        </Typography>
      )}
    </Box>
  );
};

export default CollegeRecommendations; 