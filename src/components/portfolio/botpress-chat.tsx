// Loads the Botpress webchat on the client only (no SSR/hydration issues).
// The script URLs come from the Botpress dashboard: Webchat → Share → Embed.
import { useEffect } from 'react';

const INJECT_SRC = 'https://cdn.botpress.cloud/webchat/v3.3/inject.js';
// TODO: paste the config URL from your Botpress embed snippet here.
const CONFIG_SRC = '';

export function BotpressChat() {
  useEffect(() => {
    if (!CONFIG_SRC) return;
    if (document.querySelector(`script[src="${INJECT_SRC}"]`)) return;
    const inject = document.createElement('script');
    inject.src = INJECT_SRC;
    inject.async = true;
    inject.onload = () => {
      const config = document.createElement('script');
      config.src = CONFIG_SRC;
      config.async = true;
      document.body.appendChild(config);
    };
    document.body.appendChild(inject);
  }, []);
  return null;
}
