<template>
  <div class="vst-chart-container">
    <div
      class="vst-controls"
      v-if="controls">
      <button
        class="vst-btn"
        :class="{'vst-btn-disabled': !views.svg}"
        @click="setViewType('svg')">Svg</button>
      <button
        class="vst-btn"
        :class="{'vst-btn-disabled': !views.table}"
        @click="setViewType('table')">Table</button>
    </div>

    <div>
      <svg v-show="views.svg">
        <slot></slot>
      </svg>

      <data-table
        v-if="views.table"
        :data="vstData">
      </data-table>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import VstData from '../data/data';
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

    views: {
      type: Object,
      default: () => ({
        svg: true,
        table: false,
      }),
    },
  },
  components: { DataTable },

  data() {
    return {
      xScale: null,
      yScale: null,
      height: 400,
      width: 600,
      lastData: [],
      vstData: [],
    };
  },

  mounted() {
    this.renderSvg();
    VstData.createIndexes(this.data);
    this.vstData = VstData.fillNA(this.data);
    this.$on('visualist:update', this.renderSvg);
  },

  updated() {
    // TODO: add flag to do this only once
    if (this.data !== this.lastData) {
      VstData.createIndexes(this.data);
      this.vstData = VstData.fillNA(this.data);
      this.lastData = this.data;
      console.log('chartupdate after fillna', this.vstData.length);
    }
    this.updateSvg();
  },

  methods: {
    setViewType(type) {
      this.views[type] = !this.views[type];
    },

    renderSvg() {
      this.width = this.$el.offsetWidth;
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
.vst-chart-container {
  box-sizing: border-box;
}

.vst-controls {
  margin-bottom: 1em;
}

.vst-chart-container svg {
  background-color: white;
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
