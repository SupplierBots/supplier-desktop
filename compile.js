const fs = require('fs-extra');
const path = require('path');
const exec = require('child_process').exec;
const chalk = require('chalk');

const input = path.resolve(process.cwd(), 'build');
const output = path.resolve(process.cwd(), 'app');
const share = path.resolve(process.cwd(), 'share');

const compileToBinary = async (file, outputPath) => {
  exec(
    `${process.platform === 'win32' ? 'cd NW.js && nwjc' : './NW.js/nwjc'} ${
      file.path
    } ${outputPath}`,
    error => {
      if (error !== null) {
        console.log(`exec error: ${error}`);
        throw new Error(chalk.red(`Error while compiling ${file.name}`));
      }
    },
  );
};

(async () => {
  try {
    await fs.emptyDir(output);

    if (!fs.existsSync(output)) await fs.mkdir(output);
    if (!fs.existsSync(share)) await fs.mkdir(share);
    if (!fs.existsSync(`${output}/static`)) await fs.mkdir(`${output}/static`);
    console.log(chalk.green('> Created output directory'));

    const directoriesToCopy = (await fs.readdir(path.resolve(input, 'static'))).filter(
      name => name !== 'js',
    );
    directoriesToCopy.forEach(dirName => {
      fs.copy(path.resolve(input, 'static', dirName), path.resolve(output, 'static', dirName));
    });
    console.log(chalk.green('> Copied all assets'));

    const [mainJS] = (await fs.readdir(path.resolve(input, 'static', 'js'))).map(name => {
      return {
        name,
        path: path.resolve(input, 'static', 'js', name),
      };
    });

    let index = (await fs.readFile(path.resolve(input, 'index.html'), 'utf8')).replace(
      /(\r\n|\n|\r)/gm,
      '',
    );
    let scriptToInject =
      "<script>const nwPath = require('path');nw.Window.get().evalNWBin(null, nwPath.resolve(process.cwd(), 'app', 'SafeDrop'));</script>";

    index = index.replace(/<script.*<\/script>/, scriptToInject);

    await fs.writeFile(path.resolve(output, 'index.html'), index);

    compileToBinary(mainJS, path.resolve(output, 'SafeDrop'));
    compileToBinary(mainJS, path.resolve(share, 'SafeDrop'));
    console.log(chalk.green(`> Compiled bundle`));
    console.log(chalk.green(`> Share directory is ready to be uploaded to the server!`));
  } catch (ex) {
    console.log(ex);
  }
})();
