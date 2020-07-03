import * as React from 'react';

import getTranslations from '../../Translations/index';

import WebsiteContainer from '../../AppFiles/Modules/WebsiteContainer';

class ErrorMessagesLearnMore extends React.Component {

  public translations: {
    [key: string]: any
  };

  public remoteHost?: string;
  public currentUser?: string;
  public currentUserHash?: string;

  constructor(props: {}) {
    super(props);

    this.translations = getTranslations();
  }

  render(): JSX.Element {
    return (
      <WebsiteContainer
        loginRequired={false}
        contentData={
          <div className="ErrorMessagesLearnMore flex flex-column">
            {
              [
                {
                  code: 1,
                  message: this.translations.globalErrorCode_1
                },
                {
                  code: 2,
                  message: this.translations.globalErrorCode_2
                },
                {
                  code: 3,
                  message: this.translations.globalErrorCode_3
                }
              ].map(object => {
                const { code, message } = object;

                return (
                  <div className="box">
                    <h1>
                      {`${this.translations.globalErrorCodeTitle} ${code}`}
                    </h1>
                    <p>
                      {
                        message
                      }
                    </p>
                  </div>
                )
              })
            }
          </div>
        }
      />
    );
  }
}

export default ErrorMessagesLearnMore;
