import { resolve } from 'path';
import defineConfig from '@philip21/config/rollup/rollup.config.dev.mjs';

export default defineConfig((cliArgs) => {
  const cwd = process.cwd();
  const exampleArg = cliArgs['example'] || 'pan';

  return {
    input: resolve(cwd, 'examples', `example_${exampleArg}.ts`),
  };
});
