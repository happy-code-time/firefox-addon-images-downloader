const addToStore = (errorMessage: any = '', errorCode: number) => {
  sessionStorage.setItem('messagesApp', JSON.stringify(
    [
      {
        errorMessage,
        errorCode,
      }
    ]
  ));
};

export default addToStore;
