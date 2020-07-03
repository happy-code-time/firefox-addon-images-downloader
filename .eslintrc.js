module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", 
        "@typescript-eslint", 
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "array-callback-return": "off",
        "react/jsx-filename-extension": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react/state-in-constructor": "off",
        "react/destructuring-assignment" : "off",
        "react/no-access-state-in-setstate" : "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions" : "off"
    },
};