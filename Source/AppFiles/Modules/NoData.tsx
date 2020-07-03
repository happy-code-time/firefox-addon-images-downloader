import * as React from 'react';

import getTranslations from '../../Translations';

class NoData extends React.Component 
{
    render(){
        const translations: { [key: string]: any } = getTranslations();

        return (
            <div className="NoData">
                <img alt="image" src='https://chat-manager.j.pl/public/images/information-icon.png' />
                <h1 className="h1-title">
                    {
                        translations.no_data_available
                    }
                </h1>
            </div>
        );
    }
};

export default NoData;