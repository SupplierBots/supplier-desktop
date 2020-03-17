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

  const regex = /(.*)"\$PRODUCT\$"(.*)/s;
  const match = regex.exec(code);
  const content = `/* eslint-disable no-template-curly-in-string */ export const injectScript = (payload: any, externalStock: any) => '${match[1]}' + JSON.stringify(payload) + '${match[2]}`;

  const externalStockRegex = /(.*)"\$STOCK\$"(.*)/s;
  const exernalStockMatch = externalStockRegex.exec(content);

  const encryptedString = JSON.stringify([...exernalStockMatch[2]].map(s => s.charCodeAt()));

  const finalContent = `${exernalStockMatch[1]}' + JSON.stringify(externalStock) + String.fromCharCode(...${encryptedString})`;

  await fs.writeFileSync(path.resolve(injectScriptDir, 'injectScript.ts'), finalContent);
})();