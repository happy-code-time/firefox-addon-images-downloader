import * as React from 'react';

import getTranslations from '../../Translations/index';

import { uuid } from 'react-revolution';

interface WebsiteContainerProps {
    contentData?: string | any;
    loginRequired: boolean;
    redirectAfterLogin?: string;
}

class Actions extends React.Component<WebsiteContainerProps> {

    public translations: {
        [key: string]: any
    };

    public state: {
        [key: string]: any
    };

    public getDataInterval: any;

    constructor(props: WebsiteContainerProps) {
        super(props);
        this.callback = this.callback.bind(this);

        this.state = {

        };

        this.translations = getTranslations();
    }

    componentDidMount() {

    }


    callback(clickEvent, action) {
        //@ts-ignore
        browser.runtime.sendMessage({ action }).catch( e => {});
    }

    render(): JSX.Element {

        return (
            <div className="ContentBody ContentStaticHeight Home Settings">
                <div 
                    className="button-action"
                    onClick={ (e) => this.callback(e, 'generate-single-download-images') }
                >
                    {
                        this.translations.fastAllowToSave
                    }
                </div>
                <div 
                    className="button-action"
                    onClick={ (e) => this.callback(e, 'generate-single-slider-images') }
                >
                    {
                        this.translations.fastGenerateSlider
                    }
                </div>
            </div>
        );
    }
}

export default Actions;