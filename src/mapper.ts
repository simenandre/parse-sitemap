import Sitemapper from 'sitemapper';

export async function parseSiteMapper(url: string): Promise<string[]> {
  const site = new Sitemapper({ url });
  const urls = await site.fetch();
  return urls.sites;
}
