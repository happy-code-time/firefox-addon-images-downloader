import * as React from 'react';

import getDerivedStateFromPropsCheck from '../Functions/getDerivedStateFromPropsCheck';

class ModuleSideBar extends React.Component {

  public props: {
    [key: string]: any
  };

  public state: {
    [key: string]: any
  };

  constructor(props) {
    super(props);


    this.state = {
      image: (props.image && typeof {} == typeof props.image) ? props.image : undefined,
      moduleMenu: (props.moduleMenu && typeof {} == typeof props.moduleMenu) ? props.moduleMenu : undefined,
      textLong: (props.textLong && typeof '8' == typeof props.textLong) ? props.textLong : undefined,
      textShort: (props.textShort && typeof '8' == typeof props.textShort) ? props.textShort : undefined
    };
  }

  /**
   * Force re-rendering of this component based
   * on keysChangeListners keys
   * @param {object} props 
   * @param {object} state 
   */
  static getDerivedStateFromProps(props, state) {
    if (getDerivedStateFromPropsCheck(['image', 'moduleMenu', 'textLong', 'textShort'], props, state)) {
      return {
        image: (props.image && typeof {} == typeof props.image) ? props.image : undefined,
        moduleMenu: (props.moduleMenu && typeof {} == typeof props.moduleMenu) ? props.moduleMenu : undefined,
        textLong: (props.textLong && typeof '8' == typeof props.textLong) ? props.textLong : undefined,
        textShort: (props.textShort && typeof '8' == typeof props.textShort) ? props.textShort : undefined
      };
    }

    return null;
  }

  render() {
    const { moduleMenu, image, textLong, textShort } = this.state;

    return (
      <div className="Sidebar-holder">
        <div className="title-logo flex-start">
          {
            image &&
            <div className="logo">
              {
                image
              }
            </div>
          }
          <div className="version flex flex-column flex-start">
            <span className="name">
              {
                textLong
              }
            </span>
            <i>
              {
                textShort
              }
            </i>
          </div>
        </div>
        <div className="menu">
          {
            moduleMenu && moduleMenu
          }
        </div>
      </div>
    );
  }
}

export default ModuleSideBar;
