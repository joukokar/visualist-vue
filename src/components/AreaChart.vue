<template>
  <g class="chart-area"></g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'area-chart',
  props: [
    'dataKey',
  ],

  mounted() {
    this.renderChart();
  },

  updated() {
    this.$nextTick(() => {
      this.updateChart();
    });
  },

  watch: {
    // eslint-disable-next-line
    '$parent.dataObject': function () {
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
      const data = this.$parent.dataObject;

      if (!pathEl) {
        const lineChartGroup = d3.select(this.$el);
        lineChartGroup.append('path').attr('d', this.createArea(data));
      } else {
        const path = d3.select(pathEl);
        path.transition()
          .duration(1000)
          .attr('d', this.createArea(data));
      }
    },

    createArea(data) {
      const xScale = this.$parent.xScale;
      const yScale = this.$parent.yScale;

      const area = d3.area()
        .curve(d3.curveCatmullRom.alpha(0.5))
        .x(d => xScale(d.x))
        .y0(() => this.$parent.height - this.$parent.paddings.bottom)
        .y1(d => yScale(d[this.dataKey]));
      return area(data);
    },

  },

};
</script>

<style lang="scss">
g.chart-area {
  path {
    fill: #86b65c;
    opacity: 0.5;
    stroke: #86b65c;
    stroke-width: 2px;
  }
}
</style>
