import * as React from 'react';

import getDerivedStateFromPropsCheck from '../Functions/getDerivedStateFromPropsCheck';

class SelectWrapperInline extends React.Component {

    public props: {
        [key: string]: any
    };

    public state: {
        [key: string]: any
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedType: props.selectedType && typeof '888' === typeof props.selectedType ? props.selectedType : '',
            title: props.title && typeof '888' === typeof props.title ? props.title : '',
            callback: props.callback && 'function' === typeof props.callback ? props.callback : undefined,
            iconDown: props.iconDown && typeof '888' === typeof props.iconDown ? props.iconDown : '',
            iconAttributes: props.iconAttributes && typeof {} === typeof props.iconAttributes ? props.iconAttributes : {},
        }
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (getDerivedStateFromPropsCheck(['selectedType', 'title', 'callback', 'iconDown', 'iconAttributes'], props, state)) {
            return {
                selectedType: props.selectedType && typeof '888' === typeof props.selectedType ? props.selectedType : '',
                title: props.title && typeof '888' === typeof props.title ? props.title : '',
                callback: props.callback && 'function' === typeof props.callback ? props.callback : undefined,
                iconDown: props.iconDown && typeof '888' === typeof props.iconDown ? props.iconDown : '',
                iconAttributes: props.iconAttributes && typeof {} === typeof props.iconAttributes ? props.iconAttributes : {},
            };
        }

        return null;
    }

    /**
     * User callback on click event
     * @param event 
     */
    callback(event: React.MouseEvent) {
        const { callback } = this.state;

        if (callback) {
            (callback)();
        }
    }

    render() {
        const { selectedType, title, iconDown, iconAttributes } = this.state;

        return (
            <div
                className="select-wrapper inline"
                onClick={(e) => this.callback(e)}
            >
                <div className="title">
                    {
                        title
                    }
                    <span className='selected'>
                        {
                            selectedType
                        }
                    </span>
                </div>
                <span
                    className="icon-down"
                    {...iconAttributes}
                >
                    {
                        iconDown
                    }
                </span>
            </div>
        );
    }
}

export default SelectWrapperInline;