import * as React from 'react';

import getTranslations from '../../Translations/index';

import NoDataImages from '../../AppFiles/Modules/NoDataImages';

import * as FileSaver from 'file-saver';

import axios from 'axios';

import customKey from '../../AppFiles/Functions/customKey';

import LoadingAnimation from '../../AppFiles/Modules/LoadingAnimation';

import SelectWrapperBlock from '../../AppFiles/Modules/SelectWrapperBlock';

import FullScreenList from '../../AppFiles/Modules/FullScreenList';

interface WebsiteContainerProps {
    contentData?: string | any;
    loginRequired: boolean;
    redirectAfterLogin?: string;
}

class ImagesRequests extends React.Component<WebsiteContainerProps> {

    public translations: {
        [key: string]: any
    };

    public state: {
        [key: string]: any
    };

    public getDataInterval: any;

    constructor(props: WebsiteContainerProps) {
        super(props);
        this.getData = this.getData.bind(this);
        this.callback = this.callback.bind(this);
        this.callback = this.callback.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.getPagerJsx = this.getPagerJsx.bind(this);
        this.saveImage = this.saveImage.bind(this);
        this.setType = this.setType.bind(this);
        this.setItemsPerSite = this.setItemsPerSite.bind(this);

        this.state = {
            minifiedSecondSideBar: true,
            isMinified: true,
            sidebarMin: true,
            contentMin: true,
            minifiedSaver: true,
            language: 'en',
            activeTab: {},
            contentData: this.props.contentData ? this.props.contentData : '',
            loginRequired: this.props.loginRequired,
            redirectAfterLogin: this.props.redirectAfterLogin ? this.props.redirectAfterLogin : '',
            images: 0,
            tabid: '',
            /**
             * images
             */
            items: [],
            itemsWithType: [],
            hostname: '',
            protocol: '',
            href: '',
            itemsToRenderJsx: [],
            filteredTypes: 'all',
            availableTypes: [],
            loadingTabsDone: false,
            currentImagesAndType: [],
            /**
             * pager
             */
            itemsPerSite: 10,
            currentPage: 0,
            itmes: [],
            displayFullscreenlist: false,
            displayFullscreenlistFilter: false,
        };

        this.translations = getTranslations();
    }

    componentDidMount() {
        this.getData();
    }

    /**
     * Get the images type
     */
    async getImagesType(url = '') {
        let type = '';

        if (url) {
            type = await axios
                .get(url)
                .then(content => {
                    const { headers } = content;
                    return headers['content-type'];
                })
                .catch(error => {

                })
        }

        return type;
    }

