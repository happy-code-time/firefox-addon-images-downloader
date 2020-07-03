import errorMessagesGlobals from './errorMessagesGlobal';

const clearStore = (type: string = errorMessagesGlobals.networkErrors.key) => {
  const { key } = errorMessagesGlobals[type];

  if (sessionStorage.getItem(key) !== null) {
    sessionStorage.removeItem(key);
  }
};

export default clearStore;
