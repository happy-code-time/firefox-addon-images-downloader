import DE from './popup_DE';

import EN from './popup_EN';

import PL from './popup_PL';

import getLanguage from '../AppFiles/Functions/language/getLanguage';

const getTranslations = () => {
  let currentLanguage = getLanguage();

  switch (currentLanguage) {
    case 'de': {
      return DE;
    }

    case 'en': {
      return EN;
    }

    case 'pl': {
      return PL;
    }

    default: {
      return EN;
    }
  }
};

export default getTranslations;
