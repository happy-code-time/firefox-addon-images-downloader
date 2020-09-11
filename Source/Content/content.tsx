import axios from 'axios';

import * as FileSaver from 'file-saver';

import customKey from '../AppFiles/Functions/customKey';

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
 * Download icon
 */
let downloadicon = '🔰';
//@ts-ignore
browser.runtime.sendMessage({ action: 'get-all' }).then( data => { downloadicon = data.downloadicon });

/**
 * Allow gifs or disable
 */
let allowGifs = false;
//@ts-ignore
browser.runtime.sendMessage({ action: 'get-all' }).then( data => { allowGifs = data.allowGifs });

/**
 * Allow pngs or disable
 */
let allowPngs = true;
//@ts-ignore
browser.runtime.sendMessage({ action: 'get-all' }).then( data => { allowPngs = data.allowPngs });

/**
 * Allow jpgs or disable
 */
let allowJpgs = true;
//@ts-ignore
browser.runtime.sendMessage({ action: 'get-all' }).then( data => { allowJpgs = data.allowJpgs });

/**
 * Filter by images width
 */
let filterByImagesWidth = 0;
//@ts-ignore
browser.runtime.sendMessage({ action: 'get-all' }).then( data => { filterByImagesWidth = data.filterByImagesWidth });

/**
 * Filter by images heigth
 */
let filterByImagesHeight = 0;
//@ts-ignore
browser.runtime.sendMessage({ action: 'get-all' }).then( data => { filterByImagesHeight = data.filterByImagesHeight });

let generatingDownloader = false;

class ImagesManager {

  /**
   * Get filetype from href as fallback
   * @param {string} href 
   */
  getFileTypeFromHref(href) {
    const possibleTypes = ['svg', 'png', 'jpg', 'jpeg', 'ico', 'gif', 'tif', 'eps', 'pdf', 'psd', 'indd', 'bmp', 'webp'];

    for (let x = 0; x <= possibleTypes.length - 1; x++) {
      const type = possibleTypes[x];
      const last4Chars = href.substr(href.length - 4);
      const last3Chars = href.substr(href.length - 3);

      if (type === last4Chars || type === last3Chars) {
        return type;
      }
    }

    if (-1 !== href.indexOf('data:image/jpg') || -1 !== href.indexOf('data:image/jpeg')) {
      return 'jpeg';
    }

    if (-1 !== href.indexOf('data:image/png')) {
      return 'png';
    }

    return 'jpeg';
  }

  /**
   * Get filetype from content-type
   * @param {string} contentType 
   */
  getFileTypeFromContentTypeResponse(contentType) {
    if (-1 !== contentType.indexOf('jpg') || -1 !== contentType.indexOf('jpeg')) {
      return 'jpeg';
    }

    if (-1 !== contentType.indexOf('png')) {
      return 'png';
    }

    if (-1 !== contentType.indexOf('svg')) {
      return 'svg';
    }

    if (-1 !== contentType.indexOf('gif')) {
      return 'gif';
    }

    if (-1 !== contentType.indexOf('webp')) {
      return 'webp';
    }

    if (-1 !== contentType.indexOf('icon')) {
      return 'ico';
    }

    const unknownType = contentType.split('/');

    if (undefined !== unknownType[1]) {
      return unknownType[1];
    }

    return 'jpeg';
  }

  /**
   * Generate a href targets href
   * to download the image
   * @param {string} href 
   */
  saveImage(href) {
    axios
      .get(href)
      .then(content => {
        /**
         * First request is to get the correct content-type
         * for jpg is the content-type: image/jpeg
         * for png is the content-type: image/png
         */
        const optionsBlob: any = { responseType: 'blob' };

        axios
          .get(href, optionsBlob)
          .then(contentBlob => {
            /**
             * Main request to get the content as blob
             */
            const { headers } = content; // content from the 1 request
            const { data } = contentBlob;
            const imageType = headers['content-type'];

            try {
              const fileType = this.getFileTypeFromHref(href);
              const type = (undefined !== imageType) ? imageType : 'image/.' + fileType;
              const fileEnd = this.getFileTypeFromContentTypeResponse(type);
              const fileName = `${customKey()}.${fileEnd}`;
              const blob = new Blob([data], { type });
              FileSaver.saveAs(blob, fileName);
            }

            catch (error) {
              console.error(`File generation error: ${error}`, -1);
            }
          })
          .catch(error => {
            console.error(`File generation error: ${error}`, -1);
          })
      })
      .catch(error => {
        console.error(`File generation error: ${error}`, -1);
      });
  }

