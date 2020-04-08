import * as Sentry from '@sentry/browser';
import { SENTRY_DSN, ERROR_TRACKING_ENABLED } from '../custom';

const initializeErrorTracking = () => {
  if (ERROR_TRACKING_ENABLED) {
    Sentry.init({
      dsn: SENTRY_DSN,
    });
  }
};

export default initializeErrorTracking;
