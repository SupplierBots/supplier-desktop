const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const app = path.resolve(process.cwd(), 'build', 'app.js');
const renderer = path.resolve(process.cwd(), 'build', 'renderer.js');
console.log(app);
if (fs.existsSync(app) || fs.existsSync(renderer))
  throw new Error(
    chalk.red(
      'Found original source files. Run production build to compile them before packaging!',
    ),
  );

console.log(chalk.green('Ready to package!'));
