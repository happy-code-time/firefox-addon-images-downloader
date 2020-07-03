import * as React from 'react';

import getTranslations from '../../Translations';

class LoadingBoxTop extends React.Component
{
    render(){
        const translations = getTranslations();

        return(
            <div className="LoadingBoxTop">
                {
                    translations.loading
                }
            </div>
        );
    }
}

export default LoadingBoxTop;