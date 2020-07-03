import React, { Component } from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';

import ReactDOM from 'react-dom';

import ModuleSideBar from '../AppFiles/Modules/SideBar';

import Home from './pages/Home';

import DownloadImages from './pages/DownloadImages';

import ErrorMessagesLearnMore from './pages/ErrorMessagesLearnMore';

import Menu from '../AppFiles/Modules/Menu';

import WebsiteContainer from '../AppFiles/Modules/Modules/WebsiteContainer';

import GlobalMessages from '../AppFiles/Modules/Modules/GlobalMessages';

import ModuleLanguages from '../AppFiles/Modules/ModuleLanguages';

import ModulePopupBoxLinks from '../AppFiles/Modules/ModulePopupBoxLinks';

import getTranslations from '../Translations/index';

import { addonRoot, addonPrefixDashboard } from '../AppFiles/Functions/addonPrefix';

import { appNameShort, version } from '../AppFiles/Globals';

import '../Sass/dashboard/index.scss';

class App extends Component {
  public Redirection: {
    [key: string]: any;
  };

  public state: {
    [key: string]: any;
  };

  public translations: {
    [key: string]: any;
  };

  constructor(props: {}) {
    super(props);
    this.state = {
      globalErrors: [],
      notLoggedInErrors: [],
      successMessage: []
    };

    this.translations = getTranslations();
  }

  render() {
    return (
      <div className="Main block">
        <WebsiteContainer
          persistUserSelection={false} // set local sotrage on click
          clearPersistUserSelection={true} // do not remove the local storage on component did mount
          sidebarMinifiedAt={720}
          sidebarMaxifiedAt={1024}
          displayMinifyMaxifyIcon={true}
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
                        icon: <i className="fas fa-user" />,
                        text: this.translations.home,
                        href: `${addonPrefixDashboard()}#/`,
                      },
                      {
                        attributes: {
                          title: this.translations.menu_title_download_images,
                        },
                        icon: <i className="fas fa-images" />,
                        text: this.translations.menu_text_download_images,
                        href: `${addonPrefixDashboard()}#/download-images`,
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
            <HashRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/download-images" component={DownloadImages} />
                <Route exact path="/error-messages-learn-more" component={ErrorMessagesLearnMore} />
              </Switch>
            </HashRouter>
          }
        />
        <GlobalMessages
          messageKey='messagesApp'
          timer={2000}
          codeMapping={{
            '-2': {
              title: this.translations.notLoggedIn,
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
            },
            1: {
              title: this.translations.code,
              displayErrorCode: true,
              text: {
                prefix: this.translations.globalErrormessagePrefix,
                suffix: '',
                attributes: {},
              },
              close: {
                text: this.translations.globalErrormessageCloseButton,
                attributes: {},
              },
              link: {
                text: this.translations.globalErrormessageLearnMoreButton,
                useTagLink: false,
                href: `${addonPrefixDashboard()}#error-messages-learn-more`,
                attributes: {
                  target: '_blank',
                },
              },
            },
            2: {
              title: this.translations.code,
              displayErrorCode: true,
              text: {
                prefix: this.translations.globalErrormessagePrefix,
                suffix: '',
                attributes: {},
              },
              close: {
                text: this.translations.globalErrormessageCloseButton,
                attributes: {},
              },
              link: {
                text: this.translations.globalErrormessageLearnMoreButton,
                useTagLink: false,
                href: `${addonPrefixDashboard()}#error-messages-learn-more`,
                attributes: {
                  target: '_blank',
                },
              },
            },
            3: {
              title: this.translations.code,
              displayErrorCode: true,
              text: {
                prefix: this.translations.globalErrormessagePrefix,
                suffix: '',
                attributes: {},
              },
              close: {
                text: this.translations.globalErrormessageCloseButton,
                attributes: {},
              },
              link: {
                text: this.translations.globalErrormessageLearnMoreButton,
                useTagLink: false,
                href: `${addonPrefixDashboard()}#error-messages-learn-more`,
                attributes: {
                  target: '_blank',
                },
              },
            },
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
