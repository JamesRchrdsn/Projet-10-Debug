module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-private-property-in-object",
  ],
};
