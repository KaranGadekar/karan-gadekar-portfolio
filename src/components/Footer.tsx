import { useEffect, useState } from 'react';
import { site } from '../config/site';
import { navLinks } from './Navbar';

export function Footer() {
  // Build-time year in prerendered HTML, refreshed in the browser so it never goes stale.
  const [year, setYear] = useState<number>(__BUILD_YEAR__);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const external = [
    { href: site.gmcUrl, label: 'Gadekar Market Complex' },
    ...(site.linkedinUrl ? [{ href: site.linkedinUrl, label: 'LinkedIn' }] : []),
    ...(site.githubUrl ? [{ href: site.githubUrl, label: 'GitHub' }] : []),
  ];

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">{site.name}</p>
          <p className="footer__headline">
            {site.headline.split(' | ').map((part, i, arr) => (
              <span key={part}>
                {part}
                {i < arr.length - 1 ? ' |' : ''}
              </span>
            ))}
          </p>
        </div>

        <nav aria-label="Footer" className="footer__nav">
          <ul role="list" className="footer__links">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`}>{l.label}</a>
              </li>
            ))}
          </ul>
          <ul role="list" className="footer__links footer__links--ext">
            {external.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container footer__bottom">
        <p>© {year} Karan Gadekar. All rights reserved.</p>
        <p>Personal portfolio. Not affiliated with or endorsed by any employer.</p>
      </div>
    </footer>
  );
}
