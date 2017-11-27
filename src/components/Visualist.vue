<template>
  <div class="visualist">
    <h1>Visualist</h1>
    <chart :data="data">
      <x-axis></x-axis>
      <y-axis></y-axis>
      <area-chart data-key="y2"></area-chart>
      <line-chart data-key="y"></line-chart>
      <bar-chart data-key="y"></bar-chart>
      <scatter-plot data-key="y"></scatter-plot>
      <scatter-plot data-key="y2"></scatter-plot>
      <tooltip></tooltip>
    </chart>
    <button @click="update">Add</button>
  </div>
</template>

<script>
import each from 'lodash/each';
import * as d3 from 'd3';
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
    return {
      data: [
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

      const maxX = d3.max(this.data, d => d.x);
      this.data.push({
        x: maxX + (Math.floor(Math.random() * 5) + 1),
        y: Math.random() * 30,
        y2: Math.random() * 5,
      });
    },
  },
};
</script>

<style scoped>
</style>
