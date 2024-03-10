import merge from 'deepmerge';
import { join } from 'path';
import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';

/**
 * @param {import('rollup').RollupOptionsFunction}
 */
export default (callback) =>
  defineConfig((cliArgs) => {
    const cwd = process.cwd();

    /**
     * @type {import('rollup').RollupOptions}
     */
    const baseConfig = {
      input: join(cwd, 'src', 'index.ts'),
      output: [
        {
          file: join(cwd, 'dist', 'index.esm.js'),
          format: 'es',
          exports: 'named',
          sourcemap: true,
        },
      ],
      plugins: [
        typescript({
          tsconfig: join(cwd, 'tsconfig.json'),
        }),
        terser({}),
      ],
    };

    const userConfig = callback?.(cliArgs) || {};

    return merge(baseConfig, userConfig);
  });
