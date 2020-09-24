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

let downloadicon = '🔰';
let allowGifs = false;
let allowPngs = true;
let allowJpgs = true;
let allowSvgs = false;
let allowIcos = false;
let allowWebp = false;
let filterByImagesWidth = 0;
let filterByImagesHeight = 0;
let downloadiconsize = 16;
let globalLanguage = 'en';

//@ts-ignore
browser.runtime.sendMessage({ action: 'get-all' }).then(data => {
  downloadicon = data.downloadicon;
  allowGifs = data.allowGifs;
  allowPngs = data.allowPngs;
  allowJpgs = data.allowJpgs;
  allowSvgs = data.allowSvgs;
  allowIcos = data.allowIcos;
  allowWebp = data.allowWebp;
  filterByImagesWidth = data.filterByImagesWidth;
  filterByImagesHeight = data.filterByImagesHeight;
  downloadiconsize = data.downloadiconsize;
  globalLanguage = data.globalLanguage;
});

let generatingDownloader = false;

class ImagesManager {

  constructor() {
    this.generateSlider = this.generateSlider.bind(this);
    this.setState = this.setState.bind(this);
    this.updateSlider = this.updateSlider.bind(this);

    //@ts-ignore
    this.state = {
      currentSlide: 0,
      maxSlides: 0,
      imagesPerSlide: 7,
      sliderWidth: 0
    };
  }

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

