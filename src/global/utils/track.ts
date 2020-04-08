import settings, { ACCEPTS_TRACKING } from './settings';
import { MATOMO_URL, MATOMO_SITE_ID, TRACKING_IS_ENABLED } from '../custom';

type TrackingEvent = string[];
interface TrackingEvents {
  [key: string]: TrackingEvent;
}

interface MatomoWindow extends Window {
  _paq?: Array<Array<String>>;
}

const FEATURE_FLAG_TRACKING_EVENTS_QUEUE = true;
let pendingEventsQueue: TrackingEvent[] = [];
settings.onChange(key => {
  if (key === ACCEPTS_TRACKING && settings[ACCEPTS_TRACKING]) {
    pendingEventsQueue = pendingEventsQueue.reduce(
      (_: TrackingEvent[], pendingEvent: TrackingEvent) => {
        trackEvent(pendingEvent);
        return _;
      },
      []
    );
  }
});

export const TRACKING_EVENTS: TrackingEvents = {
  START: ['Questionnaire', 'Start questionnaire'],
  RESUME: ['Questionnaire', 'Resume questionnaire'],
  FINISH: ['Questionnaire', 'Finish questionnaire'],
  ABORT: ['Questionnaire', 'Abort questionnaire'],
  QUESTION_NEXT: ['Question', 'Next question'], // appending question code on the fly
  QUESTION_PREVIOUS: ['Question', 'Previous question'], // appending question code on the fly
  SUMMARY_SHOW: ['Summary', 'Show previous QR code'],
  SUMMARY_ANSWERS_SHOW: ['Summary', 'Show answers'],
  SUMMARY_PRINT: ['Summary', 'Print code and answers'],
  SUMMARY_DELETE: ['Summary', 'Delete code and answers'],
  DATA_DONATION_CONSENT: ['Data Donation', 'Consent'], // appending value depening on consent given or not
  DATA_DONATION_SENT: ['Data Donation', 'Sent'], // appending value depending on success or error while sending
};

const initializeTracking = ({
  url,
  siteId,
  window,
}: {
  url: String;
  siteId: String;
  window: MatomoWindow;
}) => {
  window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */

  const _paq = window._paq;
  _paq.push(['requireConsent']);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', url + 'matomo.php']);
  _paq.push(['setSiteId', siteId]);

  if (TRACKING_IS_ENABLED) {
    const d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.defer = true;
    g.src = url + 'matomo.js';
    s.parentNode.insertBefore(g, s);
  }
};

export const trackEvent = (event: TrackingEvent) => {
  if (!TRACKING_IS_ENABLED) {
    return;
  }

  if (!settings.acceptsTracking || !(window as MatomoWindow)._paq) {
    FEATURE_FLAG_TRACKING_EVENTS_QUEUE && pendingEventsQueue.push(event);
    return;
  }

  (window as MatomoWindow)._paq.push(['trackEvent', ...event]);
};

initializeTracking({ url: MATOMO_URL, siteId: MATOMO_SITE_ID, window });
