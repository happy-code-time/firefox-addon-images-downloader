const getBackgroundColorBasedOnAlphabet = (value) => {
    if(typeof 'string' === typeof value){
        const aZ = value.toUpperCase();

        switch(aZ){
            case 'A' : {
                return 'bc-a';
            }
            case 'B' : {
                return 'bc-b';
            }
            case 'C' : {
                return 'bc-c';
            }
            case 'D' : {
                return 'bc-d';
            }
            case 'E' : {
                return 'bc-e';
            }
            case 'F' : {
                return 'bc-f';
            }
            case 'G' : {
                return 'bc-g';
            }
            case 'H' : {
                return 'bc-h';
            }
            case 'I' : {
                return 'bc-i';
            }
            case 'J' : {
                return 'bc-j';
            }
            case 'K' : {
                return 'bc-k';
            }
            case 'L' : {
                return 'bc-l';
            }
            case 'M' : {
                return 'bc-m';
            }
            case 'N' : {
                return 'bc-n';
            }
            case 'O' : {
                return 'bc-o';
            }
            case 'P' : {
                return 'bc-p';
            }
            case 'Q' : {
                return 'bc-q';
            }
            case 'R' : {
                return 'bc-r';
            }
            case 'S' : {
                return 'bc-s';
            }
            case 'T' : {
                return 'bc-t';
            }
            case 'U' : {
                return 'bc-u';
            }
            case 'V' : {
                return 'bc-v';
            }
            case 'W' : {
                return 'bc-w';
            }
            case 'X' : {
                return 'bc-x';
            }
            case 'Y' : {
                return 'bc-y';
            }
            case 'Z' : {
                return 'bc-z';
            }
            default: {
                return 'bc-s';                
            }
        }
    }
    else{
        return 'bc-s';
    }
};

export default getBackgroundColorBasedOnAlphabet;