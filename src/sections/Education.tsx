import { BookOpen, ExternalLink, GraduationCap } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { courses, degree } from '../data/skills';

/**
 * Education (degree only) plus Courses & Training.
 * Keep the "Courses & Training" heading until certification status is verified.
 */
export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading id="education-title" title="Education" />
        <div className="edu-layout">
          <Reveal as="article" className="degree">
            <span className="degree__icon" aria-hidden="true">
              <GraduationCap size={22} />
            </span>
            <div className="degree__body">
              <h3 className="degree__title">{degree.title}</h3>
              <p className="degree__inst">
                {degree.institution}
                <span className="degree__loc">, {degree.location}</span>
              </p>
              <dl className="degree__facts">
                <div>
                  <dt>Graduated</dt>
                  <dd>{degree.year}</dd>
                </div>
                <div>
                  <dt>CGPA</dt>
                  <dd>{degree.cgpa}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal className="courses-block" delay={0.06}>
            <h3 className="courses-block__title" id="courses">
              Courses &amp; Training
            </h3>
            <ul className="courses" role="list">
              {courses.map((c) => (
                <li key={c.title} className="course">
                  <span className="course__icon" aria-hidden="true">
                    <BookOpen size={16} />
                  </span>
                  <div>
                    <p className="course__title">
                      {c.url ? (
                        <a href={c.url} target="_blank" rel="noopener noreferrer">
                          {c.title}
                          <ExternalLink size={14} aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        c.title
                      )}
                    </p>
                    {c.provider && <p className="course__provider">{c.provider}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
