const bytenode = require('bytenode');
const fs = require('fs');
const v8 = require('v8');
const path = require('path');

const compiledPath = path.resolve(__dirname, 'app.jsc');
const sourcePath = path.resolve(__dirname, 'app.js');

v8.setFlagsFromString('--no-lazy');
v8.setFlagsFromString('--no-flush-bytecode');

if (!fs.existsSync(compiledPath)) {
  bytenode.compileFile(sourcePath, compiledPath);
  fs.unlinkSync(sourcePath);
}

require(compiledPath);
