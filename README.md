# Teams Approval Management

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn run cypress open`

Launches Cypress and run test suite.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn serve`

Allows to test the production build locally

### Documentation

You can find diagram of the architecture, but please ask before edit :) [here](https://excalidraw.com/#json=5091833432506368,Zftu6b2-X-OdjldjyWtfcw)

### Folders organization

src/
  - components/ : shared components
  - features/ : business views (the name features comes out of the bow with CRA, it's not that bad)
  - services/ : api, and more...
  - store/ : redux root store

  let's have a look at the features folder.
  Business components are organized with the ducks logic

  ```
    feature/
      subfeature/
        ...
  ```
  
  typical component folder :
  - index.jsx: entry point
  - styles.modules.css: post css scoped
  - _store: when needed, and isolated with context
  - _components/: business logic sub components

### Known bugs

- Persist whitelist doesn't whitelist at all
- Redux dev tools are disabled because they make Cypress crash, damn
- API comes with invalid data (2 objects with the same id), but you already know

### Rules update
- when adding a step, a user is automatically selected (the first available in the list)
- when adding a step, a range is automatically provided
- approval steps starts from 0

### Things i should have done
- validate approval steps edit with a form (Formik)
- manage steps data update with useReducer


