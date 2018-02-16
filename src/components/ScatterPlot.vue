<template>
  <g class="scatter-plot"></g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'scatter-plot',
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
        // const scatterPlotGroup = d3.select(this.$el);
          // .attr('transform', `translate(0, ${this.$parent.paddings.top})`);

        this.updateChart();
      });
    },

    updateChart() {
      const data = this.$parent.vstData;
      const scatterPlotGroup = d3.select(this.$el);
      const xScale = this.$parent.xScale;
      const yScale = this.$parent.yScale;

      const circles = scatterPlotGroup.selectAll('circle').data(data, d => d.x);

      circles
        .transition()
        .duration(1000)
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d[this.dataKey]));

      circles
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d[this.dataKey]))
        .attr('r', 4)
        .style('opacity', 1);

      circles
        .exit()
        .transition()
        .duration(500)
        .style('opacity', 0)
        .attr('r', 0)
        .remove();
    },
  },


};
</script>

<style lang="scss">
g.scatter-plot {
  circle {
    fill: #d6869c;
    stroke-width: 0;
  }
}
</style>
