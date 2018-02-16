import each from 'lodash/each';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import keys from 'lodash/keys';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import { isDate, isNumber, isBoolean, isString } from 'lodash';
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

  static getColumnTypes(data) {
    const allKeys = VstData.getAllKeys(data);
    const columnTypes = {};
    each(allKeys, (k) => {
      let type;
      for (let j = 0; j < data.length; j += 1) {
        let suspectedType;
        const d = data[j][k];
        if (isDate(d)) {
          suspectedType = 'Date';
        } else if (isNumber(d)) {
          suspectedType = 'Number';
        } else if (isBoolean(d)) {
          suspectedType = 'Boolean';
        } else if (isString(d)) {
          suspectedType = 'String';
        } else {
          // eslint-disable-next-line no-console
          console.warn(`Unknown type in ${k}: ${d}`);
          suspectedType = 'mixed';
        }

        if (type && type !== suspectedType) {
          // eslint-disable-next-line no-console
          console.warn(`Multiple types mixed in ${k}: ${type}, ${suspectedType}`);
          suspectedType = 'mixed';
          break;
        }
        if (!type) {
          type = suspectedType;
        }
      }
      columnTypes[k] = type;
    });
    return columnTypes;
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

  static fillNA(data, prop = 'x') {
    const xValues = map(data, d => VstData.getValue(d[prop]));
    const xExtent = d3.extent(xValues);
    const newData = [];

    const allKeys = VstData.getAllKeys(data);

    const step = VstData.figureMinStepOfData(data, prop);

    const columnTypes = this.getColumnTypes(data);

    for (let i = xExtent[0]; i <= xExtent[1]; i += step) {
      const existingObject = find(data, d => VstData.getValue(d[prop]) === i);
      let newObject = existingObject;
      if (!newObject) {
        if (columnTypes[prop] === 'Date') {
          newObject = { x: new Date(i) };
        } else if (columnTypes[prop] === 'String') {
          newObject = { x: i.toString() };
        } else {
          newObject = { x: i };
        }
      }

      each(allKeys, (key) => {
        if (!newObject[key]) {
          if (columnTypes[key] === 'Date') {
            newObject[key] = new Date();
          } else if (columnTypes[key] === 'Number') {
            newObject[key] = 0;
          } else if (columnTypes[key] === 'String') {
            newObject[key] = '';
          }
        }
      });
      newData.push(newObject);
    }
    return newData;
  }

  static getAllKeys(data) {
    const keysInData = map(data, d => keys(d));
    return filter(uniq(flatten(keysInData)), d => !d.startsWith('$'));
  }

}
