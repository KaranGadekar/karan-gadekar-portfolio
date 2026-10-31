import { Briefcase, Mail, Store } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ButtonLink } from '../components/Button';
import { site, type SiteImage } from '../config/site';

const roles = ['Data Engineer Associate', 'Developer', 'Entrepreneur'];

function Monogram() {
  return (
    <div className="portrait__monogram" role="img" aria-label="Karan Gadekar monogram">
      <span aria-hidden="true">KG</span>
    </div>
  );
}

/** Real photo from public/images. Falls back to the monogram if the file is missing. */
function PortraitPhoto({ photo }: { photo: SiteImage }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Catches a load error that happened before React hydrated the prerendered <img>.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <Monogram />;
  return (
    <img
      ref={ref}
      className="portrait__img"
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt="Karan Gadekar, Data Engineer Associate"
      fetchPriority="high"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

/**
 * Hero entrance is pure CSS (staggered opacity/transform keyframes), so it plays
 * straight from the prerendered HTML without waiting for JavaScript. That keeps
 * the largest paint fast. All other motion uses Motion for React.
 */
export function Hero() {
  const photo = site.profilePhoto;
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__intro enter" style={{ ['--i' as string]: 0 }}>
            Hello, I'm
          </p>
          <h1 id="hero-title" className="hero__name enter" style={{ ['--i' as string]: 1 }}>
            Karan Gadekar
          </h1>
          <p className="hero__roles enter" style={{ ['--i' as string]: 2 }}>
            {roles.map((r, i) => (
              <span key={r} className="hero__role">
                {i > 0 && (
                  <span className="hero__sep" aria-hidden="true">
                    |
                  </span>
                )}
                {i > 0 && <span className="sr-only">, </span>}
                {r}
              </span>
            ))}
          </p>
          <p className="hero__tagline enter" style={{ ['--i' as string]: 3 }}>
            {site.tagline}
          </p>
          <p className="hero__desc enter" style={{ ['--i' as string]: 3 }}>
  I'm a Data Engineer Associate at InfoCepts with experience in business intelligence, enterprise
  reporting, and data engineering proof of concepts. Alongside my professional career, I own{' '}
  <a
    href="https://gadekarmarketcomplex.app/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#4817da',
      fontWeight: 600,
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
      textDecorationThickness: '1px',
      transition: 'color 0.2s ease',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.color = '#C4B5FD')}
    onMouseLeave={(e) => (e.currentTarget.style.color = '#A78BFA')}
    aria-label="Visit Gadekar Market Complex website"
  >
    Gadekar Market Complex
  </a>
  , where I combine entrepreneurship with my interest in practical digital solutions.
</p>

          <div className="hero__ctas enter" style={{ ['--i' as string]: 4 }}>
            <ButtonLink href="#experience" icon={<Briefcase size={18} />}>
              Explore My Experience
            </ButtonLink>
            <ButtonLink href="#gmc" variant="secondary" icon={<Store size={18} />}>
              View My Project
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" icon={<Mail size={18} />}>
              Contact Me
            </ButtonLink>
          </div>

        </div>

        <div className="hero__visual enter enter--late" style={{ ['--i' as string]: 4 }}>
          <figure className="portrait">
            <span className="portrait__corner portrait__corner--tl" aria-hidden="true" />
            <span className="portrait__corner portrait__corner--tr" aria-hidden="true" />
            <span className="portrait__corner portrait__corner--bl" aria-hidden="true" />
            <span className="portrait__corner portrait__corner--br" aria-hidden="true" />
            {photo ? <PortraitPhoto photo={photo} /> : <Monogram />}
            <figcaption className="portrait__caption">
              <span className="portrait__caption-name">Karan Gadekar</span>
              <span className="portrait__caption-role">Data Engineer Associate at InfoCepts</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
