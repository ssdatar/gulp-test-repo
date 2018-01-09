# Georgia State Budget

Description: An interactive treemap graphic on Georgia's budget.

# Project setup

* This project uses [Rollup.js](https://rollupjs.org/) to create a custom build of `d3.js` instead of using the monolithic D3 file. You can look at `build.js` to see what modules are included. When you run `npm run prebuild`, rollup will produce a `d3.min.js` file in `assets/js`. You probably only need to do it once, unless you change what modules you want in the custom build.

* There is also an `index.js`, which is the file that produces the graphic.


# Installation

#### System dependencies
* Node and npm
* Gulp CLI

Make sure you have the system dependencies installed. If not:

```
brew install node

npm i -g gulp-cli
```


#### Install project dependencies

This should install all of the local npm dependencies.

```
npm i
```


# Build the project

#### Custom D3 build

Generate your custom build. You probably only need to do it once, unless you change what modules you want in the custom build.

```
npm run prebuild
```


# Server

* Dev server: `npm run serve-dev`
* Production server: `npm run serve-prod`

# Deploying

`npm run deploy-production`