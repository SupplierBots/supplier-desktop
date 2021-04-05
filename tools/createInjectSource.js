const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');

(async () => {
  await createHarvesterCode();
})();

async function createHarvesterCode() {
  const sourcePath = path.resolve(process.cwd(), 'src', 'main', 'bot', 'harvesters', 'playwright');
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
