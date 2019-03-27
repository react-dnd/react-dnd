[![Build Status](https://travis-ci.org/jest-community/jest-watch-typeahead.svg?branch=master)](https://travis-ci.org/jest-community/jest-watch-typeahead) [![npm version](https://badge.fury.io/js/jest-watch-typeahead.svg)](https://badge.fury.io/js/jest-watch-typeahead)

<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <a href="https://facebook.github.io/jest/">
    <img width="150" height="150" vspace="" hspace="25" src="https://cdn.worldvectorlogo.com/logos/jest.svg">
  </a>
  <h1>jest-watch-typeahead</h1>
  <p>Filter your tests by file name or test name</p>
</div>

![watch](https://user-images.githubusercontent.com/574806/40672937-25dab91a-6325-11e8-965d-4e55ef23e135.gif)

## Usage

### Install

Install `jest`_(it needs Jest 23+)_ and `jest-watch-typeahead`

```bash
yarn add --dev jest jest-watch-typeahead

# or with NPM

npm install --save-dev jest jest-watch-typeahead
```

### Add it to your Jest config

In your `package.json`

```json
{
  "jest": {
    "watchPlugins": [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
```

### Configuring your key and prompt name

```js
module.exports = {
  watchPlugins: [
    [
      'jest-watch-typeahead/filename',
      {
        key: 'k',
        prompt: 'do something with my custom prompt',
      },
    ],
  ],
};
```

### Run Jest in watch mode

```bash
yarn jest --watch
```
