import * as React from 'react';

import getTranslations from '../../Translations';

class ModuleLanguages extends React.Component {

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

  public oldHref: string;

  public odHrefInterval: any;

  constructor(props) {
    super(props);
    this.fadePopupBoxOut = this.fadePopupBoxOut.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.togglePopupBox = this.togglePopupBox.bind(this);
    this.getUserDataJsx = this.getUserDataJsx.bind(this);
    this.setValue_language = this.setValue_language.bind(this);
    this.checkLocation = this.checkLocation.bind(this);
    
    this.translations = getTranslations();

    this.state = {
      displayBox: false,
      displayBoxClassNames: 'popup-box',
      currentData: {
        firstname: '',
        lastname: '',
      },
      titleBox: this.translations.languages,
    };
  }

  componentDidMount() {
    this.oldHref = window.location.href;
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  componentWillUnmount(){
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

  checkLocation(){
    clearInterval(this.odHrefInterval);
    let count = 10;
    this.odHrefInterval = setInterval( () => {

      if(this.oldHref !== window.location.href || 0 > count){
        this.oldHref = window.location.href;
        clearInterval(this.odHrefInterval);

        this.setState({
          displayBox: false,
          displayBoxClassNames: 'popup-box',
        });
      }
    }, 50);
  }

  changeAppsLanguage(language) {
    localStorage.setItem('applanguage', language);

    //@ts-ignore
    browser.runtime
      .sendMessage({
        action: 'set-app-language',
        language,
      })
      .then(() => {
        window.location.reload();
      });
  }

  /**
   * Set new language
   */
  setValue_language(value = 'en') {
    this.changeAppsLanguage(value);
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
    return (
      <span>
        <ul className="data-ul">
            <li className="language" onClick={ (e) => this.setValue_language('de') }>
                Deutsch 
            </li>
            <li className="language" onClick={ (e) => this.setValue_language('en') }>
                English 
            </li>
            <li className="language" onClick={ (e) => this.setValue_language('pl') }>
                Polski 
            </li>
        </ul>
      </span>
    );
  }

  render() {
    return (
      <span ref={node => (this.nodeData = node)} className="relative popup-box-main">
        <i onClick={e => this.togglePopupBox()} className='fas fa-flag-checkered popup-box-icon'></i>
        {this.state.displayBox && (
          <div className={this.state.displayBoxClassNames}>
            <h1>
              <i className='fas fa-flag-checkered little-gray' />
              {this.state.titleBox}
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

export default ModuleLanguages;