    getData(resetFilter: boolean = true) {
        let { itemsPerSite, currentPage, items, itemsWithType, filteredTypes } = this.state;

        const data: string | null = localStorage.getItem('data') ? localStorage.getItem('data') : null;

        if (data) {
            // @ts-ignore
            browser.runtime.sendMessage({
                action: 'get-active-tab'
            })
                .then(async (tab: { id: number, url: string }) => {
                    if (tab && undefined !== tab.id && null !== tab.id && -1 !== tab.id && -1 !== tab.url.indexOf('http')) {
                        const parsedDatadata = JSON.parse(data);
                        const { media } = parsedDatadata;

                        if (undefined !== media.images && undefined !== media.images[`${tab.id}`]) {

                            const imagesContentScript = await this.getAllImagesContentScript(tab.id);
                            let { images, protocol, hostname } = imagesContentScript;

                            /**
                             * Content images
                             * 
                             * Merge images from content script
                             * with images from requests
                             * and avoid dupplicates
                             */
                            if (resetFilter) {
                                filteredTypes = 'all';
                                itemsPerSite = 10;
                                currentPage = 0;
                                items = [];
                                itemsWithType = [];

                                this.setState({
                                    animationLoading: true,
                                    itemsPerSite,
                                    currentPage,
                                    filteredTypes,
                                }, async () => {

                                });

                                const availableTypesTemp = [];
                                const difference = [];
                                const availableTypes = [
                                    {
                                        text: 'All',
                                        value: 'all',
                                    }
                                ];

                                /**
                                 * Background images
                                 */
                                const imagesBackground = media.images[`${tab.id}`];

                                for (let x = 0; x <= imagesBackground.length - 1; x++) {
                                    const type = await this.getImagesType(imagesBackground[x]);

                                    itemsWithType.push({
                                        link: imagesBackground[x],
                                        type
                                    });

                                    if (!items.includes(imagesBackground[x])) {
                                        items.push(imagesBackground[x]);
                                    }
                                }

                                for (let x = 0; x <= itemsWithType.length - 1; x++) {
                                    const type = itemsWithType[x].type;

                                    if (!availableTypesTemp.includes(type) && '' !== type && undefined !== type) {
                                        availableTypesTemp.push(type);

                                        availableTypes.push(
                                            {
                                                'text': type,
                                                'value': type
                                            }
                                        );
                                    }

                                    if (undefined !== type && '' !== type) {
                                        if ('all' == filteredTypes) {
                                            difference.push({
                                                source: itemsWithType[x].link,
                                                type
                                            });
                                        }
                                        else {
                                            if (type === filteredTypes) {
                                                difference.push({
                                                    source: items[x].link,
                                                    type
                                                });
                                            }
                                        }
                                    }
                                }

                                this.setState({
                                    activeTabId: tab.id,
                                    tabid: tab.id,
                                    items: difference,
                                    itemsWithType,
                                    hostname,
                                    protocol,
                                    availableTypes,
                                    filteredTypes,
                                    itemsPerSite
                                }, () => {
                                    this.callback()
                                });
                            }

                            /**
                             * Get all images by filter
                             */
                            else {
                                const difference = [];
                                const tempLinks = [];

                                this.setState({
                                    animationLoading: true,
                                    itemsPerSite,
                                    currentPage,
                                    filteredTypes,
                                }, () => {

                                    for (let x = 0; x <= itemsWithType.length - 1; x++) {
                                        const type = itemsWithType[x].type;

                                        if (undefined !== type && '' !== type && !tempLinks.includes(itemsWithType[x].link)) {
                                            if ('all' == filteredTypes) {
                                                tempLinks.push(itemsWithType[x].link);
                                                difference.push({
                                                    source: itemsWithType[x].link,
                                                    type
                                                });
                                            }
                                            else {
                                                if (type === filteredTypes) {
                                                    tempLinks.push(itemsWithType[x].link);
                                                    difference.push({
                                                        source: itemsWithType[x].link,
                                                        type
                                                    });
                                                }
                                            }
                                        }
                                    }

                                    this.setState({
                                        activeTabId: tab.id,
                                        items: difference,
                                        filteredTypes
                                    }, () => {
                                        this.callback()
                                    });
                                })
                            }
                        }
                    }
                })
                .catch(e => {

                })
        }
    }

    callback() {
        let { currentPage, itemsPerSite, items } = this.state;
        currentPage = parseInt(currentPage);
        itemsPerSite = parseInt(itemsPerSite);

        const start = (currentPage) * itemsPerSite;
        const end = start + itemsPerSite;

        this.setState({
            itemsToRender: items.slice(start, end)
        }, () => {
            this.generateImagesJsx()
        });
    }

    /**
     * Main images to render
     */
    generateImagesJsx() {
        const { itemsToRender, protocol, hostname } = this.state;
        const itemsToRenderJsx = [];

        for (let x = 0; x <= itemsToRender.length - 1; x++) {
            let src = itemsToRender[x].source;

            if (src && typeof 'react' === typeof src) {
                let link = src;

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

                itemsToRenderJsx.push({
                    source: link,
                    type: itemsToRender[x].type
                });
            }
        }

        this.setState({
            itemsToRenderJsx,
            animationLoading: false,
        });
    }

    /**
     * Get all images from content script
     */
    async getAllImagesContentScript(tabid: number) {
        // @ts-ignore
        return await browser.runtime.sendMessage({
            action: 'get-all-images-by-tab-id',
            tabId: tabid
        })
            .then(response => response)
            .catch((error) => [])
    }

    /**
     * Change page - previous
     */
    prev() {
        let { currentPage } = this.state;

        if (currentPage !== 0) {
            this.setState({
                currentPage: currentPage - 1
            }, () => {
                this.callback();
            })
        }
    }

    /**
     * Change page - next
     */
    next() {
        let { itemsPerSite, currentPage, items } = this.state;
        const currentCount = items.length;

        let mainPage = currentPage;
        mainPage++;

        if (itemsPerSite * mainPage < currentCount) {
            this.setState({
                currentPage: currentPage + 1
            }, () => {
                this.callback();
            })
        }
    }

