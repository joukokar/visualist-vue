<template>
  <div class="chart-container">
    <div v-if="controls">
      <button
        class="vst-btn"
        :class="{'vst-btn-disabled': !viewTypes.svg}"
        @click="setViewType('svg')">Svg</button>
      <button
        class="vst-btn"
        :class="{'vst-btn-disabled': !viewTypes.table}"
        @click="setViewType('table')">Table</button>
    </div>

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
import * as d3 from 'd3';
import VstData from '@/data/data';
import DataTable from './DataTable';

export default {
  name: 'chart',
  props: {
    data: {
      type: Array,
      default: () => [
          { x: 1, y: 1 },
          { x: 2, y: 1.5 },
          { x: 3, y: 1.8 },
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
    // Show svg/table toggle controls
    controls: {
      type: Boolean,
      default: false,
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

  mounted() {
    this.renderSvg();
    VstData.createIndexes(this.data);
    this.dataObject = VstData.fillNA(this.data);
    this.$on('visualist:update', this.renderSvg);
  },

  updated() {
    // TODO: add flag to do this only once
    if (this.data !== this.lastData) {
      VstData.createIndexes(this.data);
      this.dataObject = VstData.fillNA(this.data);
      this.lastData = this.data;
    }
    this.updateSvg();
  },

  methods: {
    setViewType(type) {
      this.viewTypes[type] = !this.viewTypes[type];
    },

    renderSvg() {
      this.width = this.$el.offsetWidth - (this.$el.offsetWidth * 0.2);
      this.height = this.$el.offsetHeight;
      if (this.height < (this.width / 4) * 2) {
        this.height = (this.width / 4) * 2;
      }
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

.vst-btn {
  background-color: #88aafe;
  color: white;
  padding: 12px 20px;
  border: 0px;
  cursor: pointer;
}
.vst-btn-disabled {
  background-color: #555555;
  color: #bbbbbb;
}

</style>
