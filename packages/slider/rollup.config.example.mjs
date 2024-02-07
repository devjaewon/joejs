import { resolve } from 'path';
import defineConfig from '@kjojs/config/rollup/rollup.config.example.mjs';

export default defineConfig((cliArgs) => {
  const cwd = process.cwd();
  const exampleArg = cliArgs['example'] || 'index';
  const inputFile = exampleArg === 'index' ? 'index.ts' : `example_${exampleArg}.ts`;

  return {
    input: resolve(cwd, 'examples', inputFile),
  };
});
