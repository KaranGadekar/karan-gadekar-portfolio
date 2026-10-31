import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

/** Sections whose visibility maps to a nav item (GMC & entrepreneurship count as Projects). */
const sectionToNav: Record<string, string> = {
  about: 'about',
  experience: 'experience',
  projects: 'projects',
  skills: 'skills',
  gmc: 'projects',
  entrepreneurship: 'projects',
  education: 'education',
  contact: 'contact',
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Solid background once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section highlighting.
  useEffect(() => {
    const ids = Object.keys(sectionToNav);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length || !('IntersectionObserver' in window)) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        });
        // Pick the topmost visible section in document order.
        const current = ids.find((id) => visible.has(id));
        setActive(current ? sectionToNav[current] : '');
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Escape closes; clicking outside closes; growing to desktop closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) close();
    };
    const mq = window.matchMedia('(min-width: 900px)');
    const onMq = () => mq.matches && close();
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      mq.removeEventListener('change', onMq);
    };
  }, [open, close]);

  return (
    <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
      <nav className="nav__inner container" aria-label="Primary">
        <a href="#top" className="nav__brand" onClick={() => close()}>
          <span className="nav__mark" aria-hidden="true">
            KG
          </span>
          <span className="nav__name">Karan Gadekar</span>
        </a>

        <ul className="nav__links" role="list">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`nav__link ${active === l.id ? 'is-active' : ''}`}
                aria-current={active === l.id ? 'location' : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn--primary btn--sm nav__cta">
          Let's Connect
        </a>

        <button
          ref={buttonRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            className="nav__panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="nav__panel-links container" role="list">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`nav__panel-link ${active === l.id ? 'is-active' : ''}`}
                    aria-current={active === l.id ? 'location' : undefined}
                    onClick={() => close()}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="btn btn--primary nav__panel-cta" onClick={() => close()}>
                  Let's Connect
                </a>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
