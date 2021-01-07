import { WHITELISTED_DATA4LIFE_ORIGINS } from '../custom';
import { MOBILE_ORIGINS } from '../constants';
import { IS_CHARITE } from '../layouts';

export const isIframeContext = () => window.parent && window.parent !== window;

export const isOauthContext = (origin: string) =>
  origin &&
  (WHITELISTED_DATA4LIFE_ORIGINS.includes(origin) || !!MOBILE_ORIGINS[origin]);

export const extractOrigin = (url: string) => (url ? new URL(url).origin : '');

export const canExport = (origin: string) => {
  return IS_CHARITE && (isIframeContext() || isOauthContext(origin));
};
