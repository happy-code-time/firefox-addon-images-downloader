/**
 * Code from 
 * http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
 */
const isEquivalent = (a, b) => {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let x = 0; x <= aProps.length-1; x++) {
        let aKeyName = aProps[x];
        let aKeyNames =  Object.getOwnPropertyNames(a[aKeyName]);
        
        /**
         * Do not update chat
         */
        if(!aKeyNames.length){
            return true;
        }

        for (let xi = 0; xi <= aKeyNames.length-1; xi++) {
            var timeAsKeyName = aKeyNames[xi];

            /**
             * If values of same property - date as key - are not equal
             * or the nested keys has different key length
             * objects are not equivalent
             */
            if( undefined == b[aKeyName] || undefined == b[aKeyName][timeAsKeyName] || a[aKeyName][timeAsKeyName].length !== b[aKeyName][timeAsKeyName].length){
                return false;
            }
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
};

export default isEquivalent;