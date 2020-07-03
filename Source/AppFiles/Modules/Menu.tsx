import * as React from 'react';

import { Link } from 'react-router-dom';

import customKey from '../Functions/customKey';

class Menu extends React.Component
{
    public props : {
        [key: string]: any;
    }

    public state : {
        [key: string]: any;
    }

    constructor(props){
        super(props);

        this.state = {
            data: (props.data && typeof [] == typeof props.data) ? props.data : [],
            reactRouter: (undefined !== props.reactRouter && typeof true == typeof props.reactRouter) ? props.reactRouter : true,
            dropDownIcon: (undefined !== props.dropDownIcon && typeof [] == typeof props.dropDownIcon) ? props.dropDownIcon : '',
            childrenPaddingX: (undefined !== props.childrenPaddingX && typeof 8 == typeof props.childrenPaddingX && !isNaN(parseInt(props.childrenPaddingX))) ? props.childrenPaddingX : 20
        };
    }

    /**
     * Close all child recursively
     * @param child object
     */
    closeChildRecursively(child){

    }

    /**
     * Main toggle function based on the auto generated uuid
     * for each item that has children
     * @param child object
     */
    toggle(child: { attributes?: {}, text?: string, icon?: string, href?: string, children?: [], toggled?: boolean, uuid?: string, class?: string, dropDownUuid?: string, looped: boolean, ulUuid?: string }){
        const { data } = this.state;
        const { uuid, dropDownUuid, ulUuid } = child;
        const dropwDownNode = document.getElementById(dropDownUuid);
        const ulNode = document.getElementById(ulUuid);
        let timeouter = 0;

        const closeRecursive = (child) => {
            child.class = 'toggle';
            child.toggled = false;
            
            if(child.children && typeof [] === typeof child.children && child.children.length){
                child.children.map( (c:any) => {
                    c = closeRecursive(c);
                });
            }

            return child;
        }

        if(child.children && typeof [] === typeof child.children && child.children.length){
            
            const loop = (item) => {

                /**
                 * Change toogle behavior
                 */
                if(item.uuid && item.uuid == uuid){
                    item.toggled = !item.toggled;

                    if(item.toggled){
                        child.class = 'toggled';
                    }
                    else{
                        /**
                         * If the drop down id has been found
                         * then make an animation
                         * only for the clicked element
                         */
                        if(dropwDownNode && ulNode){
                            /**
                             * Move drow down icon back to initial state
                             * as animation
                             */
                            dropwDownNode.classList.remove('persist-toggled');
                            dropwDownNode.classList.remove('toggled');
                            dropwDownNode.classList.add('toggle-back');
                            
                            /**
                             * Move drow down ul -> li items back to initial state
                             * as animation
                             */
                            const allUlChilds = ulNode.querySelectorAll('ul');
                            ulNode.classList.add('toggle-back');

                            if(allUlChilds && allUlChilds.length){
                                for(let x = 0; x <= allUlChilds.length-1; x++){
                                    allUlChilds[x].classList.add('toggle-back');

                                    const allUlDropDownChilds = allUlChilds[x].querySelectorAll('.drop-down');

                                    if(allUlDropDownChilds && allUlDropDownChilds.length){
                                        for(let i = 0; i <= allUlDropDownChilds.length-1; i++){
                                            allUlDropDownChilds[i].classList.remove('persist-toggled');
                                            allUlDropDownChilds[i].classList.remove('toggled');
                                            allUlDropDownChilds[i].classList.add('toggle-back');
                                        }
                                    }
                                }
                            }

                            timeouter = 350;
                            
                            setTimeout( () => {
                                child.class = 'toggle';
                                child = closeRecursive(child);

                            }, timeouter);
                        }
                        else{
                            child.class = 'toggle';
                            child = closeRecursive(child);
                        }
                    }
                }
                else{
                    if(item.class == 'toggled'){
                        item.class = 'persist-toggled';
                    }
                }

                /**
                 * Check recursively
                 */
                if(item.children && typeof [] === typeof item.children && item.children.length){
                    item.children.map( item => {
                        item = loop(item);
                    });
                }
    
                return item;
            }
    
            data.map( item => {
                item = loop(item);
            });

            /**
             * Apply now data
             */
            setTimeout( () => {
                this.setState({
                    data
                });
            }, timeouter);
        }
    }

