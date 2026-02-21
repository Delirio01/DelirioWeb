// Pipecat backend configuration
// Values sourced from devEnv/pipecatSecrets.xml

export const PIPECAT_BACKEND_URL =
  import.meta.env.VITE_PIPECAT_BACKEND_URL ||
  "https://pipecat-backend-production-6460.up.railway.app";

export const TRIGGER_API_KEY =
  import.meta.env.VITE_TRIGGER_API_KEY || "password";

export const CHAT_ENGINE_URL =
  import.meta.env.VITE_CHAT_ENGINE_URL ||
  "https://text-messaging-production.up.railway.app";

export const BOT_SPEAKING_DEBOUNCE_MS = 700;

export const generateDiscoveryId = () =>
  `discovery_${crypto.randomUUID()}`;
