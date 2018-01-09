import npm from "rollup-plugin-node-resolve";

export default {
  input: "assets/js/build.js",
  plugins: [npm({jsnext: true})],
  moduleId: "d3",
  name: "d3",
  output: { format: "umd" }
};