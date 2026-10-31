import { CalendarRange } from 'lucide-react';
import type { Project } from '../data/projects';
import { Reveal } from './Reveal';
import { TagList } from './TagList';

const labelClass: Record<Project['label'], string> = {
  'Training Project': 'badge--training',
  'Professional POC': 'badge--poc',
  'In Progress': 'badge--progress',
};

const flowClass: Record<Project['label'], string> = {
  'Training Project': 'flow--bi',
  'Professional POC': 'flow--de',
  'In Progress': 'flow--de',
};

export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <Reveal as="article" className="project" delay={delay}>
      <div className="project__top">
        <span className={`badge ${labelClass[project.label]}`}>{project.label}</span>
        <span className="project__period">
          <CalendarRange size={14} aria-hidden="true" />
          {project.period}
        </span>
      </div>

      <div className="project__heading">
        <h3 className="project__title">{project.title}</h3>
        <p className="project__category">
          {project.category}
          {project.role && <span className="project__role">Role: {project.role}</span>}
        </p>
      </div>

      {/* Illustrative workflow, built from the project description (not a screenshot) */}
      <ol className={`flow ${flowClass[project.label]}`} role="list" aria-label="Workflow">
        {project.flow.map((step, i) => (
          <li key={step} className="flow__step">
            {i > 0 && <span className="flow__arrow" aria-hidden="true" />}
            <span className="flow__node">{step}</span>
          </li>
        ))}
      </ol>

      <p className="project__desc">{project.description}</p>

      <TagList items={project.tech} label={`Technologies for ${project.title}`} className="project__tags" />

      <details className="project__details">
        <summary>
          Key contributions <span className="project__count">({project.contributions.length})</span>
        </summary>
        <ul className="bullets" role="list">
          {project.contributions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </details>
    </Reveal>
  );
}
