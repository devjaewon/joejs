import merge from 'deepmerge';
import { resolve } from 'path';
import { defineConfig } from 'rollup';
import typescriptPlugin from '@rollup/plugin-typescript';
import nodeResolvePlugin from '@rollup/plugin-node-resolve';

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
      preserveSymlinks: true,
      watch: true,
      output: [
        {
          file: resolve(cwd, 'examples', 'index.js'),
          format: 'iife',
          sourcemap: false,
        },
      ],
      plugins: [
        typescriptPlugin({
          tsconfig: resolve(cwd, 'tsconfig.json'),
          outputToFilesystem: true,
        }),
        nodeResolvePlugin({
          mainFields: ['module', 'main'],
          browser: true,
          extensions: ['.ts', '.js'],
        }),
      ],
    };

    const userConfig = callback?.(cliArgs) || {};
    const config = merge(baseConfig, userConfig);

    return config;
  });
