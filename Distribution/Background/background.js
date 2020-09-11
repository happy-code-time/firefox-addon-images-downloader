/**
 * Geet item from the local storage
 * @param {string} item
 */
const getItem = item => {
  try {
    return JSON.parse(localStorage.getItem(item));
  }
  catch (e) {
    return null;
  }
};

/**
 * Set item to the local storage
 * @param {string} name
 * @param {any} value
 */
const setItemToLocalStorage = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (error) { }
};

/**
 * Get users current active tab
 */
const getTab = () => {
  //@ts-ignore
  return browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      return false;
    });
};

/**
 * Tabs callbacks
 */
const onCreated = tab => {
  return true;
};

const onError = error => {
  return false;
};

/**
 * Set default request mechanisms
 */
const setAndGetDefaultDataStructure = () => {
  let data = getItem('data');

  if (null == data) {
    data = {
      media: {
        images: {},
      }
    };
    setItemToLocalStorage('data', data);
  }

  return data;
};

setAndGetDefaultDataStructure();

/**
 * Get only domain name
 * @param {string} url
 */
const getOnlyDomainName = url => {
  if (url) {
    return url.split('/')[2];
  }
  return '';
};

/**
 * Request listener
 */
const checkRequest = request => {
  let { documentUrl, tabId, url, type } = request;

  try {
    let data = setAndGetDefaultDataStructure();
    tabId = parseInt(tabId);
    const hostname = getOnlyDomainName(url);

    if (documentUrl && tabId && url && type && hostname) {
      /**
       * MEDIA
       */
      if ('image' == type) {
        if (undefined !== data.media.images[tabId]) {
          if (!data.media.images[tabId].includes(url)) {
            data.media.images[tabId].push(url);
          }
        } else {
          data.media.images[tabId] = [url];
        }
      }
      setItemToLocalStorage('data', data);
    }

    return {
      cancel: false,
    };
  } catch (error) {
    return {
      cancel: false,
    };
  }
};

// @ts-ignore
browser.webRequest.onBeforeRequest.addListener(
  checkRequest,
  {
    urls: ['<all_urls>'],
  }
);

/**
 * Get cookies from the current tab base on the current url
 * @param {object} tabData
 */
const getCookiesFromCurrentTab = tabData => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    browser.cookies
      .getAll({ url: tabData.url })
      .then(cookies => resolve(cookies))
      .catch(() => resolve([]));
  });
};

/**
 * Background message listener
 */

if(!getItem('localImages')){
  setItemToLocalStorage('localImages', []);  
}

if(null == getItem('allow-to-download')){
  setItemToLocalStorage('allow-to-download', false);
}

if(null == getItem('allowGifs')){
  setItemToLocalStorage('allowGifs', false);
}

if(null == getItem('allowJpgs')){
  setItemToLocalStorage('allowJpgs', true);
}

if(null == getItem('allowPngs')){
  setItemToLocalStorage('allowPngs', true);
}

if(null == getItem('filterByImagesWidth')){
  localStorage.setItem('filterByImagesWidth', '');
}

if(null == getItem('filterByImagesHeight')){
  localStorage.setItem('filterByImagesHeight', '');
}

if(null == localStorage.getItem('downloadicon')){
  localStorage.setItem('downloadicon', '📷');
}

