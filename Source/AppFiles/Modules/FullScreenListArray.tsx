import * as React from 'react';

import customKey from '../Functions/customKey';

class FullScreenListArray extends React.Component
{
    public props: {
        [key: string]: any
    };

    public state: {
        [key: string]: any
    };

    public FullSceenListNode: HTMLElement | any;

    constructor(props){
        super(props);
        this.callback = this.callback.bind(this);
        this.setValue = this.setValue.bind(this);
        this.buildListJsx = this.buildListJsx.bind(this);
        this.removeEscEventListener = this.removeEscEventListener.bind(this);
        this.addEscEventListener = this.addEscEventListener.bind(this);
        this.EscListener = this.EscListener.bind(this);

        this.state = {
            /**
             * User interaction
             */
            data: (props.data && typeof [] === typeof props.data) ? props.data : [],
            display: typeof true === typeof props.display ? props.display : false,
            closeIcon: props.closeIcon ? props.closeIcon : '',
            inputActive: typeof true === typeof props.inputActive ? props.inputActive : false,
            noDataText: (props.noDataText && typeof 'react' === typeof props.noDataText) ? props.noDataText : 'No data found',
            inputPlaceholder: (props.inputPlaceholder && typeof 'react' === typeof props.inputPlaceholder) ? props.inputPlaceholder : 'Search here...',
            /**
             * Module interaction
             */
            filteredData: [],
            inputValue: '',
            className: 'FullScreenList'
        }
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        const keysChangeListener = ['data', 'display', 'closeIcon', 'inputActive', 'noDataText', 'inputPlaceholder'];
        let update = false;

        keysChangeListener.map( keyName => {
            if(state[keyName] !== props[keyName]){
                update = true;
            }
        });

        if(update){
            return { 
                data: props.data,
                display: props.display,
                closeIcon: props.closeIcon,
                inputActive: props.inputActive,
                noDataText: props.noDataText,
                inputPlaceholder: props.inputPlaceholder,
                className: 'FullScreenList'
            };
        }

        return null;
    }

    /**
     * After mount
     */
    componentDidMount(){
        this.addEscEventListener();
    }
    
    /**
     * Before unmount
     */
    componentWillUnmount(){
        this.removeEscEventListener();
    }

    /**
     * After state change
     * and rerendered
     */
    componentDidUpdate(){
        const { display } = this.state;
        this.removeEscEventListener();

        if(display){
            this.addEscEventListener();

            if(this.FullSceenListNode){
                this.FullSceenListNode.click();
            }
        }
    }

    /**
     * Add - On "ESC" key press listenere
     */
    addEscEventListener(){
        window.addEventListener("keydown", this.EscListener, false);
    }

    /**
     * Remove - On "ESC" key press listenere
     */
    removeEscEventListener(){
        window.removeEventListener("keydown", this.EscListener, false);
    }

    /**
     * On "ESC" key press
     */
    EscListener(event: KeyboardEvent){
        if(event.keyCode === 27) {
            this.removeEscEventListener();
            this.callback(event, undefined);
        }
    }

    /**
     * User custom callback to 
     * return the value of 
     * the clicked li item
     * @param event 
     */
    callback(event: any, entry: {text: string, value: any}){
        if(this.props.callback && 'function' === typeof this.props.callback){
            this.setState({
                className: 'FullScreenList back'
            }, () => {
                setTimeout( () => {
                    (this.props.callback)(event, entry);
                }, 300);
            })
        }
    }

    /**
     * Set input value
     * @param event 
     */
    setValue(event: MouseEvent | TouchEvent | any){
        this.setState({
            inputValue: event.target.value
        }, () => {
            const { data, inputValue } = this.state;

            this.setState({
                filteredData: data.filter( entry => -1 !== entry.text.toLowerCase().indexOf(inputValue.toLowerCase()))
            });
        });
    }

    /**
     * Main li list builder
     * @param array 
     */
    buildListJsx(array){
        return array.map( (entry: {text: string, value: any}, index) => {
            return (
                <li 
                    key={customKey()}
                    className="li li-entry"
                    onClick={ (e) => this.callback(e, entry)}
                >
                    {
                        this.state.displayEntryNumber &&
                        <span className="index">
                            {
                                index+1
                            }
                        </span>
                    }
                    <span>
                        {
                            entry.text
                        }
                    </span>
                </li>
            )
        });
    }

    render(){
        const { className, closeIcon, data, display, filteredData, inputActive, inputValue, noDataText, inputPlaceholder } = this.state;

        if(!display){
            return null;
        }

        return (
            <div 
                ref={ (node) => this.FullSceenListNode = node }
                className={className}
            >
                {
                    '' == closeIcon &&
                    <p 
                        className="icon-close color-white"
                        onClick={(e) => this.callback(e, undefined)}
                    >
                        ✖
                    </p>
                }
                {
                    '' !== closeIcon &&
                    <span 
                        className="span-close"
                        onClick={(e) => this.callback(e, undefined)}
                    >
                        {
                            closeIcon
                        }
                    </span>
                }
                <div className="holder-ul">
                    {
                        inputActive && <input value={inputValue} placeholder={inputPlaceholder} onChange={this.setValue}/>
                    }
                    <ul className="ul">
                        {
                            0 !== filteredData.length && this.buildListJsx(filteredData)
                        }
                        {
                            0 === filteredData.length && 0 !== inputValue.length && 
                            <div className="no-data">
                                {
                                    noDataText
                                }
                            </div>
                        }
                        {
                            0 == filteredData.length && 0 == inputValue.length && this.buildListJsx(data)
                        }
                    </ul>
                </div>                
            </div>
        );
    }
}

export default FullScreenListArray;