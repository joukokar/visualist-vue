# Visualist-vue

> Visualist is a charting library for vue.js

Very much work in progress...

## Principles

- Use html flexibly to manage charts

```
<chart :data="{x: 1, y: 2}">
  <y-axis>
  <x-axis>
  <line-chart>
  <tooltip></tooltip>
</chart>
```

- Have always also data table available to show the underlying data
- Automatically detect interesting values in data to show what's interesting easily
- Internally uses d3, lodash to manipulate data

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
