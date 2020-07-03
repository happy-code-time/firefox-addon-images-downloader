import * as React from 'react';

import getTranslations from '../../Translations/index';

import NoDataImages from '../../AppFiles/Modules/NoDataImages';

import { addonPrefixDashboard, addonRoot } from '../../AppFiles/Functions/addonPrefix';

interface WebsiteContainerProps {
    contentData?: string | any;
    loginRequired: boolean;
    redirectAfterLogin?: string;
}

class Home extends React.Component<WebsiteContainerProps> {

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
        this.openImagesDownloader = this.openImagesDownloader.bind(this);

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
            tabid: ''
        };

        this.translations = getTranslations();
    }

    componentDidMount() {
        this.setIntervals();
    }

    componentWillUnmount() {
        clearInterval(this.getDataInterval);
    }

    setIntervals() {
        clearInterval(this.getDataInterval);
        this.getData();

        this.getDataInterval = setInterval(() => {
            this.getData();
        }, 3000);
    }

    getData() {
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
                            const items = [];

                            for (let x = 0; x <= images.length - 1; x++) {
                                let link = images[x].src;

                                if (!items.includes(link)) {

                                    /**
                                     * Build valid link
                                     */
                                    if (-1 === link.indexOf('http://') && -1 === link.indexOf('https://') && -1 === link.indexOf('data:image') && -1 === link.indexOf('moz-extension://')) {

                                        if ('/' !== link.charAt(0)) {
                                            link = `/${link}`;
                                        }

                                        link = `${protocol}//${hostname}${link}`;
                                    }

                                    /**
                                     * If the link has // - 2 slashes as prefix, remove them
                                     */
                                    if ('//' == link.substr(0, 2)) {
                                        link = `${protocol}//${link.substr(2, link.length)}`;
                                    }

                                    items.push(link);
                                }
                            }

                            /**
                             * Background images
                             */
                            const imagesBackground = media.images[`${tab.id}`];

                            for (let x = 0; x <= imagesBackground.length - 1; x++) {
                                if (!items.includes(imagesBackground[x])) {
                                    items.push(imagesBackground[x]);
                                }
                            }

                            this.setState({
                                images: items.length,
                                tabid: tab.id
                            });
                        }
                    }
                })
                .catch(e => {

                })
        }
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

    openImagesDownloader(url) {
        const { tabid } = this.state;

        //@ts-ignore
        browser.tabs.create({
            url
        })
            .then(() => {
                window.close();
            })
            .catch(() => {
                window.close();
            })
    }

    render(): JSX.Element {
        const { tabid, images } = this.state;

        return (
            <div className="ContentBody ContentStaticHeight Home">
                <img className="Images-image" src={`${addonRoot()}/Images/kelvin-zyteng-4ypfR5V5nR4-unsplash.jpg`} />
                {
                    0 !== images &&
                    <span>
                        <h1 className="ff-title text-center">
                            {
                                this.translations.imagesPopupTitle
                            }
                        </h1>
                        <div className="images-count text-center">
                            {
                                images
                            }
                        </div>
                        <a
                            className="link"
                            href={`${addonPrefixDashboard()}#/download-images?tabid=${tabid}`}
                            onClick={(e) => this.openImagesDownloader(`${addonPrefixDashboard()}#/download-images?tabid=${tabid}`)}
                        >
                            {
                                this.translations.menu_text_download_images
                            }
                        </a>
                    </span>
                }
                {
                    0 == images &&
                    <span>
                        <NoDataImages />
                        <a
                            className="link"
                            href={`${addonPrefixDashboard()}#/`}
                            onClick={(e) => this.openImagesDownloader(`${addonPrefixDashboard()}#/`)}
                        >
                            {
                                this.translations.popup_title_dashboard
                            }
                        </a>
                    </span>
                }
            </div>
        );
    }
}

export default Home;