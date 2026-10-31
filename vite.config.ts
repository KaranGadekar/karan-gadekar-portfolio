import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * SEO plugin
 * - Injects JSON-LD (Person + WebSite) into index.html.
 * - Adds canonical, og:url and og:image ONLY when VITE_SITE_URL is set.
 * - Emits robots.txt always, and sitemap.xml only when VITE_SITE_URL is set.
 * Nothing here invents a domain: with no VITE_SITE_URL, URL-dependent tags are omitted.
 */
function cleanUrl(value: string | undefined): string {
  const v = (value ?? '').trim().replace(/\/+$/, '');
  return /^https?:\/\/[^\s/]+\.[^\s]+$/.test(v) ? v : '';
}

function seoPlugin(env: Record<string, string>): Plugin {
  const siteUrl = cleanUrl(env.VITE_SITE_URL);
  const sameAs = [cleanUrl(env.VITE_LINKEDIN_URL), cleanUrl(env.VITE_GITHUB_URL)].filter(Boolean);

  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': siteUrl ? `${siteUrl}/#person` : '#person',
    name: 'Karan Gadekar',
    alternateName: 'करण गाडेकर',
    jobTitle: 'Data Engineer Associate',
    worksFor: { '@type': 'Organization', name: 'InfoCepts' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'G H Raisoni College of Engineering and Management, Wagholi, Pune',
    },
    homeLocation: {
      '@type': 'Place',
      name: 'Jalna, Maharashtra, India',
    },
    email: 'mailto:karangadekar937@gmail.com',
    knowsAbout: [
      'Data Engineering',
      'Business Intelligence',
      'Power BI',
      'MicroStrategy',
      'SQL',
      'Databricks',
      'Apache Kafka',
      'Python',
    ],
  };
  if (siteUrl) person.url = `${siteUrl}/`;
  if (sameAs.length) person.sameAs = sameAs;

  const graph: Record<string, unknown>[] = [person];
  if (siteUrl) {
    graph.push({
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: 'Karan Gadekar',
      inLanguage: 'en',
      publisher: { '@id': `${siteUrl}/#person` },
    });
  }

  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);

  const urlTags = siteUrl
    ? [
        `<link rel="canonical" href="${siteUrl}/" />`,
        `<meta property="og:url" content="${siteUrl}/" />`,
        `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="Karan Gadekar, Data Engineer Associate, Developer and Entrepreneur" />`,
        `<meta name="twitter:image" content="${siteUrl}/og-image.png" />`,
      ].join('\n    ')
    : '<!-- Canonical URL, og:url and og:image are added when VITE_SITE_URL is set. -->';

  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html
        .replace('<!--SEO_URL_TAGS-->', urlTags)
        .replace(
          '<!--SEO_JSON_LD-->',
          `<script type="application/ld+json">\n${jsonLd}\n    </script>`,
        );
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (siteUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' });

      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10);
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source:
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            `  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n` +
            '</urlset>\n',
        });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [react(), seoPlugin(env)],
    define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
    },
  };
});
