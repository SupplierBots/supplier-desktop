const fs = require('fs-extra');
const exec = require('child_process').exec;
const chalk = require('chalk');
const input = `${process.cwd()}/build`;
const output = `${process.cwd()}/app`;

const compileToBinary = async file => {
  exec(`./NW.js/nwjc ${file.path} ${output}/${file.hash}.sd`, error => {
    if (error !== null) {
      console.log(`exec error: ${error}`);
      throw new Error(chalk.red(`Error while compiling ${file.name}`));
    }
    console.log(chalk.green(`> Compiled ${file.name}`));
  });
};

(async () => {
  try {
    await fs.emptyDir(output);
    if (!fs.exists(`${output}`)) await fs.mkdir(`${output}`);
    if (!fs.exists(`${output}/static`)) await fs.mkdir(`${output}/static`);
    console.log('Created output directory');

    const directoriesToCopy = (await fs.readdir(`${input}/static`)).filter(name => name !== 'js');
    directoriesToCopy.forEach(dirName => {
      fs.copy(`${input}/static/${dirName}`, `${output}/static/${dirName}`);
    });
    console.log('Copied all assets');

    const javascriptFiles = (await fs.readdir(`${input}/static/js`))
      .map(name => {
        return {
          name,
          hash: name.split('.')[1],
          type: name.includes('chunk') ? 'chunk' : 'runtime',
          path: `${input}/static/js/${name}`,
        };
      })
      .sort((a, b) => (a.type < b.type ? 1 : -1));

    let index = (await fs.readFile(`${input}/index.html`, 'utf8')).replace(/(\r\n|\n|\r)/gm, '');

    let scriptToInject = "<script>const dir = process.cwd() + '/App/';";
    javascriptFiles.forEach(file => {
      scriptToInject += `nw.Window.get().evalNWBin(null, dir + '${file.hash}.sd');`;
    });
    scriptToInject += '</script>';

    index = index.replace(/<script>.*<\/script>/, scriptToInject);

    await fs.writeFile(`${output}/index.html`, index);
    javascriptFiles.forEach(compileToBinary);
  } catch (ex) {
    console.log(ex);
  }
})();
