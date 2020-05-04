export const webhookRegex = /^https:\/\/discordapp\.com\/api\/webhooks\/.+\/.+$/;
export interface WebhookConfig {
  url: string;
  onlySuccess: boolean;
}
