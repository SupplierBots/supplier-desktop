export const config = {
  tasksDebug: false,
  storageVersion: 3,
  maxTasksAmount: 6,
  registerUrl: 'https://us-central1-safedrop-83b20.cloudfunctions.net/createAccount',
  tutorialUrl: 'https://docs.supplierbot.io/',
  chromeUrl: 'https://www.google.com/chrome/',
  changelogUrl: 'https://docs.supplierbot.io/other/changelog',
  browserEngine: {
    id: 'chrome-83-0',
    name: 'chrome',
    fullVersion: '83.0.4103.61',
    features: ['headless'],
    executablePathEnvVar: 'CHROME_83_BIN',
  },
};
