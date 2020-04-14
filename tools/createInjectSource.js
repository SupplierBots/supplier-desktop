const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');

const injectScriptDir = path.resolve(process.cwd(), 'src', 'main', 'bot', 'supreme', 'pageInject');
const script = path.resolve(injectScriptDir, 'source.js');
const ticketScript = path.resolve(injectScriptDir, 'ticket.js');

(async () => {
  const source = await fs.readFileSync(script, { encoding: 'UTF-8' });
  const ticketSource = await fs.readFileSync(ticketScript, { encoding: 'UTF-8' });

  const { code } = babel.transform(source, {
    comments: false,
    minified: true,
    plugins: ['minify-mangle-names'],
  });

  const ticket = babel.transform(ticketSource, {
    comments: false,
    minified: true,
    plugins: ['minify-mangle-names'],
  });

  const encryptedTicket = JSON.stringify([...ticket.code].map(s => s.charCodeAt()));
  const finalTicketContent = `export const waitTicket = () => String.fromCharCode(...${encryptedTicket});`;

  const regex = /(.*)"\$PRODUCT\$"(.*)/s;
  const match = regex.exec(code);
  const content = `/* eslint-disable no-template-curly-in-string */ export const injectScript = (payload: any, externalStock: any) => '${match[1]}' + JSON.stringify(payload) + '${match[2]}`;

  const externalStockRegex = /(.*)"\$STOCK\$"(.*)/s;
  const exernalStockMatch = externalStockRegex.exec(content);

  const encryptedString = JSON.stringify([...exernalStockMatch[2]].map(s => s.charCodeAt()));

  const finalContent = `${exernalStockMatch[1]}' + JSON.stringify(externalStock) + String.fromCharCode(...${encryptedString})`;

  await fs.writeFileSync(path.resolve(injectScriptDir, 'injectScript.ts'), finalContent);
  await fs.writeFileSync(path.resolve(injectScriptDir, 'waitTicket.ts'), finalTicketContent);
  await createHarvesterCode();
})();

async function createHarvesterCode() {
  const sourcePath = path.resolve(process.cwd(), 'src', 'main', 'bot', 'harvesters');
  const source = await fs.readFileSync(path.resolve(sourcePath, 'page.html'), {
    encoding: 'UTF-8',
  });
  const regex = /(.*)\$SITE_KEY\$(.*)/s;
  const match = regex.exec(source);

  const encryptedFirstPart = JSON.stringify([...match[1]].map(s => s.charCodeAt()));
  const encryptedSecondPart = JSON.stringify([...match[2]].map(s => s.charCodeAt()));
  const content = `export const getPageContent = (sitekey: string) =>
            String.fromCharCode(...${encryptedFirstPart}) + sitekey + String.fromCharCode(...${encryptedSecondPart});`;

  await fs.promises.writeFile(path.resolve(sourcePath, 'pageContent.ts'), content);
}
