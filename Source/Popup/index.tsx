import React, { Component } from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';

import ReactDOM from 'react-dom';

import ModuleSideBar from '../AppFiles/Modules/SideBar';

import AddonNotAvailable from '../AppFiles/Modules/AddonNotAvailable';

import WebsiteContainer from '../AppFiles/Modules/Modules/WebsiteContainer';

import Menu from '../AppFiles/Modules/Menu';

import Home from './pages/Home';

import ImagesTag from './pages/ImagesTag';

import ImagesRequests from './pages/ImagesRequests';

import ModuleLanguages from '../AppFiles/Modules/ModuleLanguages';

import GlobalMessages from '../AppFiles/Modules/Modules/GlobalMessages';

import ModulePopupBoxLinks from '../AppFiles/Modules/ModulePopupBoxLinks';

import getTranslations from '../Translations';

import { addonPrefixPopup, addonRoot, addonPrefixDashboard } from '../AppFiles/Functions/addonPrefix';

import { appNameShort, version } from '../AppFiles/Globals';

import '../Sass/popup/index.scss';

class App extends Component {
  public Redirection: {
    [key: string]: any;
  };

  public translations: {
    [key: string]: any;
  };

  public state: {
    [key: string]: any;
  };

  constructor(props: {}) {
    super(props);
    this.checkAddonsAvailability = this.checkAddonsAvailability.bind(this);
    
    this.state = {
      documentWidth: 700,
      securityIsOn: false,
      animationLoading: false,
      addonNotAvailable: false
    };

    this.translations = getTranslations();
  }

  componentDidMount() {
    this.checkAddonsAvailability();
  }

  checkAddonsAvailability() {
    // @ts-ignore
    browser.runtime
      .sendMessage({
        action: 'check-addons-availablitity',
      })
      .then(response => {
        if (!response) {
          this.setState({
            // addonNotAvailable: true
          });
        }
      })
      .catch(() => {
        this.setState({
          // addonNotAvailable: true
        });
      });
  }

  render() {
    const { addonNotAvailable, documentWidth } = this.state;

    return (
      <div id="app-holder" style={{ width: `${documentWidth}px` }}>
        <WebsiteContainer
          persistUserSelection={false} // set local sotrage on click
          clearPersistUserSelection={true} // do not remove the local storage on component did mount
          sidebarMinifiedAt={600}
          sidebarMaxifiedAt={650}
          displayMinifyMaxifyIcon={false}
          moduleSidebar={
            <ModuleSideBar
              image={<img alt="image" src={`${addonRoot()}Images/logo-64.png`} />}
              textLong={appNameShort}
              textShort={`v${version}`}
              moduleMenu={
                <Menu
                  reactRouter={false}
                  childrenPaddingX={18}
                  data={
                    [
                      {
                        attributes: {
                          title: this.translations.menu_title_home,
                        },
                        text: this.translations.home,
                        icon: <i className="fas fa-user" />,
                        href: `${addonPrefixPopup()}#/`,
                      },
                      {
                        text: this.translations.img_tag,
                        icon: <i className="fas fa-image" />,
                        href: `${addonPrefixPopup()}#/images-by-img-tag`,
                      },
                      {
                        text: this.translations.img_requests,
                        icon: <i className="far fa-image" />,
                        href: `${addonPrefixPopup()}#/images-by-requests`,
                      }
                    ]
                  }
                />
              }
            />
          }
          headerData={
            <span>
              <ModulePopupBoxLinks
                location='popup'
                titleBox={this.translations.links}
                masterLink={`${addonPrefixDashboard()}#/`}
                masterIcon={<i className='fas fa-angle-right' />}
                masterText={this.translations.popup_title_dashboard}
                masterAttributes={
                  {
                    'target': '_blank',
                    'onClick': () => { setTimeout(() => { window.close() }, 100) }
                  }
                }

                data={
                  [
                    {
                      href: 'https://addons.mozilla.org/de/firefox/addon/images-downloader-origin/',
                      icon: <i className='fab fa-firefox-browser' />,
                      text: 'Firefox Hub',
                      attributes: {
                        'target': '_blank'
                      }
                    }
                  ]
                }
              />
              <ModuleLanguages/>
            </span>
          }
          contentData={
            <span>
              {
                addonNotAvailable && <AddonNotAvailable />
              }
              {
                !addonNotAvailable &&
                <HashRouter>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/images-by-img-tag" component={ImagesTag} />
                    <Route exact path="/images-by-requests" component={ImagesRequests} />
                  </Switch>
                </HashRouter>
              }
            </span>
          }
        />
        <GlobalMessages
          messageKey='messagesApp'
          timer={2000}
          codeMapping={{
            '-1': {
              title: this.translations.error,
              displayErrorCode: false,
              text: {
                prefix: '',
                suffix: '',
                attributes: {},
              },
              close: {
                text: this.translations.globalErrormessageCloseButton,
                attributes: {},
              },
              link: {},
            },
            0: {
              title: <i className="fas fa-thumbs-up mr-2" />,
              displayErrorCode: false,
              text: {
                prefix: '',
                suffix: '',
                attributes: {},
              },
              close: {
                text: this.translations.globalErrormessageCloseButton,
                attributes: {},
              },
              link: {},
            }
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
