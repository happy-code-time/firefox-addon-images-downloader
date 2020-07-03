import * as React from 'react';

import getTranslations from '../../Translations';

import customKey from '../Functions/customKey';

import { addonRoot } from '../Functions/addonPrefix';

class NoDataImages extends React.Component 
{
    render(){
        const translations: { [key: string]: any } = getTranslations();

        return (
            <div key={customKey()} className="NoDataImages">
                <img src={`${addonRoot()}/Images/logo-128.png`}/>
                <h1 className="h1-title">
                {
                    translations.imagesNoData
                }
                </h1>
            </div>
        );
    }
};

export default NoDataImages;