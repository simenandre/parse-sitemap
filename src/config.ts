/* eslint @typescript-eslint/no-var-requires: 0 */
import { getInput } from '@actions/core';
import * as rt from 'runtypes';
import { invariant } from './utils';

if (!process.env.CI) {
  require('dotenv').config();
}

export const replaceDomain = rt.Record({
  from: rt.String,
  to: rt.String,
});

export type ReplaceDomain = rt.Static<typeof replaceDomain>;

export const config = rt.Record({
  siteMapURL: rt.String,
  replaceDomain: replaceDomain.optional(),
});

function parseReplaceDomain(replaceStr?: string): undefined | ReplaceDomain {
  if (!replaceStr) return undefined;
  const [from, to] = replaceStr.split('|');
  invariant(
    from || to,
    'missing from or to. Syntax for replaceDomain is: fromdomain.tld|todomain.tld',
  );
  return replaceDomain.check({ from, to });
}

export type Config = rt.Static<typeof config>;

export async function makeConfig(): Promise<Config> {
  return config.check({
    siteMapURL: getInput('sitemap-url'),
    replaceDomain: parseReplaceDomain(getInput('replace-domain')),
  });
}