  generateDownloader(forceDownload = false) {
    const self = this;

    if (generatingDownloader && !forceDownload) {
      return null;
    }

    generatingDownloader = true;
    const images = document.getElementsByTagName('IMG');
    let canRender = true;

    for (let x = 0; x <= images.length - 1; x++) {
      const singleImage: any = images[x];

      if ('1' !== singleImage.getAttribute('imagesdownloader') && singleImage.src) {
        canRender = true;

        try {
          const divArroundTheImage = document.createElement('DIV');
          divArroundTheImage.setAttribute('style', 'position: absolute; z-index: 10; top: 0px; left: 0px; display: block; width: 100%; height: 100%;');
          singleImage.parentElement.style.position = 'relative';
          singleImage.parentElement.style.zIndex = '9';

          singleImage.parentElement.appendChild(divArroundTheImage);
          singleImage.setAttribute('imagesdownloader', '1');

          const downloadButton = document.createElement('div');
          downloadButton.textContent = downloadicon;
          downloadButton.setAttribute('style', `z-index: 999999; position: absolute; top: 5px; left: 5px; cursor: pointer; font-size: 21px; line-height: 1; text-align: left; font-size: ${downloadiconsize}px; `);

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

          if (('gif' == this.getFileTypeFromHref(singleImage.src) || -1 !== singleImage.src.indexOf('.gif')) && !allowGifs) {
            canRender = false;
          }

          if (('jpg' == this.getFileTypeFromHref(singleImage.src) || 'jpeg' == this.getFileTypeFromHref(singleImage.src)) && !allowJpgs) {
            canRender = false;
          }

          if ('png' == this.getFileTypeFromHref(singleImage.src) && !allowPngs) {
            canRender = false;
          }

          if ('svg' == this.getFileTypeFromHref(singleImage.src) && !allowSvgs) {
            canRender = false;
          }

          if ('webp' == this.getFileTypeFromHref(singleImage.src) && !allowWebp) {
            canRender = false;
          }

          if ('ico' == this.getFileTypeFromHref(singleImage.src) && !allowIcos) {
            canRender = false;
          }

          const singleImageWidth = singleImage.naturalWidth || singleImage.clientWidth || singleImage.width;
          const singleImageHeight = singleImage.naturalHeight || singleImage.clientHeight || singleImage.height;


          if (filterByImagesWidth && singleImageWidth && singleImageWidth <= filterByImagesWidth) {
            canRender = false;
          }

          if (filterByImagesHeight && singleImageHeight && singleImageHeight <= filterByImagesHeight) {
            canRender = false;
          }

          if (canRender) {
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

  generateHTMLElement(type = 'DIV', attributes = [], clickEvent = undefined, textContent = '') {
    const DOMElement = document.createElement(type);

    if (attributes && attributes.length) {
      for (let x = 0; x <= attributes.length - 1; x++) {
        DOMElement.setAttribute(attributes[x].name, attributes[x].value);
      }
    }

    if (clickEvent && 'function' == typeof clickEvent) {
      DOMElement.removeEventListener('click', clickEvent);
      DOMElement.addEventListener('click', clickEvent);
    }

    if (textContent && typeof '8' == typeof textContent) {
      DOMElement.textContent = textContent;
    }

    return DOMElement;
  }

  setState(object) {
    const self = this;
    const keys = Object.keys(object);

    for (let x = 0; x <= keys.length - 1; x++) {
      //@ts-ignore
      if (self.state[keys[x]] !== object[keys[x]]) {
        //@ts-ignore
        self.state[keys[x]] = object[keys[x]];
      }

    }

    this.updateSlider();
  }

  updateSlider() {
    const slider = document.getElementById('download-images-slider-ul');

    if (slider) {
      //@ts-ignore
      const { currentSlide } = this.state;
      //@ts-ignore
      const defaultStyle = `position: absolute; top: 0; width: ${this.state.sliderWidth}%; height: 150px; z-index: 1; transition-duration: 200ms; margin: 0; padding: 0;`;

      if (0 == currentSlide) {
        slider.setAttribute('style', `${defaultStyle} left: 0%`);
      }
      else {
        slider.setAttribute('style', `${defaultStyle} left: -${currentSlide * 100}%`);
      }
    }
  }

  generateSlider() {
    const self = this;
    const images = this.getAllImages();

    if (document.documentElement && images && images.length) {

      try {
        let maxSlides = -1;

        for (let x = 0; x <= images.length - 1; x++) {
          //@ts-ignore
          if (x > 0 && x !== images.length - 1 && 0 == x % this.state.imagesPerSlide) {
            maxSlides += 1;
          }
        }

        if(0 > maxSlides){
          maxSlides = 0;
        }

        self.setState(
          {
            maxSlides,
            //@ts-ignore
            sliderWidth: (100 * (maxSlides + 1))
          }
        );
        /**
         * Remove slider
         */
        this.removeSlider();
        /**
         * App
         */
        const app = self.generateHTMLElement(
          'DIV',
          [
            {
              name: 'id',
              value: 'image-downloader-slider'
            },
            {
              name: 'style',
              value: 'position: fixed; z-index: 9999999; left: 0; top: 0; width: 100vw; height: 100vh; overflow: hidden; background-color: rgba(0,0,0,0.9); '
            }
          ]
        );

        document.documentElement.appendChild(app);
        /**
         * Content site
         */
        const content = self.generateHTMLElement(
          'DIV',
          [
            {
              name: 'style',
              value: 'position: fixed; left: 0; bottom: 150px; width: 100vw; height: calc(100vh - 150px); overflow: hidden; display: flex;'
            }
          ]
        );
        /**
         * Bottom site
         */
        const bottom = self.generateHTMLElement(
          'DIV',
          [
            {
              name: 'style',
              value: 'position: fixed; left: 0; bottom: 0; width: 100vw; height: 150px; overflow-x: auto; overflow-y: hidden;'
            }
          ]
        );

        const slideLeftCallback = () => {
          const images = document.getElementsByTagName('IMG');

          if (document.documentElement && images && images.length) {
            //@ts-ignore
            const { maxSlides } = this.state;
            //@ts-ignore
            let { currentSlide } = this.state;

            if (maxSlides && currentSlide > 0) {
              currentSlide -= 1;

              this.setState({ currentSlide });
            }
          }
        }

        const slideLeft = self.generateHTMLElement(
          'DIV',
          [
            {
              name: 'style',
              value: 'position: fixed; left: 10px; bottom: 50px; font-size: 21px; width: 50px; height: 50px; border-radius: 50%; z-index: 2; cursor: pointer; background-color: #1873CC; color: rgb(255,255,255); font-weight: bold; line-height: 50px; text-align:center;'
            }
          ],
          slideLeftCallback,
          '<'
        );

        const slideRightCallback = () => {
          const images = document.getElementsByTagName('IMG');

          if (document.documentElement && images && images.length) {
            //@ts-ignore
            const { maxSlides } = this.state;
            //@ts-ignore
            let { currentSlide } = this.state;

            if (maxSlides && currentSlide < maxSlides) {
              currentSlide += 1;

              this.setState({ currentSlide });
            }
          }
        }

        const slideRigth = self.generateHTMLElement(
          'DIV',
          [
            {
              name: 'style',
              value: 'position: fixed; right: 10px; bottom: 50px; font-size: 21px; width: 50px; height: 50px; border-radius: 50%; z-index: 2; cursor: pointer; background-color: #1873CC; color: rgb(255,255,255); font-weight: bold; line-height: 50px; text-align:center;'
            }
          ],
          slideRightCallback,
          '>'
        );

        const sliderUlHolder = self.generateHTMLElement(
          'DIV',
          [
            {
              name: 'style',
              value: 'position: fixed; left: 60px; bottom: 0; width: calc(100vw - 130px); height: 150px; z-index: 1; overflow: hidden;'
            }
          ],
        );

        const sliderUl = self.generateHTMLElement(
          'UL',
          [
            {
              name: 'style',
              //@ts-ignore
              value: `position: absolute; margin: 0; padding: 0; left: 0; top: 0; width: ${this.state.sliderWidth}%; height: 150px; z-index: 1; transition-duration: 200ms;`
            },
            {
              name: 'id',
              value: 'download-images-slider-ul'
            }
          ],
        );

        /**         
         * Appends
         */
        app.appendChild(content);
        app.appendChild(bottom);
        bottom.appendChild(slideLeft);
        bottom.appendChild(slideRigth);
        bottom.appendChild(sliderUlHolder);
        sliderUlHolder.appendChild(sliderUl);

        /**
         * Generate images left site
         */

        for (let x = 0; x <= images.length - 1; x++) {
          const singleImage: any = images[x];

          if (singleImage.src) {

            const imagesDiv = self.generateHTMLElement(
              'LI',
              [
                {
                  name: 'style',
                  //@ts-ignore
                  value: `width: calc(${parseInt(100 / this.state.imagesPerSlide)}vw - ${parseInt(100 / this.state.imagesPerSlide)}px - 30px); margin: 10px 40px; height: 130px; border-radius: 5px; display: flex; float: left; padding: 0;`
                },
              ]
            );

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

            const targetImage = self.generateHTMLElement(
              'IMG',
              [
                {
                  name: 'style',
                  value: 'display: block; margin: auto; cursor: pointer; max-width: 100%; max-height: 100%;'
                },
                {
                  name: 'src',
                  value: link
                },
              ]
            );

            targetImage.addEventListener('click', (e) => {
              /**
               * Image preview
               */
              let target = document.getElementById('image-holder');

              if (target) {
                target.parentElement.removeChild(target);
              }

              target = self.generateHTMLElement(
                'IMG',
                [
                  {
                    name: 'id',
                    value: 'image-holder'
                  },
                  {
                    name: 'style',
                    value: 'display: block; margin: auto; max-width: 80vw; max-height: 80vh;'
                  },
                  {
                    name: 'class',
                    value: 'images-to-save'
                  },
                  {
                    name: 'src',
                    value: link
                  },
                ]
              );

              content.appendChild(target);

              /**
               * Download image button
               */
              let targetDownload = document.getElementById('image-downloader-download');

              if (targetDownload) {
                targetDownload.parentElement.removeChild(targetDownload);
              }

              let targetDownloadTitle = 'Download';

              if ('de' == globalLanguage) {
                targetDownloadTitle = 'Herunterladen';
              }

              if ('pl' == globalLanguage) {
                targetDownloadTitle = 'Pobierz';
              }

              targetDownload = self.generateHTMLElement(
                'DIV',
                [
                  {
                    name: 'id',
                    value: 'image-downloader-download'
                  },
                  {
                    name: 'style',
                    value: 'position: fixed; right: 80px; top: 10px; cursor: pointer; font-size: 28px;'
                  },
                  {
                    name: 'title',
                    value: targetDownloadTitle
                  }
                ],
                undefined,
                '📥'
              );

              targetDownload.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
                self.saveImage(link);
              });

              /**
               * Open in new tb
               */
              let targetOpenInNewTab = document.getElementById('image-downloader-open-in-new-tab');

              if (targetOpenInNewTab) {
                targetOpenInNewTab.parentElement.removeChild(targetOpenInNewTab);
              }

              let targetOpenInNewTabTitle = 'Open in new tab';

              if ('de' == globalLanguage) {
                targetOpenInNewTabTitle = 'Im neuen Tab öffnen';
              }

              if ('pl' == globalLanguage) {
                targetOpenInNewTabTitle = 'Otwórz w nowej karcie';
              }

              targetOpenInNewTab = self.generateHTMLElement(
                'A',
                [
                  {
                    name: 'id',
                    value: 'image-downloader-open-in-new-tab'
                  },
                  {
                    name: 'style',
                    value: 'position: fixed; right: 140px; top: 10px; cursor: pointer; font-size: 28px; text-decoration: none; color: rgb(255,255,255);'
                  },
                  {
                    name: 'title',
                    value: targetOpenInNewTabTitle
                  },

                  {
                    name: 'href',
                    value: link
                  },
                  {
                    name: 'target',
                    value: '_blank'
                  },
                ],
                undefined,
                '🗺'
              );

              content.appendChild(targetDownload);
              content.appendChild(targetOpenInNewTab);
            });

            sliderUl.appendChild(imagesDiv);
            imagesDiv.appendChild(targetImage);
          }
        }

        /**
         * Close icon
         */
        let closeIconTitle = 'Remove slider';

        if ('de' == globalLanguage) {
          closeIconTitle = 'Slider entfernen';
        }

        if ('pl' == globalLanguage) {
          closeIconTitle = 'Usuń slider';
        }

        const closeIcon = self.generateHTMLElement(
          'DIV',
          [
            {
              name: 'style',
              value: 'position: fixed; right: 20px; top: 10px; cursor: pointer; font-size: 28px;'
            },
            {
              name: 'title',
              value: closeIconTitle
            },
          ],
          self.removeSlider,
          '❌'
        );
        content.appendChild(closeIcon);

      }
      catch (e) {
        console.error(e);
      }
    }
  }

  removeSlider() {
    const slider = document.getElementById('image-downloader-slider');

    if (slider) {
      slider.parentElement.removeChild(slider);
    }
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
  const ImagesfastAction = new ImagesManager();

  switch (request.action) {
    case 'generate-single-download-images': {
      ImagesfastAction.generateDownloader(true);
      return Promise.resolve(true);
      break;
    }
    case 'generate-single-slider-images': {
      ImagesfastAction.generateSlider();
      return Promise.resolve(true);
      break;
    }
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
      .then(allow => {
        if (allow) {
          Images.generateDownloader();
        }
      })
      .catch(e => { });
  });
};

setInterval(async () => {
  //@ts-ignore
  await browser.runtime.sendMessage({ action: 'get-allow-to-download' })
    .then(allow => {
      if (allow) {
        Images.generateDownloader();
      }
    })
    .catch(e => { });

}, 10000);

checkElementsToStart();