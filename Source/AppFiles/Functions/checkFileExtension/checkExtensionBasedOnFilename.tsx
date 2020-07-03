/**
* Check extension of file
*/
const checkExtensionBasedOnFilename = (filename: any, prefix: string, returnOnlyFileType: boolean = false) => {

    let name = filename.split('.');
    let filetype = name[name.length-1];
    const defaultValue = `${prefix} ${prefix}-default`;
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'php', 'txt', 'xlsx', 'xls', 'pdf', 'csv', 'zip', 'json', 'doc', 'odt', 'css', 'html', 'js', 'py', 'xml', 'md', 'sql', 'crt', 'webp', 'conf'];

    if (undefined == filetype || null == filetype || false == filetype || 0 == filetype.length) {
        return defaultValue;
    }
    else {
        filetype = filetype.toLowerCase();

        if (allowedExtensions.includes(filetype)) {

            if(returnOnlyFileType){
                return filetype;
            }

            return `${prefix} ${prefix}-${filetype}`;
        }
    }

    return defaultValue;
}

export default checkExtensionBasedOnFilename;