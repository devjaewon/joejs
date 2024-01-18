import merge from 'deepmerge';
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
      input: resolve(cwd, 'src', 'index.ts'),
      output: [
        {
          file: resolve(cwd, 'dist', 'index.js'),
          format: 'es',
          exports: 'named',
          sourcemap: true,
        },
      ],
      plugins: [
        typescript({
          tsconfig: resolve(cwd, 'tsconfig.json'),
          outputToFilesystem: true,
        }),
        terser(),
      ],
    };

    const userConfig = callback?.(cliArgs) || {};

    return merge(baseConfig, userConfig);
  });