    /**
     * Display full screen list, items per site
     */
    displayFullscreenlist(listname: string) {
        this.setState({
            [listname]: !this.state[listname]
        });
    }

    /**
     * Get paging functionality
     */
    getPagerJsx() {
        let { itemsPerSite, currentPage, items, filteredTypes } = this.state;
        const currentCount = items.length;
        let mainPage = currentPage;
        mainPage++;

        return (
            <div className="paging">
                <span className="filters">
                    <SelectWrapperBlock
                        callback={(e) => this.displayFullscreenlist('displayFullscreenlistFilter')}
                        iconDown='🔻'
                        iconAttributes={undefined}
                        title={`${this.translations.filter}: `}
                        selectedType={filteredTypes}
                    />
                    <br />
                    <SelectWrapperBlock
                        callback={(e) => this.displayFullscreenlist('displayFullscreenlist')}
                        iconDown='🔻'
                        iconAttributes={undefined}
                        title={`${this.translations.itemsPerSite}: `}
                        selectedType={JSON.stringify(itemsPerSite)}
                    />
                </span>
                <span className="buttons">
                    <i
                        onClick={(e) => this.prev()}
                        className={currentPage !== 0 ? 'fas fa-angle-left prev-button' : 'fas fa-angle-left prev-button deactivated'}
                    >
                    </i>
                    <i
                        onClick={(e) => this.next()}
                        className={itemsPerSite * mainPage < currentCount ? 'fas fa-angle-right next-button' : 'fas fa-angle-right next-button deactivated'}
                    >
                    </i>
                </span>
            </div>
        );
    }

    getMaxPages() {
        const { items, itemsPerSite } = this.state;
        let maxPages: any = items.length / itemsPerSite;

        if (items.length <= itemsPerSite) {
            return parseInt(maxPages);
        }

        maxPages = Math.round(maxPages);

        if (maxPages * itemsPerSite < items.length) {
            maxPages += 1;
        }

        return maxPages;
    }

    /**
     * Set filter, to filter images by its original type
     * @param e any
     */
    setType(event: React.ChangeEvent<HTMLInputElement>, object: { text: string, value: string }) {

        if (!object) {
            return this.setState({
                displayFullscreenlist: false,
                displayFullscreenlistFilter: false
            });
        }

        this.setState({
            animationLoading: true,
            filteredTypes: object.value,
            currentPage: 0,
            displayFullscreenlist: false,
            displayFullscreenlistFilter: false
        }, () => {
            this.getData(false);
        });
    }

