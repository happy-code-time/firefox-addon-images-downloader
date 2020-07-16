import * as React from 'react';

import WebsiteContainer from '../../AppFiles/Modules/WebsiteContainer';

import ModuleTabs from '../../AppFiles/Modules/ModuleTabs';

import getTranslations from '../../Translations/index';

class Tabs extends React.Component {

  constructor (props: {}) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <WebsiteContainer
        loginRequired={false}
        contentData={
          <ModuleTabs
            translations={getTranslations()}
          />
        }
      />
    );
  }
}

export default Tabs;
