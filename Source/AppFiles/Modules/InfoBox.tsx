import * as React from 'react';

import customKey from '../Functions/customKey';

interface InfoBoxProps {
    data: { key: string; value: string; }[];
}

class InfoBox extends React.Component<InfoBoxProps>
{
    public node: Node;

    public state: {
        [ key: string ]: any;
    };

    constructor (props) {
        super(props);
        this.handleMouseDown=this.handleMouseDown.bind(this);
        this.generateData=this.generateData.bind(this);
        this.displaySingleMessageInfo=this.displaySingleMessageInfo.bind(this);
        this.hideSingleMessageInfo=this.hideSingleMessageInfo.bind(this);

        this.state={
            data: this.props.data,
            display: false,
            iconClassNames: 'fas fa-angle-down info-icon'
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    /**
     * Hide data div
     * while user not inside it
     * @param {React.MouseEvent|any} e
     */
    handleMouseDown(e: React.MouseEvent|any) {
        if (this.node&&!this.node.contains(e.target)) {
            this.hideSingleMessageInfo();
        }
    }

    /**
     * Generate div with key value pairs
     * passed to this module
     */
    generateData() {
        const entries = [];
        const { data, display }=this.state;

        if (display && data&&data.length) {
            data.map(object => {
                const { key, value }=object;

                entries.push(
                    <div
                        key={ customKey() }
                        className="entry flex"
                    >
                        <span className="key">
                        {
                            key !== '' &&
                            `${key}: `
                        }
                        </span>
                        <span className="value">
                            {
                                value
                            }
                        </span>
                    </div>
                )
            });

            return (
                <div className="entries active flex flex-column">
                {
                    entries
                }
                </div>
            );
        }

        return null;
    }

    /**
     * Display single message box
     */
    displaySingleMessageInfo() {
        const display = !this.state.display;

        this.setState({
            display,
            iconClassNames: display ? 'fas fa-angle-down info-icon active' : 'fas fa-angle-down info-icon'
        });
    }

    /**
     * Display single message box
     */
    hideSingleMessageInfo() {
        this.setState({
            display: false,
            iconClassNames: 'fas fa-angle-down info-icon'
        })
    }

    render() {
        return (
            <div
                ref={ (node) => this.node=node }
                className="InfoBox"
            >
                Details 
                <i
                    onClick={ this.displaySingleMessageInfo }
                    className={this.state.iconClassNames}
                ></i>
                {
                    this.generateData()
                }
            </div>
        );
    }
};

export default InfoBox;