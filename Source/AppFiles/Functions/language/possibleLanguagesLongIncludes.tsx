const possibleLanguagesLongIncludes = (language) => {

    switch(language){
        case 'Deutsch' :
        case 'Deutschland' :
        case 'de' : {
            language = 'Deutsch';
            break;
        }
        case 'English' :
        case 'USA' :
        case 'en' : {
            language = 'English';
            break;
        }
        case 'Polski' :
        case 'Polska' :
        case 'pl' : {
            language = 'Polski';
            break;
        }
        default: {
            language = '';
        }
    }

    return language;
}
export default possibleLanguagesLongIncludes;