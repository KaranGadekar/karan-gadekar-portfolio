export interface Highlight {
  title: string;
  points: string[];
}

/**
 * Highlights are grouped by phase using the project dates in the brief
 * (MicroStrategy Feb–Mar 2026 and Power BI Apr–May 2026 fall in the bootcamp;
 * the Databricks Aug–Sep 2026 and Kafka Sep 2026– POCs fall in the associate role).
 */
export interface Phase {
  title: string;
  period: string;
  dateTime: string;
  current?: boolean;
  summary: string;
  highlights: Highlight[];
}

export const experience = {
  employer: 'InfoCepts',
  role: 'Data Engineer Associate',
  period: 'February 2026 – Present',
  summary:
    'Developing practical experience in business intelligence, enterprise reporting, data validation, and data engineering proof-of-concept development.',
  phases: [
    {
      title: 'Assistant Associate',
      period: 'February 2026 – June 2026',
      dateTime: '2026-02',
      summary: 'Structured training in business intelligence and enterprise reporting.',
      highlights: [
        {
          title: 'MicroStrategy reporting',
          points: [
            'Developed enterprise business intelligence reports and dashboards.',
            'Worked with metrics, prompts, drill-down analysis, and reporting workflows.',
            'Gained experience in report validation and data analysis.',
          ],
        },
        {
          title: 'Power BI dashboard development',
          points: [
            'Built an interactive Power BI dashboard.',
            'Used Power Query for data preparation and transformation.',
            'Developed DAX measures and data models.',
            'Designed reports to support business insights.',
          ],
        },
      ],
    },
    {
      title: 'Associate',
      period: 'July 2026 – Present',
      dateTime: '2026-07',
      current: true,
      summary: 'Data engineering proof-of-concept work on AI-assisted and event-driven workflows.',
      highlights: [
        {
          title: 'Databricks proof of concept',
          points: [
            'Contributed to a proof of concept involving AI-assisted Jira requirement retrieval and validation.',
            'Worked with structured requirement information.',
            'Explored requirement classification and missing-information identification.',
            'Investigated clarification generation and structured validation outputs.',
          ],
        },
        {
          title: 'Kafka and Python proof of concept',
          points: [
            'Working on a Kafka-Python proof of concept for event-driven invoice processing.',
            'Explored producer-consumer connectivity.',
            'Used synthetic invoice data.',
            'Investigated processing workflows and error handling.',
            'Exploring schema-validation approaches.',
          ],
        },
      ],
    },
  ] as Phase[],
  tech: [
    'MicroStrategy',
    'Power BI',
    'SQL Server',
    'SQL',
    'DAX',
    'Power Query',
    'Databricks',
    'Python',
    'Apache Kafka',
    'Aiven',
  ],
};
