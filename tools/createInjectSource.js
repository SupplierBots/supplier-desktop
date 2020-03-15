const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');

const injectScriptDir = path.resolve(process.cwd(), 'src', 'main', 'bot', 'supreme', 'pageInject');
const script = path.resolve(injectScriptDir, 'source.js');

(async () => {
  const source = await fs.readFileSync(script, { encoding: 'UTF-8' });
  const { code } = babel.transform(source, {
    comments: false,
    minified: true,
    plugins: ['minify-mangle-names'],
  });

  var regex = /(.*)"\$PRODUCT\$"(.*)/s;
  var match = regex.exec(code);
  const content = `/* eslint-disable no-template-curly-in-string */ export const injectScript = (payload: any) => '${match[1]}' + JSON.stringify(payload) + '${match[2]}'`;
  await fs.writeFileSync(path.resolve(injectScriptDir, 'injectScript.ts'), content);
})();
