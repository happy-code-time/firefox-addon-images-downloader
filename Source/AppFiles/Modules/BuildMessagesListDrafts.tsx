import * as React from 'react';

import customKey from '../Functions/customKey';

interface BuildMessagesListDraftsProps {
    parentContext: any;
}

class BuildMessagesListDrafts extends React.Component<BuildMessagesListDraftsProps>
{
    public state: {
        [ key: string ]: any;
    };

    public parentContext: any;

    constructor (props) {
        super(props);

        this.state={
            parentContext: this.props.parentContext,
        }
    }

    buildMessagesList() {
        const { parentContext }=this.state;

        if (undefined !== this.props.parentContext.state.currentMessages && this.props.parentContext.state.currentMessages.length) {
            let items = this.props.parentContext.state.currentMessages;

            return items.map((message, index) => {
                let {
                    title,
                    text,
                    send_time,
                    recipient,
                    uuid,
                    files
                }=message;

                return (
                    <div
                        key={ customKey() }
                        className={ index==this.state.currentReadedMessageIndex? 'single-message single-message-drafts active':'single-message single-message-drafts' }
                    >
                        <span className="icons">
                            <i className="far fa-trash-alt trash" onClick={ (e) => parentContext.deleteSingleMessageDraft(index)}></i>
                            {
                                '' !== files && null !== files && undefined !== files &&
                                <i className="fas fa-paperclip"></i>
                            }
                        </span>
                        <span className="context" onClick={ (e) => parentContext.readSingleMessageDraft(index) }>
                            <div className="sender-time">
                                <div className="time">
                                    { send_time }
                                </div>
                            </div>
                            <div className='title'>
                                { title }
                            </div>
                            <div className='body'>
                                { text }
                            </div>
                        </span>
                    </div>
                )
            });
        }

        return '';
    }

    render() {
        return this.buildMessagesList()
    }
}

export default BuildMessagesListDrafts;