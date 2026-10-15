// Loads the Botpress webchat on the client only (no SSR/hydration issues).
// Config mirrors the bot's public shareable config (Webchat → Share in Botpress).
import { useEffect } from 'react';

const INJECT_SRC = 'https://cdn.botpress.cloud/webchat/v5.0/inject.js';

const BOT_CONFIG = {
  botId: '01da5f14-ee4f-4cc8-95ac-4ebe80e75468',
  clientId: 'ef3e209b-cc39-4ae0-8062-03d0b586e27f',
  configuration: {
    version: 'v2',
    website: {},
    email: {},
    phone: {},
    termsOfService: {},
    privacyPolicy: {},
    feedbackEnabled: true,
    footer: '[⚡ by Botpress](https://botpress.com/?from=webchat)',
    allowFileUpload: true,
    soundEnabled: true,
    conversationHistory: true,
    homePageEnabled: true,
    welcomeHeading: 'Hi there, how can we help?',
    welcomeSubtitle: 'Tap a starting point or ask in your own words.',
    conversationStartersEnabled: false,
    conversationStarters: [],
    conversationStartersDisplayStyle: 'cards',
    citationsEnabled: true,
    agentPresenceEnabled: true,
  },
} as const;

declare global {
  interface Window {
    botpress?: { init: (config: unknown) => void; open?: () => void; toggle?: () => void };
  }
}

export function BotpressChat() {
  useEffect(() => {
    if (document.querySelector(`script[src="${INJECT_SRC}"]`)) return;
    const inject = document.createElement('script');
    inject.src = INJECT_SRC;
    inject.async = true;
    inject.onload = () => { window.botpress?.init(BOT_CONFIG); };
    document.body.appendChild(inject);
  }, []);
  return null;
}
