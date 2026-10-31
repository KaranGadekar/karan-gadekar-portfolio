export type ProjectLabel = 'Training Project' | 'Professional POC' | 'In Progress';

export interface Project {
  id: string;
  title: string;
  category: string;
  type: string;
  role?: string;
  period: string;
  label: ProjectLabel;
  tech: string[];
  description: string;
  contributions: string[];
  /** Illustrative workflow drawn on the card: built only from facts in the description. */
  flow: string[];
}

export const projects: Project[] = [
  {
    id: 'adventureworks',
    flow: ['AdventureWorks DW', 'MicroStrategy', '6 reports + dashboard'],
    title: 'Enterprise BI Reporting: AdventureWorks DW',
    category: 'Business Intelligence',
    type: 'Training Project',
    role: 'BI Developer',
    period: 'February 2026 – March 2026',
    label: 'Training Project',
    tech: ['MicroStrategy', 'SQL Server', 'SQL'],
    description:
      'Developed business intelligence reports and an interactive dashboard using the AdventureWorks data warehouse to explore retail, sales, and inventory information.',
    contributions: [
      'Built six reports and one interactive dashboard.',
      'Worked with metrics, prompts, and thresholds.',
      'Implemented drill-down and hierarchy-based analysis.',
      'Explored year-over-year comparisons, Top-N analysis, and inventory share reporting.',
      'Validated report outputs against SQL Server queries.',
      'Examined data relationships and grain-level considerations.',
    ],
  },
  {
    id: 'netflix',
    flow: ['Power Query', 'DAX measures', '4-page report'],
    title: 'Netflix Analytics Dashboard',
    category: 'Business Intelligence',
    type: 'Training Project',
    role: 'BI Developer',
    period: 'April 2026 – May 2026',
    label: 'Training Project',
    tech: ['Power BI', 'DAX', 'Power Query'],
    description:
      'Created an interactive Power BI dashboard to explore Netflix content across global and India-focused views.',
    contributions: [
      'Cleaned and transformed data using Power Query.',
      'Developed DAX measures for total content, movies, and TV shows.',
      'Designed a four-page report: Home, Global, India, and About.',
      'Implemented slicers, bookmarks, and visual interactions.',
      'Applied consistent dashboard formatting and layout practices.',
    ],
  },
  {
    id: 'requirement-validation',
    flow: ['Jira requirements', 'LLM validation', 'Structured output'],
    title: 'AI-Assisted Requirement Validation',
    category: 'Data Engineering / AI-Assisted Workflows',
    type: 'Professional Proof of Concept',
    period: 'August 2026 – September 2026',
    label: 'Professional POC',
    tech: ['Databricks', 'Python', 'Jira', 'Large Language Models'],
    description:
      'Contributed to a proof of concept exploring AI-assisted requirement retrieval, validation, and classification workflows.',
    contributions: [
      'Worked with workflows for retrieving requirement information.',
      'Explored validation of requirement completeness.',
      'Investigated identifying missing information and generating clarification questions.',
      'Worked with structured validation outputs.',
    ],
  },
  {
    id: 'invoice-processing',
    flow: ['Producer', 'Kafka topic', 'Consumer'],
    title: 'Event-Driven Invoice Processing',
    category: 'Data Engineering / Event-Driven Processing',
    type: 'Professional Proof of Concept',
    period: 'September 2026 – Present',
    label: 'In Progress',
    tech: ['Apache Kafka', 'Python', 'Aiven'],
    description:
      'Developing a proof of concept to explore event-driven invoice processing using Kafka, Python, and synthetic data.',
    contributions: [
      'Configured producer and consumer connectivity.',
      'Worked with publishing and consuming synthetic invoice messages.',
      'Explored event processing through a Kafka topic.',
      'Investigated processing workflows and error handling.',
      'Exploring schema validation and Schema Registry integration.',
    ],
  },
];
