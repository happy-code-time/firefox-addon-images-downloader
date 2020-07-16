import * as React from 'react';

import WebsiteContainer from '../../AppFiles/Modules/WebsiteContainer';

import ModuleStoredImages from '../../AppFiles/Modules/ModuleStoredImages';

import getTranslations from '../../Translations/index';

class Stored extends React.Component {

  constructor (props: {}) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <WebsiteContainer
        loginRequired={false}
        contentData={
          <ModuleStoredImages
            translations={getTranslations()}
          />
        }
      />
    );
  }
}

export default Stored;
