import Sitemapper from 'sitemapper';
import { ReplaceDomain } from './config';

export async function parseSiteMapper(url: string): Promise<string[]> {
  const site = new Sitemapper({ url });
  const urls = await site.fetch();
  return urls.sites;
}

export function replaceDomain(
  output: string,
  { from, to }: ReplaceDomain,
): string {
  return output.replace(new RegExp(from, 'g'), to.replace(/\/$/, ''));
}
