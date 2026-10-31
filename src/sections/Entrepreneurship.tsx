import { Globe, Lightbulb, Store, ExternalLink } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { site } from '../config/site';

const themes = [
  {
    icon: Store,
    title: 'Business Initiative',
    text: 'Building and supporting an independent commercial business venture.',
  },
  {
    icon: Globe,
    title: 'Digital Presence',
    text: 'Using a website and online information to help people discover the business.',
  },
  {
    icon: Lightbulb,
    title: 'Practical Problem-Solving',
    text: 'Exploring ways technology can support business visibility and day-to-day needs.',
  },
];

export function Entrepreneurship() {
  return (
    <section id="entrepreneurship" className="section" aria-labelledby="entre-title">
      <div className="container entre">
        <Reveal className="entre__intro">
          <p className="entre__kicker">Beyond Technology</p>
          <h2 id="entre-title" className="entre__title">
            Entrepreneurship with a Digital Mindset
          </h2>
          <div className="prose">
            <p>
              Alongside my professional technology career, I own Gadekar Market Complex, a commercial business
              initiative in Maharashtra.
            </p>
            <p>
              My focus includes developing its digital presence, improving business visibility, and exploring
              practical ways technology can help local businesses.
            </p>
            <p>
              This experience allows me to think beyond code and consider how digital solutions can support
              real-world business needs.
            </p>
          </div>
          <ButtonLink href={site.gmcUrl} external variant="secondary" icon={<ExternalLink size={18} />}>
            Explore Gadekar Market Complex
          </ButtonLink>
        </Reveal>
        <ul className="entre__themes" role="list">
          {themes.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} className="theme" delay={i * 0.06}>
              <span className="theme__icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <h3 className="theme__title">{title}</h3>
              <p className="theme__text">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
