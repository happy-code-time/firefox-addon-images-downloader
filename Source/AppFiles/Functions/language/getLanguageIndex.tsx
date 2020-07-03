import possibleLanguages from './possibleLanguages';

/**
 * Get current languages arrays index
 */
const getLanguageIndex = (language: string = 'en') => {
    const languagesObject = {
        de : {
            value: 'Deutsch'
        },
        en : {
            value: 'English'
        },
        pl : {
            value: 'Polski'
        }
    }
    language = language.toLowerCase();

    if(!possibleLanguages.includes(language)){
        language = 'en';
    }

    return languagesObject[language].value;
}

export default getLanguageIndex;