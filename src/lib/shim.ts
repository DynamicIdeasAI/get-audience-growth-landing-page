// This shim is needed because Cloudflare Workers (even with nodejs_compat)
// might not expose MessageChannel globally, which React 19 relies on.
import { MessageChannel } from 'node:worker_threads';

if (!globalThis.MessageChannel) {
  // @ts-expect-error - polyfilling MessageChannel for Cloudflare Workers environment
  globalThis.MessageChannel = MessageChannel;
}
