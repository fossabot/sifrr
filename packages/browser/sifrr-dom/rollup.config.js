const version = require('../../../package.json').version;
const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint').eslint;
const terser = require('rollup-plugin-terser').terser;
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const cleanup = require('rollup-plugin-cleanup');

export default [
  {
    input: 'src/sifrr.dom.js',
    output: {
      file: 'dist/sifrr.dom.js',
      format: 'iife',
      name: 'Sifrr.DOM'
    },
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      eslint(),
      babel({
        // exclude: 'node_modules/**',
      }),
      cleanup()
    ]
  },{
    input: 'src/sifrr.dom.js',
    output: {
      file: 'dist/sifrr.dom.min.js',
      format: 'iife',
      name: 'Sifrr.DOM'
    },
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      babel({
        // exclude: 'node_modules/**',
      }),
      terser()
    ]
  }
];