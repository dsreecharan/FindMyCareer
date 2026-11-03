import { MASTER_CAREERS } from './careers';

export const CAREER_RECOMMENDATION_CSV = `min_score,max_score,primary_category,recommended_careers,target_traits
50,60,"Engineering & Technology","AI & Machine Learning Engineer, Robotics Engineer, Cybersecurity Architect, Aerospace Engineer","Analytical Curiosity, Mathematical Rigor, Systems Thinking"
40,49,"Creative & Design","UI/UX Product Designer, Architect & Sustainable Urban Designer, Game Director & 3D Artist","Spatial Imagination, Aesthetic Empathy, Visual Storytelling"
30,39,"Business & Management","Investment Banker, Strategy Consultant, Technology Product Manager","Commercial Strategy, Executive Communication, High Ambition"
15,29,"Social & Psychology","Clinical Psychologist, International Diplomat, Epidemiologist & Public Health","Human Empathy, Active Listening, Social Justice & Welfare"`;

export function generateMasterCareerCSV(): string {
  const headers = [
    'career_id',
    'title',
    'category',
    'score_range',
    'summary',
    'grade_11_12_stream',
    'starting_salary',
    'mid_career_salary',
    'growth_rate',
    'top_entrance_exams',
    'min_grade12_eligibility',
    'top_colleges'
  ];

  const rows = MASTER_CAREERS.map(c => [
    `"${c.id}"`,
    `"${c.title}"`,
    `"${c.category}"`,
    `"${c.scoreRange}"`,
    `"${c.summary.replace(/"/g, '""')}"`,
    `"${c.educationPath.grade11_12_stream.replace(/"/g, '""')}"`,
    `"${c.jobOutlook.startingSalary}"`,
    `"${c.jobOutlook.midCareerSalary}"`,
    `"${c.jobOutlook.growthRate}"`,
    `"${c.entranceExams.join(', ')}"`,
    `"${c.eligibilityCriteria.minGrade12Percentage.replace(/"/g, '""')}"`,
    `"${c.topColleges.map(col => col.name).join(' | ').replace(/"/g, '""')}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
