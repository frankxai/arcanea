// CJS bridge loader for starlight-runtime tests.
// Required because dist/index.js is compiled CommonJS but package.json
// declares "type": "module", causing .js files to be treated as ESM.
// This .cjs file loads the CJS dist and re-exports via module.exports.
const mod = require('../dist/index.js');
module.exports = mod;
