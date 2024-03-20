module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    'eslint:recommended',
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    'plugin:react/jsx-runtime',
    "plugin:react-hooks/recommended",
    "standard",
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      }
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": 0,
    "import/extensions": 0,
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never",
      }
    ],
    "@typescript-eslint/comma-dangle": 0,
    "react/jsx-one-expression-per-line": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["state"] }
    ],
    "react/no-array-index-key": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-props-no-spreading": 0
  },
}
