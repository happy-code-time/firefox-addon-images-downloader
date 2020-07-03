/**
 * Reset status for tracking etc....
 * stored temporary in the background script
 */
// @ts-ignore
browser.runtime.sendMessage({ action: 'reset-data' });

/**
 * If user leaves the tab
 */
window.onbeforeunload = () => {
  // @ts-ignore
  browser.runtime.sendMessage({ action: 'reset-data' });
};

/**
 * Background listener
 */
const getAllImages = () => {
  const images = document.getElementsByTagName('IMG');
  const imageSrc = [];
  const tempImages = [];

  for (let x = 0; x <= images.length - 1; x++) {
    const src = images[x].getAttribute('src');

    if (src && !tempImages.includes(src)) {
      tempImages.push(src);
      imageSrc.push({
        src,
        width: images[x].naturalWidth || images[x].clientWidth || images[x].width,
        height: images[x].naturalHeight || images[x].clientHeight || images[x].height
      })
    }
  }

  return imageSrc;
}

// @ts-ignore
browser.runtime.onMessage.addListener(request => {
  switch (request.action) {
    case 'check-addons-availablitity': {
      return Promise.resolve(true);
      break;
    }
    case 'get-all-images': {
      return Promise.resolve({
        hostname: window.location.host || window.location.hostname,
        images: getAllImages(),
        protocol: window.location.protocol,
        href: window.location.href
      });
    }
    case 'get-document-width': {
      return Promise.resolve({
        documentWidth: document.documentElement.getBoundingClientRect().width,
      });
      break;
    }
    default: {
      break;
    }
  }
  return true;
});