<template>
  <g class="axis-y"></g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'y-axis',
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
  },

  methods: {
    createAxis() {
      // Wait for parent to update first
      this.$nextTick(() => {
        if (!this.$parent.yScale) {
          // TODO: Figure out some better way, maybe trigger event
          // from parent when it's ready?
          return;
        }
        const yAxis = d3.axisLeft().scale(this.$parent.yScale);
        d3.select(this.$el)
          .attr('transform', `translate(${this.$parent.paddings.left}, 0)`)
          .call(yAxis);
      });
    },

    updateAxis() {
      const yAxis = d3.axisLeft().scale(this.$parent.yScale);
      d3.select(this.$el)
        .transition()
        .duration(1000)
        .call(yAxis);
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
