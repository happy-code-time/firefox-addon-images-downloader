import * as React from 'react';

import getTranslations from '../../Translations/index';

import { FullScreenListArray } from 'react-revolution';

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
        this.toggleAllowToSave = this.toggleAllowToSave.bind(this);
        this.getCurrentData = this.getCurrentData.bind(this);
        this.callback = this.callback.bind(this);
        this.toggleList = this.toggleList.bind(this);
        this.toggleAllowGifs = this.toggleAllowGifs.bind(this);
        this.setValue = this.setValue.bind(this);

        this.state = {
            allowToSave: false,
            downloadicon: '',
            display: false,
            allowGifs: false,
            allowPngs: false,
            allowJpgs: false,
            filterByImagesWidth: 0,
            filterByImagesHeight: 0,
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

                let { downloadicon, allowToSave, allowGifs, allowPngs, allowJpgs, filterByImagesWidth, filterByImagesHeight } = data;

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
                    filterByImagesWidth,
                    filterByImagesHeight
                });

            })
            .catch(e => {

            });
    }

    toggleAllowToSave(e) {
        let allowToSave = false;

        if (e.target.checked) {
            allowToSave = true;
        }

        //@ts-ignore
        browser.runtime.sendMessage({ action: 'set-allow-to-download', allowToSave }).then( this.getCurrentData).catch( this.getCurrentData)
    }

    toggleAllowGifs(e) {
        let allowGifs = false;

        if (e.target.checked) {
            allowGifs = true;
        }

        //@ts-ignore
        browser.runtime.sendMessage({ action: 'set-allowGifs', allowGifs }).then( this.getCurrentData).catch( this.getCurrentData)
    }

    toggleAllowPngs(e) {
        let allowPngs = false;

        if (e.target.checked) {
            allowPngs = true;
        }

        //@ts-ignore
        browser.runtime.sendMessage({ action: 'set-allowPngs', allowPngs }).then( this.getCurrentData).catch( this.getCurrentData)
    }

    toggleAllowJpgs(e) {
        let allowJpgs = false;

        if (e.target.checked) {
            allowJpgs = true;
        }

        //@ts-ignore
        browser.runtime.sendMessage({ action: 'set-allowJpgs', allowJpgs }).then( this.getCurrentData).catch( this.getCurrentData)
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

        console.log(value);
        console.log(key);

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
        const { allowToSave, downloadicon, display, allowGifs, allowPngs, allowJpgs } = this.state;
        let { filterByImagesWidth, filterByImagesHeight } = this.state;

        if(!filterByImagesWidth){
            filterByImagesWidth = 0;
        }

        if(!filterByImagesHeight){
            filterByImagesHeight = 0;
        }

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
                                    '↓',
                                    '⬇',
                                    '🔰',
                                    '🔻',
                                    '🔽',
                                    '🔥',
                                    '⚡',
                                    '💧',
                                    '🍀',
                                    '🐉',
                                    '🤖',
                                    '📷',
                                    '🤬 ',
                                    '🤯 ',
                                    '😷 ',
                                    '👽 ',
                                    '👹 ',
                                    '👿 ',
                                    '🤓 ',
                                    '👾 ',
                                    '🦄 ',
                                    '🐙 ',
                                    '🦂 ',
                                    '🍄 ',
                                    '🌼 ',
                                    '🌻 ',
                                    '🌷 ',
                                    '💐 ',
                                    '🌪 ',
                                    '🌈 ',
                                    '🌝 ',
                                    '🍺 ',
                                    '🍹 ',
                                    '🍔 ',
                                    '🍟 ',
                                    '🍕 ',
                                    '🥪 ',
                                    '🌭 ',
                                    '🎯 ',
                                    '🗽 ',
                                    '🗼 ',
                                    '🗿 ',
                                    '🚧 ',
                                    '🔵 ',
                                    '🔴 ',
                                    '⚫ ',
                                    '🔳 ',
                                    '⬜ ',
                                    '⬛',
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
                    <li className='flex'>
                        <input
                            className='pointer'
                            type='checkbox'
                            onChange={(e) => this.toggleAllowToSave(e)}
                            checked={allowToSave}
                        />
                        <p>
                            {
                                this.translations.allowToSave
                            }
                        </p>
                    </li>
                    <li className='flex'>
                        <input
                            className='pointer'
                            type='checkbox'
                            onChange={(e) => this.toggleAllowJpgs(e)}
                            checked={allowJpgs}
                        />
                        <p>
                            {
                                this.translations.allowJpgs
                            }
                        </p>
                    </li>
                    <li className='flex'>
                        <input
                            className='pointer'
                            type='checkbox'
                            onChange={(e) => this.toggleAllowPngs(e)}
                            checked={allowPngs}
                        />
                        <p>
                            {
                                this.translations.allowPngs
                            }
                        </p>
                    </li>
                    <li className='flex'>
                        <input
                            className='pointer'
                            type='checkbox'
                            onChange={(e) => this.toggleAllowGifs(e)}
                            checked={allowGifs}
                        />
                        <p>
                            {
                                this.translations.allowGifs
                            }
                        </p>
                    </li>
                    <li className='flex'>
                        <input
                            type='number'
                            minLength={1}
                            onChange={(e) => this.setValue(e, 'filterByImagesWidth')}
                            value={filterByImagesWidth}
                        />
                        <p>
                            {
                                this.translations.filterByImagesWidth
                            }
                        </p>
                    </li>
                    <li className='flex'>
                        <input
                            minLength={1}
                            type='number'
                            onChange={(e) => this.setValue(e, 'filterByImagesHeight')}
                            value={filterByImagesHeight}
                        />
                        <p>
                            {
                                this.translations.filterByImagesHeight
                            }
                        </p>
                    </li>                    
                </ul>
            </div>
        );
    }
}

export default Settings;