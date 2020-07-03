import * as React from 'react';

import getTranslations from '../../Translations';

import customKey from '../Functions/customKey';

import { addonRoot } from '../Functions/addonPrefix';

class NoDataImagesFavourites extends React.Component 
{
    render(){
        const translations: { [key: string]: any } = getTranslations();

        return (
            <div key={customKey()} className="NoDataImages">
                <img src={`${addonRoot()}/Images/logo-128.png`}/>
                <h1 className="h1-title">
                {
                    translations.imagesNoDataFavourites
                }
                </h1>
            </div>
        );
    }
};

export default NoDataImagesFavourites;