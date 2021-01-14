const NAVIGATOR_PLATFORMS = {
  ios: 'iPad|iPhone|iPod',
};

/**
 * Helper function to detect current device platform using User Agent sniffing
 * @param {String} platform selected platform as part of the navigator platforms config
 */
const isDevice = (platform: string) => {
  const regExTestCase = new RegExp(NAVIGATOR_PLATFORMS[platform]);

  return !!navigator.platform && regExTestCase.test(navigator.platform);
};

export default {
  ios: isDevice('ios'),
};
