<template>
  <div class="chart-container">
    Chart
    <button @click="setViewType('svg')">svg</button>
    <button @click="setViewType('table')">table</button>

    <div>
      <svg v-show="viewTypes.svg">
        <slot></slot>
      </svg>

      <data-table v-if="viewTypes.table" :data="dataObject">
      </data-table>
    </div>
  </div>
</template>

<script>
import each from 'lodash/each';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import keys from 'lodash/keys';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import * as d3 from 'd3';
import DataTable from './DataTable';

export default {
  name: 'chart',
  props: {
    data: {
      type: Array,
      default: [
        { x: 1, y: 1 },
      ],
    },
    paddings: {
      type: Object,
      default: () => ({
        top: 20,
        bottom: 50,
        left: 50,
        right: 20,
      }),
    },
  },
  components: { DataTable },

  data() {
    return {
      viewTypes: { svg: true, table: true },
      xScale: null,
      yScale: null,
      height: 400,
      width: 600,
      lastData: [],
      dataObject: [],
    };
  },

  updated() {
    // TODO: add flag to do this only once
    if (this.data !== this.lastData) {
      this.fillNA();
      this.lastData = this.data;
    }
    this.updateSvg();
  },

  mounted() {
    // const svgElement = this.$el.querySelector('svg');
    // svgElement.setAttribute('width', this.$parent.$el.offsetWidth);
    // svgElement.setAttribute('height', this.$parent.$el.offsetHeight);
    this.renderSvg();
    this.fillNA();
    this.$on('visualist:update', this.renderSvg);
  },

  methods: {
    setViewType(type) {
      this.viewTypes[type] = !this.viewTypes[type];
    },

    // TODO: move this elsewhere
    fillNA() {
      const xValues = map(this.data, d => d.x);
      const xExtent = d3.extent(xValues);
      this.dataObject = [];

      const allKeys = this.getAllKeys(this.data);

      for (let i = xExtent[0]; i < xExtent[1]; i += 1) {
        const existingObject = find(this.data, d => d.x === i);
        let newObject = existingObject;
        if (!newObject) {
          newObject = { x: i };
        }

        each(allKeys, (key) => {
          if (!newObject[key]) {
            newObject[key] = 0;
          }
        });
        this.dataObject.push(newObject);
      }
    },

    // TODO: move this elsewhere
    getAllKeys(data) {
      const keysInData = map(data, d => keys(d));
      return uniq(flatten(keysInData));
    },

    renderSvg() {
      this.width = this.$parent.$el.offsetWidth;
      this.height = this.$parent.$el.offsetHeight;
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

<style lang="scss" scoped>
svg {
  margin: 1em;
  background-color: white;
  box-shadow: 0px 0px 8px 8px #eee;
}

</style>
