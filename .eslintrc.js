module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsdoc"
    ],
    "rules": {
        "quotes": ["error", "single"],
        "no-trailing-spaces": [2, { "skipBlankLines": true }],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "semi": "error",
        "array-bracket-spacing": ["error", "never"],
        "no-multi-spaces": "error",
        "react/no-unescaped-entities": 0,
        "jsdoc/require-jsdoc": 1,
        "jsdoc/require-param": 1,
        "jsdoc/require-returns": 1,
        "jsdoc/require-description": 1,
    }
};