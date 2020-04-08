const { notarize } = require('electron-notarize');
const log = require('builder-util/out/log').log;

exports.default = async function afterSign(context) {
  const { electronPlatformName, appOutDir, packager } = context;

  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = packager.appInfo.productFilename;
  const appPath = `${appOutDir}/${appName}.app`;
  const appBundleId = packager.config.appId;

  log.info({ appBundleId: appBundleId, appPath: appPath }, 'notarizing');

  return await notarize({
    appBundleId: appBundleId,
    appPath: appPath,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
  });
};
