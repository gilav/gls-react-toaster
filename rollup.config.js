import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import image from 'rollup-plugin-image';
import svg from 'rollup-plugin-svg';

const pkg = require("./package.json");

const extensions = ['.js', '.tsx']

export default {
  input: "src/ToastContainer.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions
    }),
    commonjs(),
    svg(),
    image(),
    typescript({ useTsconfigDeclarationDir: true,
      include: ['./**/src/**/*.tsx'],
    }),
    postcss()
  ]
};