const fs = require('fs-extra');
const exec = require('child_process').exec;
const chalk = require('chalk');
const input = `${process.cwd()}/build`;
const output = `${process.cwd()}/app`;
const share = `${process.cwd()}/share`;

const compileToBinary = async (file, outputPath) => {
  exec(`./NW.js/nwjc ${file.path} ${outputPath}`, error => {
    if (error !== null) {
      console.log(`exec error: ${error}`);
      throw new Error(chalk.red(`Error while compiling ${file.name}`));
    }
  });
};

(async () => {
  try {
    await fs.emptyDir(output);

    if (!fs.existsSync(`${output}`)) await fs.mkdir(`${output}`);
    if (!fs.existsSync(`${share}`)) await fs.mkdir(`${share}`);
    if (!fs.existsSync(`${output}/static`)) await fs.mkdir(`${output}/static`);
    console.log(chalk.green('> Created output directory'));

    const directoriesToCopy = (await fs.readdir(`${input}/static`)).filter(name => name !== 'js');
    directoriesToCopy.forEach(dirName => {
      fs.copy(`${input}/static/${dirName}`, `${output}/static/${dirName}`);
    });
    console.log(chalk.green('> Copied all assets'));

    const [mainJS] = (await fs.readdir(`${input}/static/js`)).map(name => {
      return {
        name,
        path: `${input}/static/js/${name}`,
      };
    });

    let index = (await fs.readFile(`${input}/index.html`, 'utf8')).replace(/(\r\n|\n|\r)/gm, '');

    let scriptToInject =
      "<script>nw.Window.get().evalNWBin(null, process.cwd() + '/app/SafeDrop');</script>";

    index = index.replace(/<script.*<\/script>/, scriptToInject);

    await fs.writeFile(`${output}/index.html`, index);
    compileToBinary(mainJS, `${output}/SafeDrop`);
    compileToBinary(mainJS, `${share}/SafeDrop`);
    console.log(chalk.green(`> Compiled bundle`));
  } catch (ex) {
    console.log(ex);
  }
})();
