export interface SkillGroup {
  title: string;
  skills: string[];
}

/** Ordered by relevance to a data engineering / BI career: the first two are the core groups. */
export const skillGroups: SkillGroup[] = [
  {
    title: 'Business Intelligence',
    skills: [
      'Power BI',
      'MicroStrategy Developer',
      'MicroStrategy Web',
      'DAX',
      'Power Query',
      'Data Modeling',
      'Data Visualization',
      'Dashboard Development',
      'Enterprise Reporting',
    ],
  },
  {
    title: 'Data Engineering',
    skills: [
      'Databricks',
      'Apache Kafka',
      'Event-Driven Processing',
      'Data Validation',
      'Proof-of-Concept Development',
      'Data Processing Workflows',
    ],
  },
  { title: 'Languages and Databases', skills: ['SQL', 'Python', 'SQL Server'] },
  { title: 'Cloud and Platforms', skills: ['Power BI Service', 'Databricks', 'Aiven'] },
  {
    title: 'Professional Practices',
    skills: [
      'Requirement Validation',
      'Documentation',
      'Test Cases',
      'Data Quality',
      'Report Validation',
      'Analytical Problem-Solving',
    ],
  },
];

/**
 * Courses. Add `url` only for a real, working certificate or course link.
 * Rename the section heading to "Courses & Certifications" in
 * src/sections/Education.tsx once certification status is verified.
 */
export const courses: { title: string; provider?: string; url?: string }[] = [
  { title: 'Power BI Course', provider: 'Udemy' },
  { title: 'MicroStrategy: Basic Reporting' },
  { title: 'MicroStrategy: Advanced Reporting' },
];

export const degree = {
  title: 'Bachelor of Technology, Information Technology',
  institution: 'G H Raisoni College of Engineering and Management',
  location: 'Wagholi, Pune',
  cgpa: '8.84/10',
  year: '2026',
};
