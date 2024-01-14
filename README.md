# Star Wars Character Explorer

`Star Wars Character Explorer` that allows users to explore Star Wars characters

## Technology Stack

- **React** <sup>_[docs](https://legacy.reactjs.org/docs/getting-started.html)_</sup> - A JavaScript library for building user interfaces.
- **React DOM** <sup>_[docs](https://legacy.reactjs.org/docs/react-dom.html)_</sup> - The entry point to the DOM and server renderers for React.
- **React Router DOM** <sup>_[docs](https://reactrouter.com/en/6.21.2)_</sup> - DOM bindings for React Router. 
- **Redux** <sup>_[docs](https://redux.js.org/introduction/getting-started)_</sup> -  A predictable state container for JavaScript apps.
- **Redux Toolkit** <sup>_[docs](https://redux-toolkit.js.org/introduction/getting-started)_</sup> - A set of tools for Redux.
- **Material-UI (MUI)** <sup>_[docs](https://mui.com/material-ui/getting-started/)_</sup> -  A popular React UI framework.
- **ESLint** <sup>_[docs](https://eslint.org/docs/latest/)_</sup> - A pluggable linting utility for JavaScript and JSX.
- **Prettier** <sup>_[docs](https://prettier.io/docs/en/)_</sup> - An opinionated code formatter.


### External Libraries

- *@reduxjs/toolkit* - Selected for application state management. The Redux Toolkit provides modern templates for working with Redux, making it easier to store repository, write editors, and interact with asynchronous operations.
- *prop-types* - Used to check the types of component properties during development. This allows you to detect potential errors early and improves code readability.
- *@mui/material* - Used to create stylish and interactive dashboard interfaces by providing many pre-built components and styles.

## Getting Started

To get a local copy of the project perform the following actions:

1. Clone the repo

```
git clone https://github.com/eugenebalts/star-wars-explorer.git
```

2. Install npm packages

```
npm install
```

3. Run the project locally

```
npm run start
```

## Available scripts

#### Webpack (code building)

- build development version

```
npm run build
```

#### Prettier (code formatting)

- сhecks formatting for all project files

```
npm run prettier:check
```

- auto fixes formatting for all project files

```
npm run prettier:fix
```

#### ESLint (code linting)

- checks linting for all project files

```
npm run lint:check
```

- auto fixes linting error for all project files

```
npm run lint:fix
```
