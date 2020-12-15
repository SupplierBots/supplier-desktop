const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');

const mobileInjectDir = path.resolve(process.cwd(), 'src', 'main', 'bot', 'supreme', 'pageInject');

(async () => {
  await createMobileInject();
  await createMobileEnviromentCode();
  await createHarvesterCode();
  await minifyHarvesterPreload();
})();

async function createMobileInject() {
  const script = path.resolve(mobileInjectDir, 'injectScript.js');
  const source = await fs.readFileSync(script, { encoding: 'UTF-8' });

  const { code } = babel.transform(source, {
    comments: false,
    minified: true,
    plugins: ['minify-mangle-names'],
  });

  const regex = /(.*)"\$PRODUCT\$"(.*)(.*)"\$STOCK\$"(.*)(.*)"\$RESTOCKS\$"(.*)(.*)\$REGION\$(.*)/s;
  const match = regex.exec(code);

  const finalContent = `/* eslint-disable no-template-curly-in-string */ export const injectScript = (payload: any, externalStock: any, region: any, restocks: any) => String.fromCharCode(${[
    ...match[1],
  ].map(s => s.charCodeAt())}) + JSON.stringify(payload) + String.fromCharCode(${[
    ...match[2],
  ].map(s => s.charCodeAt())}) + JSON.stringify(externalStock) + String.fromCharCode(${[
    ...match[4],
  ].map(s => s.charCodeAt())}) + JSON.stringify(restocks) + String.fromCharCode(${[
    ...match[6],
  ].map(s => s.charCodeAt())}) + region + String.fromCharCode(${[...match[8]].map(s =>
    s.charCodeAt(),
  )})`;

  await fs.writeFileSync(path.resolve(mobileInjectDir, 'injectScript.ts'), finalContent);
}

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

async function createMobileEnviromentCode() {
  const script = path.resolve(mobileInjectDir, 'mockEnviroment.js');
  const source = await fs.readFileSync(script, { encoding: 'UTF-8' });
  const encrypted = `/* eslint-disable no-template-curly-in-string */ export const mockEnviroment = () => String.fromCharCode(...${JSON.stringify(
    [...source].map(s => s.charCodeAt()),
  )})`;
  await fs.promises.writeFile(path.resolve(mobileInjectDir, 'mockEnviroment.ts'), encrypted);
}

async function minifyHarvesterPreload() {
  const sourcePath = path.resolve(process.cwd(), 'src', 'main', 'bot', 'harvesters');
  const source = await fs.readFileSync(path.resolve(sourcePath, 'harvesterPreload.js'), {
    encoding: 'UTF-8',
  });
  const minified = babel.transform(source, {
    comments: false,
    minified: true,
    plugins: ['minify-mangle-names'],
  });

  await fs.promises.writeFile(
    path.resolve(process.cwd(), 'public', 'harvesterPreload.js'),
    minified.code,
  );
}
