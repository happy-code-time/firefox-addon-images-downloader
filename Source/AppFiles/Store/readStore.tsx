import errorMessagesGlobals from './errorMessagesGlobal';

const ReadStore = (type: string) => {
  const { key } = errorMessagesGlobals[type];

  if (sessionStorage.getItem(key) !== null) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  return [];
};

export default ReadStore;
