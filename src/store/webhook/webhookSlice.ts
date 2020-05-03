import { WebhookConfig } from '../../main/types/WebhookConfig';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WebhookConfig = {
  url: '',
  onlySuccess: false,
};

export const webhookSlice = createSlice({
  name: 'webhooks',
  initialState,
  reducers: {
    setWebhookConfig: (s, { payload }: PayloadAction<{ config: WebhookConfig }>) => {
      return payload.config;
    },
  },
});

export const { setWebhookConfig } = webhookSlice.actions;
