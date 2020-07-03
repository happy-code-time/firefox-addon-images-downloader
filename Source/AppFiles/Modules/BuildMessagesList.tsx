import * as React from 'react';

import customKey from '../Functions/customKey';

interface BuildMessagesListProps {
    parentContext: any;
}

class BuildMessagesList extends React.Component<BuildMessagesListProps>
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
                    senderfirstname,
                    senderlastname,
                    title,
                    text,
                    send_time,
                    important,
                    recipient_readed,
                    files
                }=message;

                senderfirstname=senderfirstname.charAt(0).toUpperCase()+senderfirstname.slice(1);
                senderlastname=senderlastname.charAt(0).toUpperCase()+senderlastname.slice(1);

                return (
                    <div
                        key={ customKey() }
                        className={ index==this.state.currentReadedMessageIndex? 'single-message single-message-default active':'single-message single-message-default' }
                    >
                        <span className={('trash' == parentContext.state.currentBox || ('' !== files && null !== files && undefined !== files)) ? 'icons icons-resore' : 'icons'}>
                            {
                                true == important && 'trash' !== parentContext.state.currentBox &&
                                <i onClick={ (e) => parentContext.unsetImportant(message) } className="fas fa-star icon important star"></i>
                            }
                            {
                                true !== important && 'trash' !== parentContext.state.currentBox &&
                                <i onClick={ (e) => parentContext.setImportant(message) } className='far fa-star icon star'></i>
                            }
                            {
                                'trash' == parentContext.state.currentBox && 
                                <i className="fas fa-trash-restore restore" onClick={ (e) => parentContext.restoreSingleMessage(index)}></i>
                            }
                            {
                                '' !== files && null !== files && undefined !== files &&
                                <i className="fas fa-paperclip"></i>
                            }
                            <i className="far fa-trash-alt trash" onClick={ (e) => parentContext.deleteSingleMessage(index)}></i>
                        </span>
                        <span className="context" onClick={ (e) => parentContext.readSingleMessage(index) }>
                            <div className="sender-time">
                                <div className="sender ff-title">
                                    { `${senderfirstname} ${senderlastname}` }
                                </div>
                                <div className="time">
                                    { send_time }
                                </div>
                            </div>
                            <div className={ recipient_readed==0? 'title not-readed':'title' }>
                                { title }
                            </div>
                            <div className={ recipient_readed==0? 'body not-readed':'body' }>
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

export default BuildMessagesList;