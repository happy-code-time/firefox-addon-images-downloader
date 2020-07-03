/**
 * Get single url element from url
 * return the 1 catched item
 */
const getValueFromUrl = (key: string = '') => {
    const currentHref = window.location.href;

    if(key.length && undefined !== currentHref && currentHref.length){
        let string = currentHref.split(key);

        if(undefined !== string[1]){
            const target = string[1].split('=');

            if(undefined !== target[1]){
                return target[1];
            }
        }
    }

    return null;
}

export default getValueFromUrl;