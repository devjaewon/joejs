import merge from 'deepmerge';
import { resolve } from 'path';
import { defineConfig } from 'rollup';
import typescriptPlugin from '@rollup/plugin-typescript';
import nodeResolvePlugin from '@rollup/plugin-node-resolve';
import commonjsPlugin from '@rollup/plugin-commonjs';
import livereloadPlugin from 'rollup-plugin-livereload';
import servePlugin from 'rollup-plugin-serve';

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
          sourcemap: false,
        },
      ],
      plugins: [
        typescriptPlugin({
          tsconfig: resolve(cwd, 'tsconfig.json'),
          outputToFilesystem: true,
        }),
        nodeResolvePlugin({
          browser: true,
          dedupe: ['@kjojs/eventbus'],
          extensions: ['.ts', '.js']
        }),
        servePlugin({
          contentBase: ['examples'],
          host: '0.0.0.0',
          port: 3000,
        }),
        livereloadPlugin({
          port: 3001,
          delay: 300
        }),
      ],
    };

    const userConfig = callback?.(cliArgs) || {};
    const config = merge(baseConfig, userConfig);

    return config;
  });
