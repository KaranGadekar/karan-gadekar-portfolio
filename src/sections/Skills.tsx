import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { TagList } from '../components/TagList';
import { skillGroups } from '../data/skills';

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" title="Technical Skills" subtitle="Technologies and tools I work with." />
        <div className="skills__grid">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} className={`skill-group ${i < 2 ? 'skill-group--major' : ''}`} delay={i < 2 ? i * 0.05 : (i - 2) * 0.05}>
              <h3 className="skill-group__title">{g.title}</h3>
              <TagList items={g.skills} label={g.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
