import errorMessagesGlobals from './errorMessagesGlobal';

const ClearStore = (type: string = errorMessagesGlobals.messagesApp.key) => {
  const { key } = errorMessagesGlobals[type];

  if (sessionStorage.getItem(key) !== null) {
    sessionStorage.removeItem(key);
  }
};

export default ClearStore;
