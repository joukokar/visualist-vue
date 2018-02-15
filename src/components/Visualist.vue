<template>
  <div class="visualist">
    <h1>Visualist</h1>
    <chart :data="data" :controls="true">
      <x-axis :date="true"></x-axis>
      <y-axis></y-axis>
      <area-chart data-key="y2"></area-chart>
      <line-chart data-key="y"></line-chart>
      <bar-chart data-key="y"></bar-chart>
      <scatter-plot data-key="y"></scatter-plot>
      <scatter-plot data-key="y2"></scatter-plot>
      <tooltip></tooltip>
    </chart>
    <button @click="update">Update</button>
    <button @click="add">Add</button>

    <hr>

    <chart :data="data2">
      <x-axis></x-axis>
      <y-axis></y-axis>
      <area-chart data-key="y2"></area-chart>
      <line-chart data-key="y"></line-chart>
      <bar-chart data-key="y"></bar-chart>
      <scatter-plot data-key="y"></scatter-plot>
      <scatter-plot data-key="y2"></scatter-plot>
      <tooltip></tooltip>
    </chart>
  </div>
</template>

<script>
import each from 'lodash/each';
import map from 'lodash/map';
import range from 'lodash/range';
import merge from 'lodash/merge';
import * as d3 from 'd3';
import moment from 'moment';
import Chart from './Chart';
import XAxis from './XAxis';
import YAxis from './YAxis';
import LineChart from './LineChart';
import ScatterPlot from './ScatterPlot';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Tooltip from './Tooltip';

export default {
  name: 'visualist',
  components: {
    Chart,
    XAxis,
    YAxis,
    LineChart,
    ScatterPlot,
    BarChart,
    AreaChart,
    Tooltip,
  },
  data() {
    const r = range(1, 15);
    return {
      data: map(r, (i) => {
        const y2 = Math.random() * 5;
        return { $$index: i, x: moment().subtract(20 - i, 'days').startOf('day').toDate(), y: i, y2 };
      }),
      data2: [
        { x: 0, y: 1, y2: Math.random() * 5 },
        { x: 1, y: 5, y2: Math.random() * 10 },
        { x: 2, y: 3, y2: Math.random() * 10 },
        { x: 3, y: 8, y2: Math.random() * 5 },
        { x: 4, y: 13, y2: Math.random() * 10 },
        { x: 5, y: 4, y2: Math.random() * 10 },
        { x: 6, y: 7, y2: Math.random() * 5 },
        { x: 9, y: 9, y2: Math.random() * 5 },
        { x: 11, y: 7, y2: Math.random() * 5 },
        { x: 14, y: 11, y2: Math.random() * 5 },
      ],
    };
  },

  methods: {
    update() {
      for (let i = 0; i < 4; i += 1) {
        this.data[Math.floor(Math.random() * this.data.length)].y += (Math.random() * 20) - 10;
      }

      for (let i = 0; i < 4; i += 1) {
        this.data[Math.floor(Math.random() * this.data.length)].y2 += (Math.random() * 20) - 10;
      }

      each(this.data, (d) => {
        if (d.y < 0) {
          // eslint-disable-next-line no-param-reassign
          d.y = 0;
        }
        if (d.y2 < 0) {
          // eslint-disable-next-line no-param-reassign
          d.y2 = 0;
        }
      });
    },

    add() {
      const maxX = d3.max(this.data, d => d.x);
      const maxI = d3.max(this.data, d => d.$$index);
      this.data.push({
        $$index: maxI + 1,
        x: moment(maxX).add(1, 'days').toDate(),
        y: Math.random() * 30,
        y2: Math.random() * 5,
      });
      this.data = merge([], this.data);
    },
  },
};
</script>

<style>
svg {
  margin: 1em;
  box-shadow: 0px 0px 8px 8px #eee;
}
</style>
