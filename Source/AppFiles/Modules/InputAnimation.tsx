import * as React from 'react';

class InputAnimation extends React.Component {
    public props: {
        [ key: string ]: any
    };

    public translations: {
        [ key: string ]: any
    };

    public state: {
        [ key: string ]: any
    };

    public inputNode: any;

    constructor (props) {
        super(props);
        this.callback=this.callback.bind(this);
        this.onFocus=this.onFocus.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.setValue=this.setValue.bind(this);
        this.callbackEnter=this.callbackEnter.bind(this);
        this.setFocus=this.setFocus.bind(this);
        this.setFocusUpdater=this.setFocusUpdater.bind(this);

        this.state={
            parentContext: this.props.parentContext,
            plainValue: this.checkForStaticDataForNewMessage(this.props),
            callback: this.props.callback,
            classNames: 'single-box',
            inputType: this.props.type? this.props.type:'text',
            inputProps: this.props.inputProps? this.props.inputProps:{},
            placeholder: this.props.placeholder? this.props.placeholder:'text',
            onEnter: this.props.onEnter? this.props.onEnter:null,
            allowOnlyAZ: this.props.allowOnlyAZ ? this.props.allowOnlyAZ : false
        }
    }

    /**
     * Get static value, possible new message comes from draft
     */
    checkForStaticDataForNewMessage(props: any){
        
        if(undefined !== props.currentValue){
            return props.currentValue;
        }

        return '';
    }

    componentDidMount(){
        this.setFocus();
        this.setFocusUpdater(true);
    }

    componentDidUpdate(){
        this.setFocusUpdater(false);
    }

    setFocusUpdater(usercallback: boolean = false){
        setTimeout( () => {

            if(this.inputNode){
                const val= this.inputNode.value || this.inputNode.defaultValue;
    
                if('' !== val){
                    this.setState({
                        plainValue: val
                    }, () => {

                        if(usercallback){
                            this.callback();
                        }

                        this.setFocus();
                    });
                }
            }
        }, 100);
    }

    /**
     * On state change callback
     */
    callback() {
        if (this.props.callback&&'function'==typeof this.props.callback) {
            const { plainValue }=this.state;

            (this.props.callback)(plainValue);
        }
    }

    /**
     * Enter callback
     */
    callbackEnter() {
        if (this.props.onEnter&&'function'==typeof this.props.onEnter) {
            const { plainValue }=this.state;

            (this.props.onEnter)(plainValue);
        }
    }

    /**
     * On Focus action
     */
    onFocus() {
        if (-1==this.state.classNames.indexOf('focus')) {
            this.setState({
                classNames: 'single-box focus',
            });
        }
    }

    /**
     * On Blur action
     */
    onBlur() {
        if (''==this.state.plainValue) {
            this.setState({
                classNames: 'single-box'
            });
        }
    }

    /**
     * Set focus
     */
    setFocus(){
        const { classNames } = this.state;
        
        if ('' !==this.state.plainValue && 'single-box focus' !== classNames) {
            this.setState({
                classNames: 'single-box focus'
            });
        }
    }


    /**
     * Set value on change input field
     */
    setValue(e: KeyboardEvent|Event|any) {
        let val=e.target.value;

        if(this.state.allowOnlyAZ){
            val = val.replace(/[^a-zA-Z- ]/gmi,'');
            val = val.trim();
        }

        this.setState({
            plainValue: val
        }, () => {
            this.callback();
        });
    }

    render() {
        return (
            <div className={ this.state.classNames }>
                <div className="font-input title">
                    {
                        this.state.placeholder
                    }
                </div>
                {
                    'textarea'==this.state.inputType&&
                    <textarea
                        { ...this.state.inputProps }
                        className="font-input"
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur }
                        type={ this.state.inputType }
                        value={ this.state.plainValue }
                        onChange={ (e) => this.setValue(e) }
                    />
                }
                {
                    'textarea'!==this.state.inputType&&
                    <input
                        { ...this.state.inputProps }
                        className="font-input"
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur }
                        type={ this.state.inputType }
                        value={ this.state.plainValue }
                        onChange={ (e) => this.setValue(e) }
                        onKeyPress={ event => {
                            if (event.key==='Enter') {
                                this.callbackEnter();
                            }
                        } }
                        ref={ (node) => this.inputNode = node }
                    />
                }
            </div>
        );
    }
}

export default InputAnimation;