//@ts-ignore
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { tab } = sender;

  switch (request.action) {
    case 'get-all' : {
      return sendResponse({
        downloadicon: localStorage.getItem('downloadicon'),
        allowToSave: getItem('allow-to-download'),
        allowGifs: getItem('allowGifs'),
        allowPngs: getItem('allowPngs'),
        allowJpgs: getItem('allowJpgs'),
        filterByImagesWidth: getItem('filterByImagesWidth'),
        filterByImagesHeight: getItem('filterByImagesHeight'),
        
      });
      break;
    }
    case 'set-filterByImagesWidth' : {
      return sendResponse(setItemToLocalStorage('filterByImagesWidth', request.value));
      break;
    }
    case 'set-filterByImagesHeight' : {
      return sendResponse(setItemToLocalStorage('filterByImagesHeight', request.value));
      break;
    }
    case 'set-allowJpgs' : {
      return sendResponse(localStorage.setItem('allowJpgs', request.allowJpgs));
      break;
    }
    case 'set-allowPngs' : {
      return sendResponse(localStorage.setItem('allowPngs', request.allowPngs));
      break;
    }
    case 'set-allowGifs' : {
      return sendResponse(localStorage.setItem('allowGifs', request.allowGifs));
      break;
    }
    case 'set-download-icon' : {
      return sendResponse(localStorage.setItem('downloadicon', request.downloadicon));
      break;
    }
    case 'get-download-icon' : {
      return sendResponse(getItem('downloadicon'));
      break;
    }
    case 'set-allow-to-download' : {
      return sendResponse(setItemToLocalStorage('allow-to-download', request.allowToSave));
      break;
    }
    case 'get-allow-to-download' : {
      return sendResponse(getItem('allow-to-download'));
      break;
    }
    case 'set-image-local-store' : {
      const localImages = getItem('localImages');
      const { source } = request;
      localImages.push(source);
      setItemToLocalStorage('localImages', localImages);
      return sendResponse(getItem('localImages'));
      break;
    }
    case 'remove-image-local-store' : {
      let localImages = getItem('localImages');
      const { source } = request;
      localImages = localImages.filter( i => i != source);
      setItemToLocalStorage('localImages', localImages);
      return sendResponse(getItem('localImages'));
      break;
    }
    case 'get-all-images-from-local-store' : {
      return sendResponse(getItem('localImages'));
      break;
    }
    case 'check-addons-availablitity': {
      return sendResponse(
        new Promise(resolve => {
          getTab()
            .then(async (activeTab) => {
              const { id } = activeTab[0];

              //@ts-ignore
              await browser.tabs.sendMessage(id, {
                action: 'check-addons-availablitity',
              })
                .then(() => {
                  resolve(true);
                })
                .catch(() => {
                  resolve(false);
                });
            })
            .catch(() => {
              resolve(false);
            });
        })
      );
      break;
    }
    case 'reset-data': {
      let data = setAndGetDefaultDataStructure();
      const { id } = tab;
      data.media.images[id] = [];

      setItemToLocalStorage('data', data);
      return sendResponse(true);
      break;
    }
    case 'get-all-images-by-tab-id': {
      let images = [];
      let hostname = '';
      let protocol = '';
      let href = '';

      //@ts-ignore
      browser.tabs.sendMessage(parseInt(request.tabId), {
        action: 'get-all-images'
      })
        .then(response => {
          hostname = response.hostname;
          images = response.images;
          protocol = response.protocol;
          href = response.href;
          hostname = getOnlyDomainName(href);

          return sendResponse({
            images,
            hostname,
            protocol,
            href
          });
        })
        .catch((error) => {
          return sendResponse({
            images,
            hostname,
            protocol,
            href
          });
        });

      break;
    }
    case 'get-all-tabs': {
      (async () => {
        //@ts-ignore
        const allTabs = await browser.tabs.query({}).then(data => data).catch(error => []);
        return sendResponse({
          data: setAndGetDefaultDataStructure(),
          allTabs
        });
      })();
      break;
    }
    case 'get-popup-security-data': {
      getTab().then(tabData => {
        if (tabData[0]) {
          const { id, url } = tabData[0];
          const domain = getOnlyDomainName(url);
          const blacklistedElementsTrackers = getItem('blacklistedElementsTrackers') ? getItem('blacklistedElementsTrackers') : [];
          const blacklistedElementsDomians = getItem('blacklistedElementsDomians') ? getItem('blacklistedElementsDomians') : [];
          const blacklistedElementsCookies = getItem('blacklistedElementsCookies') ? getItem('blacklistedElementsCookies') : [];
          const whitelistedElementsDomains = getItem('whitelistedElementsDomains') ? getItem('whitelistedElementsDomains') : [];
          const blacklistedElementsIframes = getItem('blacklistedElementsIframes') ? getItem('blacklistedElementsIframes') : [];

          let isBlackTrackers = false;
          let isBlackDomains = false;
          let isBlackCookies = false;
          let isWhiteDomains = false;
          let isWhiteIframes = false;

          if (blacklistedElementsTrackers.includes(domain)) {
            isBlackTrackers = true;
          }

          if (blacklistedElementsDomians.includes(domain)) {
            isBlackDomains = true;
          }

          if (blacklistedElementsCookies.includes(domain)) {
            isBlackCookies = true;
          }

          if (whitelistedElementsDomains.includes(domain)) {
            isWhiteDomains = true;
          }

          if (blacklistedElementsIframes.includes(domain)) {
            isWhiteIframes = true;
          }

          return sendResponse(
            {
              tabid: id,
              url,
              data: getItem('data'),
              domain,
              isBlackTrackers,
              isBlackDomains,
              isBlackCookies,
              isWhiteDomains,
              isWhiteIframes
            }
          );
        }
        else {
          return sendResponse(null);
        }
      })
        .catch(e => {
          return sendResponse(null);
        });
      break;
    }
    case 'get-active-tab': {
      getTab()
        .then(activeTab => {
          return sendResponse(activeTab[0]);
        })
        .catch(e => {
          return sendResponse(-1);
        });
      break;
    }
    case 'open-new-tab': {
      // @ts-ignore
      browser.tabs.create({
        url: request.url
      });
      return sendResponse(true);
      break;
    }
    case 'check-html-danger-word': {
      const { text } = request;

      if (!getItem('scanTextOnWebsite')) {
        return sendResponse({
          danger: false,
          text
        });
      }

      return getTab().then(tabData => {
        return sendResponse(checkDangerWords(text, tabData[0]));
      });
      break;
    }
    /**
     * Clear authentication
     */
    case 'unset-authentication': {
      localStorage.removeItem('authentication');
      return sendResponse(true);
      break;
    }
    /**
     * Set user authentication after success login
     */
    case 'set-authentication': {
      const { name, value } = request;
      localStorage.setItem(name, value);
      return sendResponse(true);
      break;
    }
    /**
     * Get authentication
     */
    case 'get-authentication': {
      // @ts-ignore
      return sendResponse(localStorage.getItem('authentication'));
      break;
    }
    /**
     * Open any link in new tab
     */
    case 'open-link-in-new-tab': {
      const { url } = request;
      //@ts-ignore
      const createTab = browser.tabs.create({ url });
      return sendResponse(createTab.then(onCreated, onError));
      break;
    }
    /**
     * Get current documents width
     * for the popup script
     */
    case 'get-document-width': {
      const defaultWidth = 350;

      getTab()
        .then(activeTab => {
          const { id } = activeTab[0];

          //@ts-ignore
          browser.tabs
            .sendMessage(id, {
              action: 'get-document-width',
            })
            .then(response => {
              const { documentWidth } = response;
              return sendResponse({ documentWidth });
            })
            .catch(error => {
              console.error(error);
              return sendResponse({ documentWidth: defaultWidth });
            });
        })
        .catch(error => {
          console.error(error);
          return sendResponse({ documentWidth: defaultWidth });
        });
      break;
    }

    /**
     * Get data for popup from content script
     */
    case 'get-all-popup': {
      let language = localStorage.getItem('globalLanguage');

      if (null == language) {
        localStorage.setItem('globalLanguage', 'en');
        language = 'en';
      }

      getTab()
        .then(activeTab => {
          return sendResponse({
            language,
            activeTab,
          });
        })
        .catch(() => {
          return sendResponse({
            language,
            activeTab: {},
          });
        });
      break;
    }

    default:
      {
        return sendResponse(null);
      }
      return true;
  }

  return true;
});