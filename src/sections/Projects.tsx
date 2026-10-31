import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { projects } from '../data/projects';

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          title="Selected Projects"
          subtitle="Training projects and technical proof-of-concept experience."
        />
        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={(i % 2) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
