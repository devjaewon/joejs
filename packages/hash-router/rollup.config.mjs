import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig(() => {
  return {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.min.js',
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
      terser(),
    ],
  };
});
