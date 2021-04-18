import { debug, setFailed, setOutput } from '@actions/core';
import { makeConfig } from './config';
import { parseSiteMapper, replaceDomain } from './mapper';
import { invariant } from './utils';

export async function main(): Promise<void> {
  const config = await makeConfig();
  const urls = await parseSiteMapper(config.siteMapURL);

  let output = urls.join('\n');

  if (config.replaceDomain) {
    invariant(config.replaceDomain, 'expect replaceDomain');
    output = replaceDomain(output, config.replaceDomain)
  }

  setOutput('urls', output);
}

main().catch(e => {
  debug(`error: ${JSON.stringify(e)}`);
  debug(e.stack);
  setFailed(e.message);
});
