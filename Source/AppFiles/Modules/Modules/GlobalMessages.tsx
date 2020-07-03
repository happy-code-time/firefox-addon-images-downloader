import * as React from 'react';

import customKey from '../../Functions/customKey';

import getDerivedStateFromPropsCheck from '../../Functions/getDerivedStateFromPropsCheck';

import '../../../Sass/shared/globalErrors.scss';

class GlobalMessages extends React.Component {
    public state: {
        [key: string]: any;
    }

    public props: {
        [key: string]: any;
    }

    public globalMessagesIntervaller: any;

    public href: string;

    constructor(props) {
        super(props);
        this.checkLocation = this.checkLocation.bind(this);

        this.state = {
            messagesApp: [],
            messageKey: (props.messageKey && typeof '8' == typeof props.messageKey) ? props.messageKey : '',
            codeMapping: (props.codeMapping && typeof {} === typeof props.codeMapping) ? props.codeMapping : {},
            timer: (props.timer && typeof 888 == typeof props.timer) ? props.timer : 2500
        };

        this.removeMessage = this.removeMessage.bind(this);
        this.setIntervaller = this.setIntervaller.bind(this);
        this.href = window.location.href;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (getDerivedStateFromPropsCheck(['codeMapping', 'timer', 'messageKey'], props, state)) {
            return {
                messageKey: (props.messageKey && typeof '8' == typeof props.messageKey) ? props.messageKey : '',
                codeMapping: (props.codeMapping && typeof {} === typeof props.codeMapping) ? props.codeMapping : {},
                timer: (props.timer && typeof 888 == typeof props.timer) ? props.timer : 2500
            };
        }

        return null;
    }

    componentDidMount() {
        this.setOnClickEventListenerToTheDom();

        const { messageKey } = this.state;

        if('' !== messageKey){
            this.setIntervaller();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.checkLocation);
        clearInterval(this.globalMessagesIntervaller);
    }

    /**
     * Check if the website using a react-router
     * and if the url changed then reload the protector functionalitty
     */
    setOnClickEventListenerToTheDom() {
        document.removeEventListener('click', this.checkLocation);
        document.addEventListener('click', this.checkLocation);
    }

    /**
     * Check location, if the stored href are changed then
     * reload the security context of this extension
     * This feature needed for websites based on
     * react framework
     */
    checkLocation() {
        const self = this;
        let count = 5;
        clearInterval(x);

        var x = setInterval(() => {
            /**
             * If the current href changed
             */            
             if (self.href !== window.location.href && count > 0) {
                self.href = window.location.href;
                self.clearStore();
                return clearInterval(x);
            }

            if (!count) {
                return clearInterval(x);
            }

            count--;
        }, 100);
    }

    /**
     * Read messages from store
     */
    readStore() {
        const { messageKey } = this.state;

        if (sessionStorage.getItem(messageKey) !== null) {
            return JSON.parse(sessionStorage.getItem(messageKey));
        }

        return [];
    }

    /**
     * Clear storage
     */
    clearStore() {
        const { messageKey } = this.state;
        sessionStorage.removeItem(messageKey);
        this.setState({
            messagesApp: []
        });
    }

    /**
     * Looper
     */
    setIntervaller() {
        const { timer } = this.state;
        clearInterval(this.globalMessagesIntervaller);

        this.globalMessagesIntervaller = setInterval(() => {
            const messagesApp = this.readStore();

            if (messagesApp.length !== 0) {
                this.clearStore();
                this.setState({ messagesApp });
            }

        }, timer);
    }

    /**
     * Remove single message by index
     */
    removeMessage(i: number) {
        this.setState({
            messagesApp: this.state.messagesApp.filter((item, index) => index !== i),
        });
    }

    render() {
        const { codeMapping, messagesApp } = this.state;
        const mappingKeys = Object.getOwnPropertyNames(codeMapping);

        return (
            <div key={customKey()} className="GlobalErrors flex flex-column">
                {
                    messagesApp.map((obj, index) => {

                        let { errorCode, errorMessage } = obj;
                        errorCode = JSON.stringify(errorCode);

                        if (mappingKeys.includes(errorCode) && undefined !== codeMapping[errorCode]) {
                            const { title, displayErrorCode, text, close, link } = codeMapping[errorCode];
                            let attributesText = {};
                            let attributesLink = {};
                            let attributesClose = {};

                            if (text && typeof {} === typeof text && text.attributes && typeof {} === typeof text.attributes) {
                                attributesText = text.attributes;
                            }

                            if (link && typeof {} === typeof link && link.attributes && typeof {} === typeof link.attributes) {
                                attributesLink = link.attributes;
                            }

                            if (close && typeof {} === typeof close && close.attributes && typeof {} === typeof close.attributes) {
                                attributesClose = close.attributes;
                            }

                            return (
                                <div className="single-error" key={customKey()}>
                                    {
                                        title &&
                                        typeof '000' === typeof title &&
                                        <h1>
                                            {`${title} ${displayErrorCode ? errorCode : ''}`}
                                        </h1>
                                    }
                                    {
                                        title &&
                                        typeof {} === typeof title &&
                                        <h1>
                                            {
                                                title
                                            }
                                            {` ${displayErrorCode ? errorCode : ''}`}
                                        </h1>
                                    }
                                    <div
                                        className="text"
                                        {...attributesText}
                                    >
                                        {`${text.prefix ? `${text.prefix} ` : ''} ${errorMessage ? `${errorMessage} ` : ''} ${text.suffix ? `${text.suffix}` : ''}`}
                                    </div>

                                    <div className="options flex">
                                        <div
                                            onClick={e => this.removeMessage(index)}
                                            className="single-option"
                                            {...attributesClose}
                                        >
                                            {`${close.text ? `${close.text} ` : ''}`}
                                        </div>
                                        {
                                            link && typeof {} === typeof link && link.text && typeof '000' === typeof link.text &&
                                            <div className="single-option">
                                                <a
                                                    rel="noopener noreferrer"
                                                    href={`${link.href ? link.href : ''}`}
                                                    {...attributesLink}
                                                >
                                                    {
                                                        link.text
                                                    }
                                                </a>
                                            </div>
                                        }
                                    </div>
                                </div>
                            );
                        }

                        return null;
                    })
                }
            </div>
        );
    }
}

export default GlobalMessages;