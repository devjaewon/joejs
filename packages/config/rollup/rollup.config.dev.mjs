import merge from 'deepmerge';
import { resolve } from 'path';
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import livereload from '@kjojs/rollup-plugin-livereload2';
import serve from 'rollup-plugin-serve';

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
      input: resolve(cwd, 'examples', 'index.ts'),
      watch: true,
      output: [
        {
          file: resolve(cwd, 'examples', 'index.js'),
          format: 'iife',
          sourcemap: true,
        },
      ],
      plugins: [
        typescript({
          tsconfig: resolve(cwd, 'tsconfig.json'),
          outputToFilesystem: true,
        }),
        serve({
          contentBase: ['examples'],
          host: '0.0.0.0',
          port: 3000,
        }),
        livereload({
          port: 3001,
          delay: 300
        }),
      ],
    };

    const userConfig = callback?.(cliArgs) || {};

    return merge(baseConfig, userConfig);
  });
