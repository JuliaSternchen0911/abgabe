// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  input: "./src/index.ts",
  output: {
    format: "iife",
    file: "./build/bundle.js",
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      noEmitOnError: true,
    }),
  ],
};
