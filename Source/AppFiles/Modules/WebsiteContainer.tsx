import * as React from 'react';

import getTranslations from '../../Translations/index';

interface WebsiteContainerProps {
    contentData?: string | any;
    loginRequired: boolean;
}

class WebsiteContainer extends React.Component<WebsiteContainerProps> {

    public Redirection: {
        [key: string]: any
    };

    public translations: {
        [key: string]: any
    };

    public state: {
        [key: string]: any
    };

    public env?: string;
    public remoteHost?: string;
    public currentUser?: string;
    public currentUserHash?: string;
    public nodeSideBar: Node;
    public isRegular: boolean;
    public isResponsive: boolean;
    public redirectAfterLogin: string;
    public loginCheckInterval: any;

    constructor(props: WebsiteContainerProps) {
        super(props);

        this.state = {
            minifiedSecondSideBar: true,
            isMinified: true,
            sidebarMin: true,
            contentMin: true,
            minifiedSaver: true,
            language: 'en',
            activeTab: {},
            contentData: props.contentData ? props.contentData : '',
            loginRequired: props.loginRequired
        };

        this.translations = getTranslations();
    }

    render(): JSX.Element {
        return (
            <div className="ContentBody">
                {
                    false == this.state.loginRequired && this.state.contentData
                }
            </div>
        );
    }
}

export default WebsiteContainer;
