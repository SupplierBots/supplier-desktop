const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const buildDir = path.resolve(process.cwd(), 'build');

(async () => {
  const sources = [
    'app.js',
    'electron.js',
    'renderer.js',
    'loadRenderer.js',
    'index.html',
    'static',
    'preload.js',
    'harvesterPreload.js',
  ];

  const files = await fs.readdir(buildDir);
  const filesToRemove = files.filter(f => !sources.includes(f));

  for (let file of filesToRemove) {
    await fs.remove(path.resolve(buildDir, file));
  }

  console.log(chalk.green('> Prepared output directory'));

  let index = (await fs.readFile(path.resolve(buildDir, 'index.html'), 'utf8')).replace(
    /(\r\n|\n|\r)/gm,
    '',
  );
  index = index.replace(/<script.*<\/script>/, `<script src="./loadRenderer.js"></script>`);
  await fs.writeFile(path.resolve(buildDir, 'index.html'), index);
  console.log(chalk.green('> Patched index.html'));
})();
