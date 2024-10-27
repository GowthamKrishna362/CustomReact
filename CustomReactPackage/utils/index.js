export const getAttributeNameFromProp = key => {
  if (key === 'className') {
    return 'class';
  }
  return key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
