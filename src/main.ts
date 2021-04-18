import { debug, setFailed, setOutput } from '@actions/core';
import { makeConfig } from './config';
import { parseSiteMapper } from './mapper';

export async function main(): Promise<void> {
  const config = await makeConfig();
  const urls = await parseSiteMapper(config.siteMapURL);
  setOutput('urls', urls.join('\n'));
}

main().catch(e => {
  debug(`error: ${JSON.stringify(e)}`);
  debug(e.stack);
  setFailed(e.message);
});
