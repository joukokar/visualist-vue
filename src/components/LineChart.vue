<template>
  <g class="chart-line"></g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'line-chart',
  props: {
    dataKey: {
      type: String,
      default: 'y',
    },
  },

  mounted() {
    this.renderChart();
  },

  updated() {
    this.$nextTick(() => {
      this.updateChart();
    });
  },

  watch: {
    // eslint-disable-next-line func-names
    '$parent.vstData': function () {
      this.$nextTick(() => {
        this.updateChart();
      });
    },

  },

  methods: {
    renderChart() {
      this.$nextTick(() => {
        if (!this.$parent.data || !this.$parent.xScale || !this.$parent.yScale) {
          return;
        }
        // const lineChartGroup = d3.select(this.$el);
          // .attr('transform', `translate(0, ${this.$parent.paddings.top})`);

        this.updateChart();
      });
    },

    updateChart() {
      const pathEl = this.$el.querySelector('path');
      const data = this.$parent.vstData;

      if (!pathEl) {
        const lineChartGroup = d3.select(this.$el);
        lineChartGroup.append('path').attr('d', this.createPath(data));
      } else {
        const path = d3.select(pathEl);
        path.transition()
          .duration(1000)
          .attr('d', this.createPath(data));
      }
    },

    createPath(data) {
      const xScale = this.$parent.xScale;
      const yScale = this.$parent.yScale;

      return d3.line()
        .curve(d3.curveCatmullRom.alpha(0.5))
        .x(d => xScale(d.x))
        .y(d => yScale(d[this.dataKey]))(data);
    },

  },

};
</script>

<style lang="scss">
g.chart-line {
  path {
    fill: none;
    stroke: #86b65c;
    stroke-width: 2px;
  }
}
</style>
