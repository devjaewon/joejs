import { resolve } from 'path';
import defineConfig from '@kjojs/config/rollup/rollup.config.dev.mjs';

export default defineConfig((cliArgs) => {
  const cwd = process.cwd();
  const exampleArg = cliArgs['example'] || 'index';

  return {
    input: resolve(cwd, 'examples', `example_${exampleArg}.ts`),
  };
});
