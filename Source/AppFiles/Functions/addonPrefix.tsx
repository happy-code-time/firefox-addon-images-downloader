export const addonPrefixPopup = () => {
  // @ts-ignore
  return browser.runtime.getURL('Distribution/Popup/index.html');
};

export const addonPrefixDashboard = () => {
  // @ts-ignore
  return browser.runtime.getURL('Distribution/Dashboard/index.html');
};

export const addonPrefixDashboardMenu = () => {
  // @ts-ignore
  return browser.runtime.getURL('Distribution/Dashboard/');
};

export const addonPrefix = () => {
  // @ts-ignore
  return browser.runtime.getURL('Distribution');
};

export const addonRoot = () => {
  // @ts-ignore
  return browser.runtime.getURL('');
};
