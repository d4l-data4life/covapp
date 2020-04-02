export const getRootCSSPropertyValue = (propertyName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(propertyName);
};
