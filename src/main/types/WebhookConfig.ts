export const webhookRegex = /\/webhooks\/.+\/.+$/;

export interface WebhookConfig {
  url: string;
  onlySuccess: boolean;
}
