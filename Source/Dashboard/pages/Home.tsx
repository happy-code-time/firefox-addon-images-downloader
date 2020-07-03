import * as React from 'react';

import { addonRoot } from '../../AppFiles/Functions/addonPrefix';

import getTranslations from '../../Translations';

class Home extends React.Component {

  constructor (props: {}) {
    super(props);
  }
  
  render(): JSX.Element {
    const translation = getTranslations();

      return(
        <div className="Home">
            <img src={`${addonRoot()}/Images/logo-128.png`}/>
            <ul>
                <li>
                    <i className='far fa-image icon-images'/>
                    {
                        translation.home_images_1
                    }
                </li>
                <li>
                    <i className='far fa-image icon-images'/>
                    {
                        translation.home_images_2
                    }
                </li>
                <li>
                    <i className='far fa-image icon-images'/>
                    {
                        translation.home_images_3
                    }
                </li>
            </ul>
        </div>
      );
  }
}

export default Home;
