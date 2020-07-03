import * as React from 'react';

import '../../Sass/loading/index.scss';

class ModuleFullScreenLoading extends React.Component
{
    render(){
        return (
            <div className="FullScreenLoading">
                <div className="spinner"></div>
            </div>
        );
    }
};

export default ModuleFullScreenLoading;