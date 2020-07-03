import * as React from 'react';

import '../../Sass/loading/index.scss';

class ModuleFullScreenLoadingMin extends React.Component
{
    render(){
        return (
            <div className="FullScreenLoadingMin">
                <div className="spinner"></div>
            </div>
        );
    }
};

export default ModuleFullScreenLoadingMin;