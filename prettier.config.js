/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
  tabWidth: 2,
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  trailingComma: 'all',
  semi: true,
  useTabs: false,
  arrowParens: 'always',
  printWidth: 120,
};
