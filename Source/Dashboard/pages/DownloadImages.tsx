import * as React from 'react';

import WebsiteContainer from '../../AppFiles/Modules/WebsiteContainer';

import ModuleDownloadImages from '../../AppFiles/Modules/ModuleDownloadImages';

import getTranslations from '../../Translations/index';

class DownloadImages extends React.Component {

  constructor (props: {}) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <WebsiteContainer
        loginRequired={false}
        contentData={
          <ModuleDownloadImages
            translations={getTranslations()}
          />
        }
      />
    );
  }
}

export default DownloadImages;
