# Visualist-vue

> Visualist is a charting library for vue.js

Very much work in progress...

## Principles

- Use html flexibly to manage charts

```javascript
import VisualistPlugin from 'visualist/src/plugin';

Vue.use(VisualistPlugin, {prefix: 'Vst'});
```

```html
<vst-chart :data="[{x: 0, y:1}, {x: 1, y: 2}, {x:2, y:4}]">
  <vst-y-axis></vst-y-axis>
  <vst-x-axis></vst-x-axis>
  <vst-line-chart></vst-line-chart>
  <vst-tooltip></tooltip>
</vst-chart>
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
