import { Client } from 'discord-rpc';
import { app } from 'electron';
import { isDev } from './main';

const discordRPC = new Client({ transport: 'ipc' });

const setDiscordActivity = async () => {
  try {
    await discordRPC.login({ clientId: '696377645285507183' });
  } catch {
    return;
  }

  discordRPC.setActivity({
    details: `Version ${isDev ? 'dev' : app.getVersion()}`,
    startTimestamp: Date.now(),
    largeImageKey: 'logo',
    instance: true,
  });
};

export { setDiscordActivity };
