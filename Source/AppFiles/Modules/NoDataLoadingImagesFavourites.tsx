import * as React from 'react';

import getTranslations from '../../Translations';

import customKey from '../Functions/customKey';

import { addonRoot } from '../Functions/addonPrefix';

class NoDataLoadingImagesFavourites extends React.Component 
{
    render(){
        const translations: { [key: string]: any } = getTranslations();

        return (
            <div key={customKey()} className="NoDataLoadingImages">
                <img src={`${addonRoot()}/Images/logo-128.png`}/>
                <h1 className="h1-title">
                {
                    translations.imagesLoadingData
                }
                </h1>
            </div>
        );
    }
};

export default NoDataLoadingImagesFavourites;