import * as React from 'react';

import getDerivedStateFromPropsCheck from '../Functions/getDerivedStateFromPropsCheck';

import customKey from '../Functions/customKey';

class ModulePopupBoxLinks extends React.Component {

  public props: {
    [key: string]: any;
  };

  public state: {
    [key: string]: any;
  };

  public translations: {
    [key: string]: any;
  };

  public Redirection: {
    [key: string]: any
  };

  public nodeData: Node;

  public remoteHost: string;

  public routeGetData: string;

  public currentUserHash: string;

  public oldHref: string;

  public odHrefInterval: any;


  constructor(props) {
    super(props);
    this.fadePopupBoxOut = this.fadePopupBoxOut.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.togglePopupBox = this.togglePopupBox.bind(this);
    this.getUserDataJsx = this.getUserDataJsx.bind(this);

    this.state = {
      /**
       * User
       */
      titleBox: (props.titleBox && typeof '8' == typeof props.titleBox) ? props.titleBox : '',
      icon: (props.icon && typeof {} == typeof props.icon) ? props.icon : undefined,
      data: (props.data && typeof [] == typeof props.data) ? props.data : [],
      masterLink: (props.masterLink && typeof '8' == typeof props.masterLink) ? props.masterLink : '',
      masterText: (props.masterText && typeof '8' == typeof props.masterText) ? props.masterText : '',
      masterIcon: (props.masterIcon && typeof {} == typeof props.masterIcon) ? props.masterIcon : undefined,
      masterAttributes: (props.masterAttributes && typeof {} == typeof props.masterAttributes) ? props.masterAttributes : undefined,
      /**
       * App
       */
      displayBox: false,
      displayBoxClassNames: 'popup-box',
    };
  }

  /**
   * Force re-rendering of this component based
   * on keysChangeListners keys
   * @param {object} props 
   * @param {object} state 
   */
  static getDerivedStateFromProps(props, state) {
    if (getDerivedStateFromPropsCheck(['titleBox', 'icon', 'data', 'masterIcon', 'masterText', 'masterLink', 'masterAttributes'], props, state)) {
      return {
        titleBox: (props.titleBox && typeof '8' == typeof props.titleBox) ? props.titleBox : '',
        icon: (props.icon && typeof {} == typeof props.icon) ? props.icon : undefined,
        data: (props.data && typeof [] == typeof props.data) ? props.data : [],
        masterLink: (props.masterLink && typeof '8' == typeof props.masterLink) ? props.masterLink : '',
        masterText: (props.masterText && typeof '8' == typeof props.masterText) ? props.masterText : '',
        masterIcon: (props.masterIcon && typeof {} == typeof props.masterIcon) ? props.masterIcon : undefined,
        masterAttributes: (props.masterAttributes && typeof {} == typeof props.masterAttributes) ? props.masterAttributes : undefined,
      };
    }

    return null;
  }

  componentDidMount() {
    this.oldHref = window.location.href;
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  componentWillUnmount() {
    clearInterval(this.odHrefInterval);
  }

  /**
   * Hide data div
   * while user not inside it
   * @param {any} e
   */
  handleMouseDown(e: React.MouseEvent | any) {
    if (this.nodeData && !this.nodeData.contains(e.target)) {
      this.fadePopupBoxOut();
    }

    this.checkLocation();
  }

  checkLocation() {
    clearInterval(this.odHrefInterval);
    let count = 10;
    this.odHrefInterval = setInterval(() => {

      if (this.oldHref !== window.location.href || 0 > count) {
        this.oldHref = window.location.href;
        clearInterval(this.odHrefInterval);

        this.setState({
          displayBox: false,
          displayBoxClassNames: 'popup-box',
        });
      }
    }, 50);
  }

  togglePopupBox() {
    if (!this.state.displayBox) {
      return this.setState({
        displayBox: !this.state.displayBox,
      });
    }

    this.fadePopupBoxOut();
  }

  fadePopupBoxOut() {
    const { displayBoxClassNames } = this.state;

    this.setState(
      {
        displayBoxClassNames: `${displayBoxClassNames} fade-out`,
      },
      () => {
        setTimeout(() => {
          this.setState({
            displayBox: false,
            displayBoxClassNames: 'popup-box',
          });
        }, 200);
      }
    );
  }

  getUserDataJsx() {
    const { data, masterLink, masterText, masterIcon, masterAttributes } = this.state;

    if (!data || 0 == data.length) {
      return null;
    }

    return (
      <span>

        <ul className="data-ul">
          {
            data.map(item => {
              const { icon, href, attributes, text } = item;
              let aHrefAttributes = attributes && typeof {} == typeof attributes ? attributes : {};

              return (
                <li key={customKey()} className='single-data-li-account'>
                  <a
                    className="popup-box-button"
                    {...aHrefAttributes}
                    href={href}
                    onClick={(e) => this.fadePopupBoxOut()}
                  >
                    {
                      icon && icon
                    }
                    {
                      text
                    }
                  </a>
                </li>
              )
            })
          }
        </ul>
        {
          masterLink && masterText && masterIcon &&
          <a
            className="popup-box-all"
            href={masterLink}
            onClick={e => this.togglePopupBox()}
            {...masterAttributes}
          >
            {
              masterText
            }
            {
              masterIcon
            }
          </a>
        }
      </span>
    );
  }

  openLinkInNewTab(url: string, closeWindow: boolean = false) {
    // @ts-ignore
    browser.runtime.sendMessage({
      action: 'open-link-in-new-tab',
      url,
    });
    this.fadePopupBoxOut();

    if (closeWindow) {
      window.close();
    }
  }

  render() {
    const { displayBoxClassNames, icon, titleBox } = this.state;

    return (
      <span ref={node => (this.nodeData = node)} className="relative popup-box-main">
        <i onClick={e => this.togglePopupBox()} className='fas fa-external-link-alt popup-box-icon'></i>
        {this.state.displayBox && (
          <div className={displayBoxClassNames}>
            <h1>
              <i className='fas fa-external-link-alt little-gray'></i>
              {
                titleBox
              }
            </h1>
            <div className="popup-box-list flex flex-column">
              {
                this.getUserDataJsx()
              }
            </div>
          </div>
        )}
      </span>
    );
  }
}

export default ModulePopupBoxLinks;
