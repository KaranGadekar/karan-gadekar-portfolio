import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { ExternalLink, Images, Lock, Phone, Store } from 'lucide-react';
import { useId, useState } from 'react';
import { ButtonLink } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { TagList } from '../components/TagList';
import { site } from '../config/site';

const gmcTech = ['HTML5', 'CSS3', 'JavaScript', 'Netlify'];

export function FeaturedProject() {
  const shots = site.gmcScreenshots;
  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryId = useId();
  const reduce = useReducedMotion();
  const domain = site.gmcUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <section id="gmc" className="section section--feature" aria-labelledby="gmc-section-title">
      <div className="container">
        <SectionHeading id="gmc-section-title" title="Featured Personal Project" />

        <Reveal as="article" className="feature">
          <div className="feature__copy">
            <p className="feature__kicker">Personal Business Website</p>
            <h3 className="feature__title" id="gmc-title">
              Gadekar Market Complex
            </h3>
            <p className="feature__subtitle">Building a digital presence for a local business.</p>
            <p>
              Designed and developed an independent website for Gadekar Market Complex to establish its digital
              presence and help visitors discover the commercial property and associated business information.
            </p>
            <dl className="feature__facts">
              <div>
                <dt>Purpose</dt>
                <dd>Give the business a digital presence and make its information easy to find.</dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>Owner of the business, and designer and developer of its website.</dd>
              </div>
              <div>
                <dt>What I built</dt>
                <dd>An independent website presenting the commercial property and associated business information.</dd>
              </div>
            </dl>
            <p className="feature__support">
              This project combines my interest in web development with my entrepreneurial initiative to improve
              business visibility and make local business information easier to discover.
            </p>
            <TagList items={gmcTech} label="Technologies for the Gadekar Market Complex website" />
            <div className="feature__ctas">
              <ButtonLink href={site.gmcUrl} external icon={<ExternalLink size={18} />}>
                Visit Live Website
              </ButtonLink>
              {site.gmcContactHref && (
                <ButtonLink href={site.gmcContactHref} variant="secondary" icon={<Phone size={18} />}>
                  Contact GMC
                </ButtonLink>
              )}
              {shots.length > 0 && (
                <button
                  type="button"
                  className="btn btn--ghost"
                  aria-expanded={galleryOpen}
                  aria-controls={galleryId}
                  onClick={() => setGalleryOpen((o) => !o)}
                >
                  <span className="btn__icon" aria-hidden="true">
                    <Images size={18} />
                  </span>
                  <span>{galleryOpen ? 'Hide Website Screenshots' : 'View Website Screenshots'}</span>
                </button>
              )}
            </div>
          </div>

          <a
            className="site-card"
            href={site.gmcUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${domain} in a new tab`}
          >
            <span className="site-card__bar" aria-hidden="true">
              <span className="site-card__dots">
                <i />
                <i />
                <i />
              </span>
              <span className="site-card__url">
                <Lock size={12} />
                {domain}
              </span>
            </span>
            {shots[0] ? (
              <img
                className="site-card__shot"
                src={shots[0].src}
                alt={shots[0].alt}
                width={shots[0].width}
                height={shots[0].height}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="site-card__body" aria-hidden="true">
                <span className="site-card__icon">
                  <Store size={30} />
                </span>
                <span className="site-card__name">Gadekar Market Complex</span>
                <span className="site-card__hint">
                  Open the live site
                  <ExternalLink size={14} />
                </span>
              </span>
            )}
          </a>
        </Reveal>

        <AnimatePresence initial={false}>
          {shots.length > 0 && galleryOpen && (
            <m.div
              id={galleryId}
              className="gallery"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            >
              <ul className="gallery__list" role="list" aria-label="Gadekar Market Complex website screenshots">
                {shots.map((s) => (
                  <li key={s.src}>
                    <a
                      className={`gallery__item ${s.height > s.width ? 'gallery__item--tall' : ''}`}
                      href={site.gmcUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="gallery__frame">
                        <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async" />
                      </span>
                      <span className="gallery__caption">
                        Screenshot of {domain}
                        <span className="sr-only"> (opens the live website in a new tab)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
