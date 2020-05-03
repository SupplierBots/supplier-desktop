export const webhookRegex = /^https:\/\/discordapp\.com\/api\/webhooks\/\w+\/\w+$/;
export interface WebhookConfig {
  url: string;
  onlySuccess: boolean;
}
