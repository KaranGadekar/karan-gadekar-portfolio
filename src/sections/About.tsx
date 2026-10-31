import { ChartColumn, Store, Workflow } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const focus = [
  {
    icon: ChartColumn,
    title: 'Data and Analytics',
    text: 'Enterprise reporting, dashboards, data modeling, and analytical solutions.',
  },
  {
    icon: Workflow,
    title: 'Data Engineering',
    text: 'Proofs of concept involving Databricks, Python, Kafka, and event-driven processing.',
  },
  {
    icon: Store,
    title: 'Entrepreneurship',
    text: 'Developing the digital presence and business visibility of Gadekar Market Complex.',
  },
];

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" title="About Me" subtitle="Technology, data, and entrepreneurship." />
        <div className="about__grid">
          <Reveal className="about__text prose">
            <p>
              I'm an Information Technology graduate with a professional focus on data engineering, business
              intelligence, and analytics.
            </p>
            <p>
              Outside my day job, I own Gadekar Market Complex and look after its digital presence. I enjoy
              combining technology, analytical thinking, and practical problem-solving to create useful solutions.
            </p>
            <p>
              My goal is to keep strengthening my technical foundation, contribute to meaningful data-driven
              projects, and explore how technology can create practical value for businesses.
            </p>
          </Reveal>
          <ul className="about__focus" role="list">
            {focus.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} className="focus-item" delay={i * 0.06}>
                <span className="focus-item__icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="focus-item__title">{title}</h3>
                  <p className="focus-item__text">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
