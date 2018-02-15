import each from 'lodash/each';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import keys from 'lodash/keys';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import { isDate } from 'lodash';
import * as d3 from 'd3';

export default class VstData {
  static createIndexes(data) {
    let i = 1;
    each(data, (d) => {
      // eslint-disable-next-line no-param-reassign
      d.$$index = i;
      i += 1;
    });
  }

  static figureMinStepOfData(data, prop = 'x') {
    let minStep;
    let lastValue;

    each(data, (d) => {
      if (lastValue) {
        const step = d[prop] - lastValue;
        if (!minStep || step < minStep) {
          minStep = step;
        }
      }
      lastValue = d[prop];
    });
    return minStep;
  }

  static getValue(d) {
    if (isDate(d)) {
      return d.valueOf();
    }
    return d;
  }

  static fillNA(data) {
    const xValues = map(data, d => VstData.getValue(d.x));
    const xExtent = d3.extent(xValues);
    const dataObject = [];

    const allKeys = VstData.getAllKeys(data);

    const step = VstData.figureMinStepOfData(data, 'x');

    for (let i = xExtent[0]; i < xExtent[1]; i += step) {
      const existingObject = find(this.data, d => VstData.getValue(d.x) === i);
      let newObject = existingObject;
      if (!newObject) {
        newObject = { x: i };
      }

      each(allKeys, (key) => {
        if (!newObject[key]) {
          newObject[key] = 0;
        }
      });
      dataObject.push(newObject);
    }
    return dataObject;
  }

  static getAllKeys(data) {
    const keysInData = map(data, d => keys(d));
    return filter(uniq(flatten(keysInData)), d => !d.startsWith('$'));
  }

}
