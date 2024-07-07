export function trackEvent(name: string, data?: object) {
  window.umami?.track(name, data);
  window.posthog?.capture(name, data);
}

declare global {
  interface Window {
    umami?: { track: (name: string, data?: object) => void };
    posthog?: { capture: (name: string, data?: object) => void };
  }
}