    generateData(){
        const { data, childrenPaddingX } = this.state;
        let loopingIndex = 0;
        
        const loop = (child) => {

            if(child.children && typeof [] === typeof child.children && child.children.length){
                loopingIndex += 1;

                /**
                 * Start each item that has children 
                 * with the default toogled value: false
                 */
                if(undefined == child.toggled){
                    child.toggled = false;
                }

                /**
                 * Start each item that has children 
                 * with the default not toogled class names: toggle
                 */
                if(undefined == child.class){
                    child.class = 'toggle';
                }
                
                child.children.map( c => {
                    c = loop(c);
                    c.px = loopingIndex*childrenPaddingX;
                });
            }

            return child;
        }

        data.map( i => {
            loopingIndex = 1;

            i = loop(i);
        });

        return data;
    }

    menu(){
        const { reactRouter, dropDownIcon, childrenPaddingX } = this.state;
        const data = this.generateData();

        const MenuItem = ( { child } ) => {
            let { href, attributes } = child;

            /**
             * Href check
             */
            if(undefined == href || null == href || typeof 'react' !== typeof href || '' == href){
                href = '#';
            }

            /**
             * Attributes check
             */
            if(undefined == attributes || null == attributes || typeof {} !== typeof attributes){
                attributes = {};
            }

            try{
                Object.keys(attributes);
            }
            catch( e){
                attributes = {};
            }

            /**
             * Add uuid to match 
             * with the onClick, OnTouchStart event 
             */
            if(undefined == child.uuid){
                child.uuid = `${customKey()}`;
            }

            /**
             * Add uuid to match 
             * with the onClick, OnTouchStart event
             * to toggle down 
             */
            if(undefined == child.dropDownUuid){
                child.dropDownUuid = `${customKey()}`;
            }

            /**
             * Add uuid to match 
             * with the onClick, OnTouchStart event
             * to toggle drow 
             */
            if(undefined == child.ulUuid){
                child.ulUuid = `${customKey()}`;
            }

            const iconText = (
                <div className="data">
                    {
                        child.icon &&
                        <span className="icon">
                            {child.icon}
                        </span>
                    }
                    {
                        child.text &&
                        <span className="text">
                        {
                            child.text
                        }
                        </span>
                    }
                </div>
            );

            const styleSingleEntry = {
                paddingLeft: `${child.px}px`
            };

            return (
                <li 
                    key={customKey()} 
                    className={(child.children && typeof [] === typeof child.children && child.children.length) ? 'dynamic' : 'static'}
                >
                    <div 
                        className={child.class ? `menu-entry ${child.class}` : 'menu-entry'}
                    >
                        {
                            !child.children && reactRouter &&
                            <Link 
                                to={href}
                                {...attributes}
                                className='single-entry single-entry-link'
                                style={styleSingleEntry}
                            >
                                {
                                    iconText
                                }
                            </Link>
                        }
                        {
                            !child.children && !reactRouter &&
                            <a 
                                href={href}
                                {...attributes}
                                className='single-entry single-entry-link'
                                style={styleSingleEntry}
                            >
                                {
                                    iconText
                                }
                            </a>
                        }
                        {
                            child.children && typeof [] === typeof child.children && child.children.length &&
                            <div
                                onClick={ (e) => this.toggle(child)} 
                                className='single-entry single-entry-drop-down'
                                style={
                                    {
                                        paddingLeft: `${child.px-childrenPaddingX}px`
                                    }
                                }
                            >
                                {
                                    child.icon &&
                                    <span className="icon">
                                        {child.icon}
                                    </span>
                                }
                                {
                                    child.text &&
                                    <span className="text">
                                    {
                                        child.text
                                    }
                                    </span>
                                }
                                {
                                    '' === dropDownIcon &&
                                    <span 
                                        id={child.dropDownUuid} 
                                        className={`drop-down ${child.class}`}
                                    ></span>
                                }
                                {
                                    '' !== dropDownIcon && dropDownIcon
                                }
                            </div>
                        }
                        {
                            child.children && typeof [] === typeof child.children && child.children.length &&
                            <ul id={child.ulUuid}>
                                {
                                    child.children.map( c => {
                                        if(child.toggled){
                                            return (
                                                <MenuItem 
                                                    child={c} 
                                                    key={customKey()}
                                                />
                                            )
                                        }
                                    })
                                }
                            </ul>
                        }
                    </div>
                </li>
            );
        };

        return (
            <ul className="main-menu" key={customKey()}>
                {
                    0 !== data.length && data.map( child => {
                        return <MenuItem 
                            child={child} 
                            key={customKey()}
                        />
                    })
                }
            </ul>
        );
    }

    render(){
        return this.menu();
    }
}

export default Menu;