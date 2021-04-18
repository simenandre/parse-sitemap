import { parseSiteMapper } from '../mapper';

describe('mapper', () => {
  it('should parse enterprise.google.com/sitemap.xml', async () => {
    const res = await parseSiteMapper(
      'https://enterprise.google.com/sitemap.xml',
    );
    expect(res).toMatchInlineSnapshot(`
      Array [
        "https://enterprise.google.no/intl/no/manufacturing.html",
      ]
    `);
  });
});
