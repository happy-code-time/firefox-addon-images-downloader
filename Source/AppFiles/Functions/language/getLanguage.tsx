import possibleLanguages from './possibleLanguages';

const getLanguage = () => {
    let currentLanguage =  localStorage.getItem('applanguage') ? localStorage.getItem('applanguage') : 'en';
    
    if(!possibleLanguages.includes(currentLanguage)){
        currentLanguage = 'en';
    }
    
    return currentLanguage.toLowerCase();
};

export default getLanguage;