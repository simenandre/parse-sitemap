/* eslint @typescript-eslint/no-var-requires: 0 */
import { getInput } from '@actions/core';
import * as rt from 'runtypes';

if (!process.env.CI) {
  require('dotenv').config();
}

export const config = rt.Record({
  siteMapURL: rt.String,
});

export type Config = rt.Static<typeof config>;

export async function makeConfig(): Promise<Config> {
  return config.check({
    siteMapURL: getInput('sitemap-url'),
  });
}