  generateDownloader() {
    const self = this;

    if (generatingDownloader) {
      return null;
    }

    generatingDownloader = true;
    const images = document.getElementsByTagName('IMG');
    let canRender = true;

    for (let x = 0; x <= images.length - 1; x++) {

      const singleImage: any = images[x];

      if ('1' !== singleImage.getAttribute('imagesdownloader') && singleImage.src) {

        try {
          const divArroundTheImage = document.createElement('DIV');
          divArroundTheImage.setAttribute('style', 'position: absolute; z-index: 10; top: 0px; left: 0px; display: block; width: 100%; height: 100%;');
          singleImage.parentElement.style.position = 'relative';
          singleImage.parentElement.style.zIndex = '9';

          singleImage.parentElement.appendChild(divArroundTheImage);
          singleImage.setAttribute('imagesdownloader', '1');

          const downloadButton = document.createElement('div');
          downloadButton.textContent = downloadicon;
          downloadButton.setAttribute('style', 'z-index: 999999; position: absolute; top: 5px; left: 5px; cursor: pointer; font-size: 21px; line-height: 1; text-align: left;');
          
          downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();

            let src = singleImage.src;
            let link = singleImage.src;
            const { hostname, protocol } = window.location;

            /**
             * Build valid link
             */
            if (-1 === src.indexOf('http://') && -1 === src.indexOf('https://') && -1 === src.indexOf('data:image') && -1 === src.indexOf('moz-extension://')) {

                if ('/' !== src.charAt(0)) {
                    src = `/${src}`;
                }

                link = `${protocol}//${hostname}${src}`;
            }

            /**
             * If the link has // - 2 slashes as prefix, remove them
             */
            if ('//' == src.substr(0, 2)) {
                link = `${protocol}//${src.substr(2, src.length)}`;
            }

            self.saveImage(singleImage.src);
          });

          if(('gif' == this.getFileTypeFromHref(singleImage.src) || -1 !== singleImage.src.indexOf('.gif')) && !allowGifs){
            canRender = false;
          }

          if(('jpg' == this.getFileTypeFromHref(singleImage.src) || 'jpeg' == this.getFileTypeFromHref(singleImage.src)) && !allowJpgs){
            canRender = false;
          }

          if('png' == this.getFileTypeFromHref(singleImage.src) && !allowPngs){
            canRender = false;
          }

          const singleImageWidth = singleImage.naturalWidth || singleImage.clientWidth || singleImage.width;
          const singleImageHeight = singleImage.naturalHeight || singleImage.clientHeight || singleImage.height;
          

          if(filterByImagesWidth && singleImageWidth && singleImageWidth <= filterByImagesWidth){
            canRender = false;
          }

          if(filterByImagesHeight && singleImageHeight && singleImageHeight <= filterByImagesHeight){
            canRender = false;
          }

          if(canRender){
            divArroundTheImage.appendChild(downloadButton);
            singleImage.parentElement.appendChild(divArroundTheImage);
          }
        }
        catch (e) {
          console.error(e);
        }

      }

    }

    generatingDownloader = false;
    return null;
  }

  getAllImages() {
    const images = document.getElementsByTagName('IMG');
    const imageSrc = [];
    const tempImages = [];

    for (let x = 0; x <= images.length - 1; x++) {
      const src = images[x].getAttribute('src');
      const currentImage: any = images[x];

      if (src && !tempImages.includes(src)) {
        tempImages.push(src);
        imageSrc.push({
          src,
          width: currentImage.naturalWidth || currentImage.clientWidth || currentImage.width,
          height: currentImage.naturalHeight || currentImage.clientHeight || currentImage.height
        })
      }
    }

    return imageSrc;
  }
}

/**
 * Background listener
 */
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
        images: Images.getAllImages(),
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

const Images = new ImagesManager();

/**
 * Wait for "document"
 */
var timeouter;

const checkElementsToStart = () => {
  if (document == undefined || document.body == undefined) {
    clearTimeout(timeouter);

    return (timeouter = setTimeout(() => {
      checkElementsToStart();
    }, 5));
  }

  clearTimeout(timeouter);

  document.addEventListener('readystatechange', async () => {
    //@ts-ignore
    await browser.runtime.sendMessage({ action: 'get-allow-to-download' })
    .then( allow => {
      if(allow){
        Images.generateDownloader();
      }
    })
    .catch( e => {});
  });
};

setInterval( async () => {
    //@ts-ignore
    await browser.runtime.sendMessage({ action: 'get-allow-to-download' })
    .then( allow => {
      if(allow){
        Images.generateDownloader();
      }
    })
    .catch( e => {});

}, 10000);

checkElementsToStart();