module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "chrome >= 120",
        },
      },
    ],
    [
      "@babel/preset-react",
      {
        pragma: "this.$createElement",
        pragmaFrag: JSON.stringify("view"),
      },
    ],
  ],
  plugins: [
    "@babel/plugin-syntax-jsx",
    // '@babel/plugin-transform-runtime'
  ],
};
