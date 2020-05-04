import { WebhookConfig, webhookRegex } from './types/WebhookConfig';
import { CheckoutWebhook, CheckoutStatus } from './types/Checkout';
import { Client } from 'discord-rpc';
import { app } from 'electron';
import { isDev } from './main';
import { WebhookClient, MessageEmbed } from 'discord.js';
import moment from 'moment';
import _ from 'lodash';

class DiscordManager {
  private static webhookClient: WebhookClient | null = null;
  private static config: WebhookConfig | null = null;
  private static logoUrl = 'https://i.imgur.com/fUUYrFx.png';
  private static successColor = '#9253C1';
  private static failColor = '#D20000';

  public static async setupWebhook(config: WebhookConfig) {
    if (!webhookRegex.test(config.url)) return;
    const [id, token] = config.url.replace('https://discordapp.com/api/webhooks/', '').split('/');
    if (!id || !token) return;
    this.webhookClient = new WebhookClient(id, token);
    this.config = config;
  }

  public static async sendTestWebhook(config: WebhookConfig) {
    this.setupWebhook(config);
    this.sendWebhook(
      new MessageEmbed()
        .setTitle('Successfully configured webhook!')
        .setColor(this.successColor)
        .addField('Success only', _.capitalize(config.onlySuccess.toString()))
        .addField(
          'Message',
          config.onlySuccess
            ? 'If you want to receive all checkouts messages, please disable ` Success Only ` option in the bot'
            : 'If you want to receive notifications about successful checkouts only, please enable ` Success Only ` option in the bot',
        )
        .addField('Date', moment().format('Do MMM YYYY | HH:mm:ss')),
    );
  }

  public static async sendCheckoutWebhook({ status, item, id, profile, mode }: CheckoutWebhook) {
    if (!item || !this.config) return;
    if (status !== 'paid' && this.config.onlySuccess) return;

    const message = new MessageEmbed()
      .setTitle(this.formatStatus(status))
      .setColor(status === 'paid' ? this.successColor : this.failColor)
      .setThumbnail(item.image)
      .addField('Date', moment().format('Do MMM YYYY | HH:mm:ss'))
      .addField('Product', item.name, true);

    if (item.style !== 'sold-out') {
      message
        .addField('Style', item.style, true)
        .addField('Size', item.size, true)
        .addField('Mode', mode, true)
        .addField('Profile', `|| ${profile.name} ||`, true)
        .addField('Order number', `|| #${id} ||`, true);
    }

    this.sendWebhook(message);
  }

  public static formatStatus(status: CheckoutStatus): string {
    switch (status) {
      case 'paid': {
        return 'Successful checkout!';
      }
      case 'failed': {
        return 'Failed - Card decline';
      }
      case 'dup': {
        return 'Failed - Duplicate order';
      }
      case 'outOfStock': {
        return 'Failed - Sold out';
      }
      case '404':
      case '500': {
        return `Failed - ${status}`;
      }
      default: {
        return 'Unknown status';
      }
    }
  }

  public static async sendWebhook(message: MessageEmbed) {
    if (!this.webhookClient) return;

    this.webhookClient.send('', {
      username: 'Supplier',
      avatarURL: this.logoUrl,
      embeds: [
        message
          .setFooter(`Supplier ${app.getVersion()}`, this.logoUrl)
          .setTimestamp(moment().toDate()),
      ],
    });
  }

  public static async setDiscordActivity() {
    const discordRPC = new Client({ transport: 'ipc' });
    try {
      await discordRPC.login({ clientId: '696377645285507183' });
    } catch {
      return;
    }

    discordRPC.setActivity({
      details: `Version: ${isDev ? 'dev' : app.getVersion()}`,
      startTimestamp: Date.now(),
      largeImageKey: 'logo',
      instance: true,
    });
  }
}

export { DiscordManager };
