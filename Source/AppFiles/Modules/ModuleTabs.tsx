import * as React from 'react';

import { Link } from 'react-router-dom';

import NoDataTabsLoading from './NoDataTabsLoading';

import NoDataTabs from './NoDataTabs';

import LoadingBoxTop from './LoadingBoxTop';

import customKey from '../Functions/customKey';

import getAllTabs from '../Functions/tabs/getAllTabs';

import isEquivalent from '../Functions/checkObjectsAreEqual';

import { addonRoot } from '../Functions/addonPrefix';

class ModuleTabs extends React.Component {
    public props: {
        [key: string]: any;
    };

    public state: {
        [key: string]: any;
    };

    public translations: {
        [key: string]: any;
    };

    public intervaller: any;
    public currentUser: string;
    public currentUserHash: string;

    constructor(props) {
        super(props);
        this.getAllTabs = this.getAllTabs.bind(this);

        this.state = {
            animationLoading: false,
            /**
             * tabs
             */
            tabs: [],
            tabsUrls: [],
            tabsJsx: []
        }

        this.translations = props.translations;
    }

    componentDidMount() {
        clearInterval(this.intervaller);
        this.getAllTabs();

        this.intervaller = setInterval(async () => {
            const currentTabs = this.state.tabs;

            if (currentTabs && currentTabs.length) {
                const tabsData = await getAllTabs().then(data => data);
                const { tabs } = tabsData;

                if (!isEquivalent(tabs, currentTabs)) {
                    this.getAllTabs(false);
                }
            }
        }, 5000);
    }

    /**
     * Get all tabs as intervaller 
     * and append new tabs
     * if tabs has changed
     */
    getAllTabs(isRegularClickEvent: boolean = true) {
        this.setState({
            animationLoading: isRegularClickEvent
        }, async () => {

            const tabsData = await getAllTabs().then(data => data).catch(e => []);
            const { data, tabs } = tabsData;

            this.setState({
                data,
                tabs,
                animationLoading: false,
            });
        });
    }

    /**
     * Get only domain name
     * @param {string} url
     */
    getOnlyDomainName(url) {

        if (url) {
            return url.split('/')[2];
        }

        return '';
    }

    render() {
        const { activeTabId, animationLoading, tabs, loadingTabsDone } = this.state;

        return (
            <div className="DownloadImages">
                {
                    animationLoading && <LoadingBoxTop />
                }
                {
                    0 !== tabs.length && null == activeTabId &&
                    <h1 className="ff-title h1 text-center">
                        {
                            this.translations.current_tabs_title
                        }
                    </h1>
                }
                <div className="tabs">
                    {
                        tabs.map(tab => {
                            const { url, id } = tab;

                            return (
                                <Link
                                    key={customKey()}
                                    className="single-tab"
                                    to={`/download-images?tabid=${id}`}
                                >
                                    <h2 className="ff-title h1 text-center">
                                        {
                                            this.getOnlyDomainName(url)
                                        }
                                    </h2>
                                    <p className="tabs-url text-center">
                                        {
                                            url
                                        }
                                    </p>
                                    <div className="iframe-disabler">
                                        <div className="iframe-holder">
                                            <img alt="image" src={`${addonRoot()}../Images/logo-128.png`} />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    }
                    {
                        0 == tabs.length && false === loadingTabsDone && <NoDataTabsLoading />
                    }
                    {
                        0 == tabs.length && true === loadingTabsDone && <NoDataTabs />
                    }
                </div>
            </div>
        );
    }
};

export default ModuleTabs;