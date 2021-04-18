import { debug, setFailed, setOutput } from '@actions/core';
import { makeConfig } from './config';
import { parseSiteMapper } from './mapper';
import { invariant } from './utils';

export async function main(): Promise<void> {
  const config = await makeConfig();
  const urls = await parseSiteMapper(config.siteMapURL);

  let output = urls.join('\n');

  if (config.replaceDomain) {
    invariant(config.replaceDomain, 'expect replaceDomain');
    const { from, to } = config.replaceDomain;
    output = output.replace(from, to);
  }

  setOutput('urls', output);
}

main().catch(e => {
  debug(`error: ${JSON.stringify(e)}`);
  debug(e.stack);
  setFailed(e.message);
});
