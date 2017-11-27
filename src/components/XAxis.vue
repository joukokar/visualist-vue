<template>
  <g class="axis-x"></g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'x-axis',
  props: ['data'],

  data() {
    return {
    };
  },

  mounted() {
    this.createAxis();
    this.$on('visualist:chartUpdated', () => {
      this.$nextTick(() => {
        this.updateAxis();
      });
    });
  },

  updated() {
    this.updateAxis();
  },

  methods: {
    createAxis() {
      // Wait for parent to update first
      this.$nextTick(() => {
        if (!this.$parent.xScale) {
          // TODO: Figure out some better way, maybe trigger event
          // from parent when it's ready?
          return;
        }
        const xAxis = d3.axisBottom().scale(this.$parent.xScale);
        d3.select(this.$el)
          .attr('transform', `translate(0, ${this.$parent.height - this.$parent.paddings.bottom})`)
          .call(xAxis);
      });
    },

    updateAxis() {
      const xAxis = d3.axisBottom().scale(this.$parent.xScale);
      d3.select(this.$el)
        .transition()
        .duration(1000)
        .call(xAxis);
    },
  },

};
</script>

<style lang="scss">
g.axis-x {
  path {
    stroke: black;
    stroke-width: 1px;
  }
}
</style>
