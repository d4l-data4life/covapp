import { LAYOUT } from './custom';

// unfortunately we have to type cast here
// because TS doesn't know that `LAYOUT` is configurable via env vars
export const IS_CHARITE = (LAYOUT as String) === 'CHARITE';
export const IS_COLLABORATION =
  (LAYOUT as String).indexOf('OFFICIAL_COLLABORATION') > -1;
export const IS_BZGA = (LAYOUT as String) === 'OFFICIAL_COLLABORATION_BZGA';
export const IS_BMG = (LAYOUT as String) === 'OFFICIAL_COLLABORATION_BMG';
export const IS_RKI = (LAYOUT as String) === 'OFFICIAL_COLLABORATION_RKI';
export const IS_CUSTOM = !IS_CHARITE && !IS_COLLABORATION;
