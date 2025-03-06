FindMyCareer

Overview

FindMyCareer is a web application designed to help Grade 9-12 students identify suitable career paths. The platform provides career recommendations based on a 15-question psychological & scenario-based test, analyzed using predefined datasets. Additionally, it offers guidance on colleges, entrance exams, eligibility criteria, and application processes.

Tech Stack

Frontend:

Next.js for performance optimization

React.js for dynamic UI

React Three Fiber for a 3D interactive background

Tailwind CSS for modern styling

Framer Motion for animations

ShadCN UI for clean components

Backend:

Node.js with Express.js (for API handling)

MongoDB (for user authentication and history storage)

CSV Parsing (to process career recommendations)

Datasets Used:

career_recommendation_dataset.csv → Evaluates test responses to determine career paths.

master_career_dataset.csv → Maps career paths to colleges, locations, rankings, eligibility, entrance exams, and application process.

Features

1️⃣ User Authentication

JWT-based login & registration

User Profiles with test history & saved careers

2️⃣ Career Test

15 psychological & scenario-based questions

Options have weighted scores

Evaluation using career_recommendation_dataset.csv

Final career suggestion displayed dynamically

3️⃣ Career Recommendation System

Uses master_career_dataset.csv

Displays:

Career Summary (Why it was recommended)

Top Colleges & Locations

Entrance Exams & Eligibility

Application Process & Deadlines

4️⃣ Dashboard

User can view past test results

Explore career details

Save preferred careers

5️⃣ Modern UI & Styling

3D Background using React Three Fiber

Dark & Light Mode Toggle

Animated UI with Framer Motion

Tailwind for responsive design

Professional and engaging layout

