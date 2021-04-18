import dedent from 'dedent';
import nock from 'nock';
import { parseSiteMapper, replaceDomain } from '../mapper';

const siteMap = `
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://bjerk.io/projects/indiv</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://bjerk.io/projects/lent</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
`;

describe('mapper', () => {
  it('should parse a sitemap.xml', async () => {
    const scope = nock('https://bjerk.io')
      .get('/sitemap.xml')
      .reply(200, siteMap);

    const res = await parseSiteMapper('https://bjerk.io/sitemap.xml');
    expect(res).toMatchInlineSnapshot(`
      Array [
        "https://bjerk.io/projects/indiv",
        "https://bjerk.io/projects/lent",
      ]
    `);
  });
  it('should replace domain', () => {
    const domains = dedent`
      https://bjerk.io/about/
      https://bjerk.io/services/
      https://bjerk.io/
    `;

    const replaced = replaceDomain(domains, {
      from: 'https://bjerk.io',
      to: 'https://btools.no/',
    });

    expect(replaced).toMatchInlineSnapshot(`
      "https://btools.no/about/
      https://btools.no/services/
      https://btools.no/"
    `);
  });
});
