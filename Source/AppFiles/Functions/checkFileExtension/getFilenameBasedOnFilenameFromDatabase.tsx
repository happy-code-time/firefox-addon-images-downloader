import mapping from './mapping';

const getFilenameBasedOnFilenameFromDatabase = (type: string = '') => {
    mapping.map( obj => {
        if(type == obj.originalType){
            type =  obj.returnType;
        }
    });
    
    return type;
};

export default getFilenameBasedOnFilenameFromDatabase;
