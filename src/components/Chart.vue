<template>
  <div class="chart-container">
    Chart
    <button @click="setViewType('svg')">svg</button>
    <button @click="setViewType('table')">table</button>

    <div>
      <svg v-show="viewTypes.svg">
        <slot></slot>
      </svg>

      <data-table v-if="viewTypes.table" :data="data">
      </data-table>
    </div>
  </div>
</template>

<script>
import map from 'lodash/map';
import find from 'lodash/find';
import * as d3 from 'd3';
import DataTable from './DataTable';

export default {
  name: 'chart',
  props: ['data'],
  components: { DataTable },

  data() {
    return {
      viewTypes: { svg: true, table: true },
      xScale: null,
      yScale: null,
      paddings: {
        top: 20,
        bottom: 50,
        left: 50,
        right: 20,
      },
      height: 400,
      width: 600,
      dataObject: [],
    };
  },

  updated() {
    this.fillNA();
    this.updateSvg();
  },

  mounted() {
    this.renderSvg();
    this.fillNA();
  },

  methods: {
    setViewType(type) {
      this.viewTypes[type] = !this.viewTypes[type];
    },

    fillNA() {
      const xValues = map(this.data, d => d.x);
      const xExtent = d3.extent(xValues);
      this.dataObject = [];

      for (let i = xExtent[0]; i < xExtent[1]; i += 1) {
        const existingObject = find(this.data, d => d.x === i);
        let nextObject = existingObject;
        if (!existingObject) {
          nextObject = { x: i, y: 0, y2: 0 };
        }
        this.dataObject.push(nextObject);
      }
    },

    renderSvg() {
      const svgElement = this.$el.querySelector('svg');
      d3.select(svgElement)
        .attr('width', this.width)
        .attr('height', this.height);
      this.xScale = d3.scaleLinear()
        .range([0 + this.paddings.left, this.width - this.paddings.right]);
      this.yScale = d3.scaleLinear()
        .range([this.height - this.paddings.bottom, 0 + this.paddings.top]);

      this.updateSvg();
    },

    updateSvg() {
      if (!this.data) {
        return;
      }
      // move these to update
      this.xScale.domain(d3.extent(this.data, d => d.x));
      this.yScale.domain([0, d3.max(this.data, d => d.y)]);
      this.$children.forEach((child) => {
        child.$emit('visualist:chartUpdated');
      });
    },
  },

};
</script>

<style lang="scss">
svg {
  margin: 1em;
  background-color: white;
  box-shadow: 0px 0px 8px 8px #eee;
}

</style>