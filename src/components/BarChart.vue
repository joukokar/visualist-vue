<template>
  <g class="chart-bar"></g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'bar-chart',
  props: {
    dataKey: {
      type: String,
      default: 'y',
    },
  },

  mounted() {
    this.renderChart();
    this.$on('visualist:chartUpdated', this.updateChart);
  },

  updated() {
    this.updateChart();
  },

  watch: {
    // eslint-disable-next-line
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

        // const group = d3.select(this.$el);
        // .attr('transform', `translate(0, ${this.$parent.paddings.top})`);

        this.updateChart();
      });
    },

    updateChart() {
      const { height, xScale, yScale } = this.$parent;
      const data = this.$parent.vstData;

      const group = d3.select(this.$el);
      // .attr('transform', `translate(0, ${this.$parent.paddings.top})`);

      const bars = group.selectAll('rect').data(data, d => d[this.$parent.dataX]);

      bars
        .transition()
        .duration(1000)
        .attr('x', d => xScale(d[this.$parent.dataX]) - 5)
        .attr('y', d => yScale(d[this.dataKey]))
        .attr('width', () => (xScale.bandwidth ? xScale.bandwidth() : 10))
        .attr('height', d => height - yScale(d[this.dataKey]) - this.$parent.paddings.bottom);

      bars
        .enter()
        .append('rect')
        .attr('x', d => xScale(d[this.$parent.dataX]) - 5)
        .attr('y', d => yScale(d[this.dataKey]))
        .attr('width', () => (xScale.bandwidth ? xScale.bandwidth() : 10))
        .attr('height', d => height - yScale(d[this.dataKey]) - this.$parent.paddings.bottom)
        .style('opacity', 1);

      bars
        .exit()
        .transition()
        .duration(800)
        .style('opacity', 0)
        .attr('y', () => height - this.$parent.paddings.bottom)
        .attr('height', 0)
        .remove();
    },
  },

};
</script>

<style lang="scss">
@import '../assets/colors.scss';
g.chart-bar {
  rect {
    fill: $vstColor1;
    stroke-width: 0;
  }
}
</style>
