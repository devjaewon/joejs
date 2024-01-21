import { resolve } from 'path';

/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testMatch: [
    resolve(process.cwd(), 'src/**/*.spec.ts?(x)'),
  ],
};

export default config;
