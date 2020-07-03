/**
 * Read boolean value from local storage
 * @param {string} key
 */
const getItemBoolean=(key: string) => {
    let data = false;

    if (null !== localStorage.getItem(key)) {
        data = JSON.parse(localStorage.getItem(key));
    }
    else{
        localStorage.setItem(key, 'false');
    }

    return data;
}

export default getItemBoolean;