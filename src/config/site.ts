/**
 * Central site configuration.
 * Values from environment variables are read at build time (see .env.example).
 * Anything empty here is hidden on the public site — nothing is invented.
 */

function clean(value: string | undefined): string {
  const v = (value ?? '').trim();
  return /^https?:\/\/\S+$/.test(v) ? v.replace(/\/+$/, '') : '';
}

const formId = (import.meta.env.VITE_FORMSPREE_FORM_ID ?? '').trim();

export interface SiteImage {
  /** Path inside /public, starting with /images/ (no "public" in the path). */
  src: string;
  /** The image's real pixel size, used to reserve space and avoid layout shift. */
  width: number;
  height: number;
}

/* ===================== YOUR IMAGES: edit these two values ===================== */

/**
 * PROFILE PHOTO
 * 1. Put your photo in:  public/images/karan-gadekar.webp  (4:5 portrait, e.g. 800×1000)
 * 2. Replace `null` below with:
 *      { src: '/images/karan-gadekar.webp', width: 800, height: 1000 }
 *    using your image's real pixel width and height.
 * null (or a missing file) shows the KG monogram. A broken image is never shown.
 */
const profilePhoto: SiteImage | null = { src: '/images/karan-gadekar.webp', width: 800, height: 1000 };

/**
 * GMC SCREENSHOTS (genuine screenshots of gadekarmarketcomplex.app only)
 * 1. Put them in public/images/, e.g. gmc-homepage.webp (1600×1000) and gmc-mobile.webp (780×1688).
 * 2. Add one entry per screenshot inside the brackets. The FIRST entry is shown on the
 *    project card, so put a desktop homepage screenshot first. Example:
 *      [
 *        { src: '/images/gmc-homepage.webp', alt: 'Gadekar Market Complex website homepage', width: 1600, height: 1000 },
 *        { src: '/images/gmc-mobile.webp', alt: 'Gadekar Market Complex website on a phone', width: 780, height: 1688 },
 *      ]
 * Empty keeps the illustrated card and hides the "View Website Screenshots" button.
 */
const gmcScreenshots: (SiteImage & { alt: string })[] = [
  {
    src: '/images/gmc-homepage.webp',
    width: 1600,
    height: 1000,
    alt: 'Gadekar Market Complex official website homepage',
  },
];

/* ============================================================================== */

export const site = {
  name: 'Karan Gadekar',
  headline: 'Data Engineer Associate | Developer | Entrepreneur',
  tagline: 'Building with data. Creating digital experiences.',
  email: 'karangadekar937@gmail.com',
  phoneDisplay: '+91 74107 64024',
  phoneHref: 'tel:+917410764024',
  whatsappHref:
    'https://wa.me/917410764024?text=' +
    encodeURIComponent(
      'Hello Karan, I visited your portfolio website and would like to connect with you.',
    ),
  hometown: 'Jalna, Maharashtra, India',
  gmcUrl: 'https://gadekarmarketcomplex.app/',

  /** Formspree form ID. Valid IDs are short alphanumeric strings. */
  formspreeId: /^[A-Za-z0-9]{4,32}$/.test(formId) ? formId : '',

  linkedinUrl: clean(import.meta.env.VITE_LINKEDIN_URL),
  githubUrl: clean(import.meta.env.VITE_GITHUB_URL),

  profilePhoto,
  gmcScreenshots,

  /**
   * Verified business contact for Gadekar Market Complex (mailto:, tel: or URL).
   * Empty hides the "Contact GMC" button.
   */
  gmcContactHref: '' as string,
} as const;

export type Site = typeof site;