    /**
     * How many images should be displayed on a single site
     * @param e any
     */
    setItemsPerSite(event: React.ChangeEvent<HTMLInputElement>, object: { text: string, value: string }) {

        if (!object) {
            return this.setState({
                displayFullscreenlist: false,
                displayFullscreenlistFilter: false
            });
        }

        let itemsPerSite = parseInt(object.value);

        if (typeof 1 !== typeof itemsPerSite) {
            itemsPerSite = 20;
        }

        this.setState({
            animationLoading: true,
            itemsPerSite,
            currentPage: 0,
            displayFullscreenlist: false,
            displayFullscreenlistFilter: false
        }, () => {
            this.getData(false);
        });
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
     * Get filename up to 235 (+file type = ~ 240) strings length
     * max is ~ 255
     * @param src string
     */
    generateFileName(src) {
        const names = src.split('/');
        let singleName = names[names.length - 1];

        if (235 < singleName.length) {
            singleName = singleName.substring(0, 235);
        }

        return singleName;
    }

    /**
     * Generate a href targets href
     * to download the image
     * @param {string} href 
     */
    saveImage(href) {
        const messages = [];

        this.setState({
            animationLoading: true
        }, () => {
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

                                this.setState({ animationLoading: false });
                            }

                            catch (error) {
                                messages.push({
                                    type: 'error',
                                    msg: `File generation error: ${error}`
                                });
                                this.setState({
                                    messages,
                                    animationLoading: false
                                });
                            }
                        })
                        .catch(error => {
                            messages.push({
                                type: 'error',
                                msg: `Request error: ${error}`
                            });
                            this.setState({
                                messages,
                                animationLoading: false
                            });
                        })
                })
                .catch(error => {
                    messages.push({
                        type: 'error',
                        msg: `Request error: ${error}`
                    });
                    this.setState({
                        messages,
                        animationLoading: false
                    });
                })
        })
    }

    render(): JSX.Element {
        const { animationLoading, displayFullscreenlist, availableTypes, items, itemsToRenderJsx, displayFullscreenlistFilter } = this.state;

        if (animationLoading) {
            return <LoadingAnimation />;
        }

        if (0 == itemsToRenderJsx.length) {
            return (
                <div className="DownloadImages">
                    <NoDataImages />
                </div>
            );
        }

        return (
            <div className="DownloadImages">
                {
                    this.getPagerJsx()
                }
                {
                    undefined !== items && 0 !== items.length && 0 !== this.getMaxPages() &&
                    <h1 className="ff-title h1-sites text-center">
                        {`${this.translations.page} ${this.state.currentPage + 1} ${this.translations.of} ${this.getMaxPages()}`}
                    </h1>
                }
                {
                    0 !== items.length &&
                    <span>
                        <h1 className="ff-title h1-sites text-center">
                            {`${items.length} ${this.translations.images}`}
                        </h1>
                        <h2 className="title-light">
                            {this.translations.img_from_request}
                        </h2>
                    </span>
                }
                {
                    0 === this.state.itemsToRenderJsx.length &&
                    <NoDataImages />
                }
                {
                    0 !== itemsToRenderJsx.length &&
                    itemsToRenderJsx.map(object => {
                        const { source, type } = object;

                        return (
                            <div
                                key={customKey()}
                                className="image-box"
                                title={source}
                            >
                                <img alt='image' className="images-to-save" src={source} />

                                <div className="text">
                                    {
                                        source
                                    }
                                </div>
                                <div className="type">
                                    {
                                        type
                                    }
                                </div>
                                <div className="options">
                                    <i
                                        className="far fa-arrow-alt-circle-down download"
                                        onClick={(e) => this.saveImage(source)}
                                        title={this.translations.download}
                                    ></i>
                                    <a
                                        target='_blank'
                                        href={source}
                                        className="fas fa-external-link-square-alt external-link"
                                        title={this.translations.open_in_new_tab}
                                    ></a>
                                </div>
                            </div>
                        )
                    })
                }
                <FullScreenList
                    data={availableTypes}
                    closeIcon="✖"
                    callback={this.setType}
                    display={displayFullscreenlistFilter}
                    inputActive={true}
                    inputPlaceholder={'Filter....'}
                    noDataText=' 🗯 '
                />
                <FullScreenList
                    data={
                        [
                            {
                                text: `1 ${this.translations.itemsPerSiteSuffix}`,
                                value: 1
                            },
                            {
                                text: `2 ${this.translations.itemsPerSiteSuffix}`,
                                value: 2
                            },
                            {
                                text: `3 ${this.translations.itemsPerSiteSuffix}`,
                                value: 3
                            },
                            {
                                text: `4 ${this.translations.itemsPerSiteSuffix}`,
                                value: 4
                            },
                            {
                                text: `5 ${this.translations.itemsPerSiteSuffix}`,
                                value: 5
                            },
                            {
                                text: `10 ${this.translations.itemsPerSiteSuffix}`,
                                value: 10
                            },
                            {
                                text: `20 ${this.translations.itemsPerSiteSuffix}`,
                                value: 20
                            },
                            {
                                text: `30 ${this.translations.itemsPerSiteSuffix}`,
                                value: 30
                            },
                            {
                                text: `40 ${this.translations.itemsPerSiteSuffix}`,
                                value: 40
                            },
                            {
                                text: `50 ${this.translations.itemsPerSiteSuffix}`,
                                value: 50
                            },
                            {
                                text: `60 ${this.translations.itemsPerSiteSuffix}`,
                                value: 60
                            },
                            {
                                text: `70 ${this.translations.itemsPerSiteSuffix}`,
                                value: 70
                            },
                            {
                                text: `80 ${this.translations.itemsPerSiteSuffix}`,
                                value: 80
                            },
                            {
                                text: `90 ${this.translations.itemsPerSiteSuffix}`,
                                value: 90
                            },
                            {
                                text: `100 ${this.translations.itemsPerSiteSuffix}`,
                                value: 100
                            }
                        ]
                    }
                    closeIcon="✖"
                    callback={this.setItemsPerSite}
                    display={displayFullscreenlist}
                    inputActive={true}
                    inputPlaceholder={'10, 20, 30....'}
                    noDataText=' 🗯 '
                />
            </div>
        );
    }
}

export default ImagesRequests;