import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { TagList } from '../components/TagList';
import { experience } from '../data/experience';

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          title="Professional Experience"
          subtitle="My professional journey in data and analytics."
        />

        <Reveal as="article" className="xp">
          <header className="xp__head">
            <div>
              <h3 className="xp__role">{experience.role}</h3>
              <p className="xp__employer">{experience.employer}</p>
            </div>
            <p className="xp__period">
              <time dateTime="2026-02">February 2026</time> – Present
            </p>
          </header>
          <p className="xp__summary">{experience.summary}</p>

          <ol className="timeline" role="list" aria-label="Progression at InfoCepts">
            {experience.phases.map((phase) => (
              <li key={phase.title} className={`tl ${phase.current ? 'tl--current' : ''}`}>
                <span className="tl__node" aria-hidden="true" />
                <div className="tl__body">
                  <div className="tl__head">
                    <h4 className="tl__title">{phase.title}</h4>
                    <p className="tl__period">
                      <time dateTime={phase.dateTime}>{phase.period}</time>
                    </p>
                    {phase.current && <span className="badge badge--current">Current</span>}
                  </div>
                  <p className="tl__summary">{phase.summary}</p>
                  <div className="tl__grid">
                    {phase.highlights.map((h) => (
                      <div key={h.title} className="xp-item">
                        <h5 className="xp-item__title">{h.title}</h5>
                        <ul className="bullets" role="list">
                          {h.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <footer className="xp__foot">
            <TagList items={experience.tech} label="Technologies used at InfoCepts" />
            <p className="xp__note">
              Company work is described at a high level. No internal data, code or screenshots are shared.
            </p>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
