const path = require('path')
 
const buildEslintCommand = (filenames) =>
  `eslint ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`
 
module.exports = {
  '*.{ts,tsx}': [buildEslintCommand],
}
