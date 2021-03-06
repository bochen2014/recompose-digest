module.exports = {
  "extends": [
    "eslint-config-airbnb",
    "prettier",
    "prettier/flowtype",
    "prettier/react"
  ],
  "plugins": [
    "prettier"
  ],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "globals": {
    "sinon": true
  },
  "rules": {
    "semi": [2, "always"],
    "no-use-before-define": ["error", { "functions": false }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-underscore-dangle": [0],
    "no-confusing-arrow": [0],
    "no-class-assign": [0],
    "no-plusplus": [0],
    "no-prototype-builtins": [0],
    "max-len": ["error", { "code": 120, "ignorePattern": "^test", "ignoreUrls": true }],
    "import/no-unresolved": [0],
    "import/no-extraneous-dependencies": [0],
    "import/extensions": [0],
    "import/prefer-default-export": [0],
    "jsx-a11y/label-has-for": [0],
    "react/forbid-prop-types": [0],
    "react/prop-types": [0],
    "react/prefer-stateless-function": [0],
    "react/no-multi-comp": [0],
    "react/sort-comp": [0],
    "react/jsx-filename-extension": [0],
    // you don't this. you have already got a .prettierrc
    // duplicate
    // "prettier/prettier": ["error", {"semi": false, "trailingComma": "es5", "singleQuote": true}]
  }
}
