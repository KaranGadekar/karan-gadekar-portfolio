import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { GitHubIcon, LinkedInIcon } from '../components/BrandIcons';
import { ContactForm } from '../components/ContactForm';
import { Reveal } from '../components/Reveal';
import { site } from '../config/site';

interface Method {
  icon: ReactNode;
  label: string;
  value: string;
  action: string;
  href: string;
  newTab?: boolean;
}

const methods: Method[] = [
  { icon: <Mail size={20} />, label: 'Email', value: site.email, action: 'Send an email', href: `mailto:${site.email}` },
  { icon: <Phone size={20} />, label: 'Call', value: site.phoneDisplay, action: 'Call', href: site.phoneHref },
  {
    icon: <MessageCircle size={20} />,
    label: 'WhatsApp',
    value: site.phoneDisplay,
    action: 'Open chat',
    href: site.whatsappHref,
    newTab: true,
  },
];

function ContactMethods() {
  return (
    <div className="methods-wrap">
      <ul className="methods" role="list" aria-label="Contact options">
        {methods.map((m) => (
          <li key={m.label}>
            <a
              className="method"
              href={m.href}
              {...(m.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="method__icon" aria-hidden="true">
                {m.icon}
              </span>
              <span className="method__text">
                <span className="method__label">{m.label}</span>
                <span className="method__value">{m.value}</span>
              </span>
              <span className="method__action" aria-hidden="true">
                {m.action}
                <ArrowUpRight size={16} />
              </span>
              {m.newTab && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
      <p className="contact__hint">WhatsApp opens with a short draft message. Nothing is sent until you press send.</p>
    </div>
  );
}

export function Contact() {
  // The form column appears only when Formspree is configured (or in local development).
  const hasForm = Boolean(site.formspreeId) || import.meta.env.DEV;

  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className={`container contact ${hasForm ? 'contact--form' : ''}`}>
        <Reveal className="contact__intro">
          <p className="contact__kicker">Let's Connect</p>
          <h2 id="contact-title" className="contact__title">
            Have an opportunity or an idea to discuss?
          </h2>
          <p className="contact__lead">
            Whether you're a recruiter, a fellow technology professional, a business owner, or someone interested
            in data and digital solutions, I'd be happy to hear from you.
          </p>
          <p className="contact__home">
            <span>Hometown</span> {site.hometown}
          </p>

          {(site.linkedinUrl || site.githubUrl) && (
            <ul className="socials" role="list" aria-label="Profiles">
              {site.linkedinUrl && (
                <li>
                  <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer me" className="social">
                    <LinkedInIcon />
                    <span>LinkedIn</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
              {site.githubUrl && (
                <li>
                  <a href={site.githubUrl} target="_blank" rel="noopener noreferrer me" className="social">
                    <GitHubIcon />
                    <span>GitHub</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          )}

          {hasForm && <ContactMethods />}
        </Reveal>

        <Reveal className="contact__side" delay={0.08}>
          {hasForm ? <ContactForm /> : <ContactMethods />}
        </Reveal>
      </div>
    </section>
  );
}
