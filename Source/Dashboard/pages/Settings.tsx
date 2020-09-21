import * as React from 'react';

import getTranslations from '../../Translations/index';

import { FullScreenListArray, uuid } from 'react-revolution';

interface WebsiteContainerProps {
    contentData?: string | any;
    loginRequired: boolean;
    redirectAfterLogin?: string;
}

class Settings extends React.Component<WebsiteContainerProps> {

    public translations: {
        [key: string]: any
    };

    public state: {
        [key: string]: any
    };

    public getDataInterval: any;

    constructor(props: WebsiteContainerProps) {
        super(props);
        this.getCurrentData = this.getCurrentData.bind(this);
        this.callback = this.callback.bind(this);
        this.toggleList = this.toggleList.bind(this);
        this.setValue = this.setValue.bind(this);

        this.state = {
            allowToSave: false,
            downloadicon: '',
            display: false,
            allowGifs: false,
            allowPngs: false,
            allowJpgs: false,
            allowSvgs: false,
            allowIcos: false,
            allowWebp: false,
            filterByImagesWidth: 0,
            filterByImagesHeight: 0,
            downloadiconsize: 16
        };

        this.translations = getTranslations();
    }

    componentDidMount() {
        this.getCurrentData();
    }

    getCurrentData() {
        //@ts-ignore
        browser.runtime.sendMessage({ action: 'get-all' })
            .then(data => {
                let { downloadicon, allowToSave, allowGifs, allowPngs, allowJpgs, allowSvgs, allowIcos, allowWebp, filterByImagesWidth, filterByImagesHeight, downloadiconsize } = data;

                if (allowToSave) {
                    allowToSave = true;
                }
                else {
                    allowToSave = false;
                }

                this.setState({
                    allowToSave,
                    downloadicon,
                    allowGifs,
                    allowPngs,
                    allowJpgs,
                    allowSvgs, 
                    allowIcos, 
                    allowWebp,
                    filterByImagesWidth,
                    filterByImagesHeight,
                    downloadiconsize
                });

            })
            .catch(e => {

            });
    }

    toggleOption(e, key){
        const allowedKeys = [
            'allowToSave',
            'allowJpgs',
            'allowPngs',
            'allowGifs',
            'allowSvgs',
            'allowIcos',
            'allowWebp'
        ];

        let allow = false;

        if (e.target.checked) {
            allow = true;
        }

        if(allowedKeys.includes(key)){
            //@ts-ignore
            return browser.runtime.sendMessage({ action: `set-${key}`, allow }).then( this.getCurrentData).catch( this.getCurrentData)            
        }
    }

    callback(clickEvent, downloadicon) {
        //@ts-ignore
        browser.runtime.sendMessage({ action: 'set-download-icon', downloadicon })
            .then(() => {
                this.setState({
                    downloadicon
                }, this.getCurrentData);
            })
            .catch( this.getCurrentData );
    }

    toggleList() {
        this.setState({ display: !this.state.display });
    }

    setValue(e, key){
        const value = e.target.value;

        this.setState({
            [key]: parseInt(value)
        }, () => {
            //@ts-ignore
            browser.runtime.sendMessage({ action: `set-${key}`, value })
            .then( this.getCurrentData )
            .catch( this.getCurrentData );
        });
    }

    render(): JSX.Element {
        const { downloadicon, display } = this.state;
        let { filterByImagesWidth, filterByImagesHeight } = this.state;

        if(!filterByImagesWidth){
            filterByImagesWidth = 0;
        }

        if(!filterByImagesHeight){
            filterByImagesHeight = 0;
        }

        const toggleAutogenerationItems = [
            'allowToSave',
            'allowJpgs',
            'allowPngs',
            'allowGifs',
            'allowSvgs',
            'allowIcos',
            'allowWebp'
        ];

        const numberInputs = [
            'downloadiconsize',
            'filterByImagesWidth',
            'filterByImagesHeight'
        ];

        return (
            <div className="ContentBody ContentStaticHeight Home Settings">
                <ul>
                <li className='flex'>
                        <p 
                            className='pointer' 
                            onClick={ () => this.toggleList()}
                        >
                            {
                                downloadicon
                            }
                        </p>
                        <FullScreenListArray
                            display={display}
                            callback={this.callback}
                            iconClose="✖"
                            callbackClose={this.toggleList}
                            closeOnCallback={true}
                            closeOnDimmedClick={true}
                            closeOnEsc={true}
                            noDataText={'No data found'}
                            animation='top' // scale, top, right, bottom, left 
                            data={
                                [
                                    '↓','⬇','🔰','🔻','🔽','🔥','⚡','💧','🍀','🐉','🤖','📷','🤬 ','🤯 ','😷 ','👽 ','👹 ',
                                    '👿 ','🤓 ','👾 ','🦄 ','🐙 ','🦂 ','🍄 ','🌼 ','🌻 ','🌷 ','💐 ','🌪 ','🌈 ','🌝 ',
                                    '🍺 ','🍹 ','🍔 ','🍟 ','🍕 ','🥪 ','🌭 ','🎯 ','🗽 ','🗼 ','🗿 ','🚧 ','🔵 ','🔴 ',
                                    '⚫ ','🔳 ','⬜ ','⬛',
                                ]
                            }
                        />
                        <p 
                            className='pointer'
                            onClick={ () => this.toggleList()}
                        >
                            {
                                this.translations.downloadicon
                            }
                        </p>
                    </li>
                    {
                        toggleAutogenerationItems.map( key => {
                            return (
                                <li key={uuid()}
                                    className='flex'
                                >
                                    <input
                                        className='pointer'
                                        type='checkbox'
                                        onChange={(e) => this.toggleOption(e, key)}
                                        checked={this.state[key]}
                                    />
                                    <p>
                                        {
                                            this.translations[key]
                                        }
                                    </p>
                                </li>
                            )
                        })
                    }
                    {
                        numberInputs.map( key => {
                            return (
                                <li className='flex'>
                                    <input
                                        type='number'
                                        minLength={1}
                                        onChange={(e) => this.setValue(e, key)}
                                        value={this.state[key]}
                                    />
                                    <p>
                                        {
                                            this.translations[key]
                                        }
                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Settings;